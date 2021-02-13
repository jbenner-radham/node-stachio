import Handlebars from 'handlebars';
import negate from 'lodash.negate';
import getHarpContext from './get-harp-context';
import getRenderedFilepath from './get-rendered-filepath';
import isHandlebarsFilename from './is-handlebars-filename';
import isPrivateFilename from './is-private-filename';
import maybeGetLayout from './maybe-get-layout';
import readFilenames from './read-filenames';
import readPartials from './read-partials';
import renderTemplate from './render-template';
import writeEntryToFile from './write-entry-to-file';

export default function stachio(options = { context: {}, cwd: '', destination: '' }) {
    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partials = readPartials();

    Handlebars.registerPartial(partials as unknown as { string: HandlebarsTemplateDelegate<any> });

    return readFilenames(options.cwd)
        .filter(negate(isPrivateFilename))
        .filter(isHandlebarsFilename)
        .map((filepath: string): [filepath: string, fileContents: string] => {
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
            const { cwd, destination } = options;
            const renderedFilepath = getRenderedFilepath(filepath, { cwd, destination });

            return [renderedFilepath, renderedFileContents];
        })
        .map(writeEntryToFile);
}
