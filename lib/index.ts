import Handlebars from 'handlebars';
import negate from 'lodash.negate';
import getMetadata from './get-metadata';
import getRenderedFilepath from './get-rendered-filepath';
import isHandlebarsFilename from './is-handlebars-filename';
import isPrivateFilename from './is-private-filename';
import readFilenames from './read-filenames';
import readLayout from './read-layout';
import readPartials from './read-partials';
import renderTemplate from './render-template';
import writeEntryToFile from './write-entry-to-file';

export default function stachio(options = { context: {}, cwd: '', destination: '' }) {
    const { cwd, destination } = options;

    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partials = readPartials(cwd);

    Handlebars.registerPartial(partials as unknown as { string: HandlebarsTemplateDelegate<any> });

    return readFilenames(cwd)
        .filter(negate(isPrivateFilename))
        .filter(isHandlebarsFilename)
        .map((filepath: string): [filepath: string, fileContents: string] => {
            /**
             * Implement the Harp metadata protocol.
             * @see http://harpjs.com/docs/development/metadata
             */
            const metadata = getMetadata(filepath);
            const context = { ...metadata, ...options.context };

            /**
             * Utilize the "_layout.hbs" file if present.
             * @see http://harpjs.com/docs/development/layout
             */
            const layout = readLayout(filepath);
            const renderedFileContents = renderTemplate(filepath, { context, layout });
            const renderedFilepath = getRenderedFilepath(filepath, { cwd, destination });

            return [renderedFilepath, renderedFileContents];
        })
        .map(writeEntryToFile);
}
