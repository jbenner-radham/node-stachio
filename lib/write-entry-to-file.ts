import fs from 'fs-extra';
import path from 'path';

export default function writeEntryToFile([filepath, fileContents]: [string, string]): [filepath: string, fileContents: string] {
    fs.ensureDirSync(path.dirname(filepath));
    fs.writeFileSync(filepath, fileContents);

    return [filepath, fileContents];
}
