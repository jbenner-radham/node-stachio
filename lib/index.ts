import Handlebars from 'handlebars';
import negate from 'lodash.negate';
import getHarpContext from './get-harp-context';
import isHandlebarsFilename from './is-handlebars-filename';
import isPrivateFilename from './is-private-filename';
import maybeGetLayout from './maybe-get-layout';
import readFilenames from './read-filenames';
import readPartials from './read-partials';
import renderTemplate from './render-template';

export default function stachio(options = { context: {}, cwd: process.cwd() }) {
    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partials = readPartials();

    Handlebars.registerPartial(partials as unknown as { string: HandlebarsTemplateDelegate<any> });

    return readFilenames(options.cwd)
        .filter(filepath => {
            if (negate(isPrivateFilename)(filepath) && !/node_modules/.exec(filepath) && !/\.git/.exec(filepath)) console.log(filepath)

            return negate(isPrivateFilename)(filepath)
        })
        .filter(isHandlebarsFilename)
        .reduce((accumulator: Record<string, any>, filepath: string): Record<string, string> => {
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
            // fs.writeFileSync(renderedFilepath, renderedFileContents);

            return { ...accumulator, [renderedFilepath]: renderedFileContents };
        }, {});
}
