import klawSync from 'klaw-sync';
import negate from 'lodash.negate';
import path from 'path';
import isPrivateFilename from './is-private-filename';

export default function lsFilesRecursively(directory: string): string[] {
    const nodir = true;
    const filter = (file: klawSync.Item) => negate(isPrivateFilename)(path.basename(file.path))
        && !/\/node_modules\//.exec(file.path)
        && !/\/.git\//.exec(file.path)
        && !/\/dist\//.exec(file.path)
        && !file.path.endsWith('.gitignore');

    return klawSync(directory, { nodir, filter })
        .map(file => file.path);
}
