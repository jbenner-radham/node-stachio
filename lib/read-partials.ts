import 'core-js/features/object/from-entries'; // Polyfill for < Node.js@12
import fs from 'fs-extra';
import negate from 'lodash.negate';
import isHandlebarsFilename from './is-handlebars-filename';
import isLayoutFilename from './is-layout-filename';
import isPrivateFilename from './is-private-filename';
import readPartialEntry from './read-partial-entry';

export default function readPartials(cwd = ''): { [name: string]: string } {
    const partialEntries = fs.readdirSync(cwd)
        .filter(isPrivateFilename)
        .filter(isHandlebarsFilename)
        .filter(negate(isLayoutFilename))
        .map(partial => readPartialEntry(partial, { cwd }));

    return Object.fromEntries(partialEntries);
}
