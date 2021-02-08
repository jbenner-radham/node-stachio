import fs from 'fs-extra';
import Handlebars from 'handlebars';
import klawSync from 'klaw-sync';
import negate from 'lodash.negate';
import path from 'path';
import isHandlebarsFilename from './is-handlebars-filename';
import isPrivateFilename from './is-private-filename';
import readPartials from './read-partials';

export default function stachio(context = {}) {
    const cwd = process.cwd();
    const filter = (file) => negate(isPrivateFilename)(path.basename(file.path))
        && !/\/node_modules\//.exec(file.path)
        && !/\/.git\//.exec(file.path)
        && !/\/dist\//.exec(file.path)
        && !file.path.endsWith('.gitignore');

    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partials = readPartials();

    Handlebars.registerPartial(partials as unknown as { string: HandlebarsTemplateDelegate<any> });

    klawSync(cwd, { filter, nodir: true })
        .map(file => file.path)
        .filter(isHandlebarsFilename)
        .forEach(filepath => {
            console.log(filepath)
            /**
             * Implement the Harp metadata protocol.
             * @see http://harpjs.com/docs/development/metadata
             */
            let layout = null;
            let harp = {
                basename: path.basename(filepath, path.extname(filepath)),
                data: {}
            };

            try {
                harp.data = fs.readJsonSync(`${path.dirname(filepath)}${path.sep}_data.json`)[harp.basename]
            } catch (_) {}

            context = { ...harp.data, ...context }

            try {
                layout = fs.readFileSync(`${path.dirname(filepath)}${path.sep}_layout.hbs`).toString();
            } catch (_) {}

            try {
                const fileContents = fs.readFileSync(filepath).toString();
                const template = Handlebars.compile(fileContents)(context);

                /**
                 * Utilize the "_layout.hbs" file if present.
                 * @see http://harpjs.com/docs/development/layout
                 */
                const renderedFileContents = layout
                    ? Handlebars.compile(layout)({ content: template, ...context })
                    : template;
                const renderedFilepath = filepath.replace(/\.hbs$/i, '.html');

                // TODO: Instead of writing here collect as a dict and write later?
                fs.writeFileSync(renderedFilepath, renderedFileContents);
            } catch (error) {
                // TODO: Think over a good error handling model!
                throw error;
            }
        });
}
