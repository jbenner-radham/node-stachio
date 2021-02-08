import 'core-js/features/object/from-entries'; // Polyfill for < Node.js@12
import fs from 'fs-extra';
import negate from 'lodash.negate';
import isHandlebarsFilename from './is-handlebars-filename';
import isLayoutFilename from './is-layout-filename';
import isPrivateFilename from './is-private-filename';
import readPartialEntry from './read-partial-entry';

export default function readPartials(): { [name: string]: string } {
    const cwd = process.cwd();

    /**
     * Implement Harp partials.
     * @see http://harpjs.com/docs/development/partial
     */
    const partialEntries = fs.readdirSync(cwd)
        .filter(isPrivateFilename)
        .filter(isHandlebarsFilename)
        .filter(negate(isLayoutFilename))
        .map(readPartialEntry);

    return Object.fromEntries(partialEntries);
}
