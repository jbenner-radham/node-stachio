import fs from 'fs-extra';
import Handlebars from 'handlebars';
import getHarpContext from './get-harp-context';
import isHandlebarsFilename from './is-handlebars-filename';
import lsFilesRecursively from './ls-files-recursively';
import maybeGetLayout from './maybe-get-layout';
import readPartials from './read-partials';
import renderTemplate from './render-template';

export default function stachio(options = { context: {} }) {
    const cwd = process.cwd();

    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partials = readPartials();

    Handlebars.registerPartial(partials as unknown as { string: HandlebarsTemplateDelegate<any> });

    lsFilesRecursively(cwd)
        .filter(isHandlebarsFilename)
        .forEach((filepath: string) => {
            /**
             * Implement the Harp metadata protocol.
             * @see http://harpjs.com/docs/development/metadata
             */
            const harp = getHarpContext(filepath);
            const context = { ...harp.data, ...options.context }

            /**
             * Utilize the "_layout.hbs" file if present.
             * @see http://harpjs.com/docs/development/layout
             */
            const layout = maybeGetLayout(filepath);
            const renderedFileContents = renderTemplate(filepath, { context, layout });
            const renderedFilepath = filepath.replace(/\.hbs$/i, '.html');

            // TODO: Instead of writing here collect as a dict and write later?
            fs.writeFileSync(renderedFilepath, renderedFileContents);
        });
}
