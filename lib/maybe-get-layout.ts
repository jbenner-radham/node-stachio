import fs from 'fs-extra';
import path from 'path';
import attempt from './attempt';

export default function maybeGetLayout(filepath: string): string {
    const layoutFilepath = `${path.dirname(filepath)}${path.sep}_layout.hbs`;

    return attempt(() => fs.readFileSync(layoutFilepath).toString()) ?? '';
};
