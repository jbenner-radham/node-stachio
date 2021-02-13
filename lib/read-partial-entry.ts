import fs from 'fs-extra';
import path from 'path';

export default function readPartialEntry(filename: string, { cwd = '' }): [name: string, contents: string] {
    const publicBasenameRegex = /^_(.+)\.hbs$/i;
    const [, name] = filename.match(publicBasenameRegex);
    const filepath = path.resolve(cwd, filename);
    const contents  = fs.readFileSync(filepath).toString();

    return [name, contents];
}
