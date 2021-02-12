import fs from 'fs-extra';
import path from 'path';
import attempt from './attempt';

export interface HarpContext {
    basename: string;
    data: Record<string, any>;
};

export default function getHarpContext(filepath: string): HarpContext {
    /**
     * Implement the Harp metadata protocol.
     * @see http://harpjs.com/docs/development/metadata
     */
    const harpDataFilepath = `${path.dirname(filepath)}${path.sep}_data.json`;
    const harp = {
        basename: path.basename(filepath, path.extname(filepath)),
        data: attempt(() => fs.readJsonSync(harpDataFilepath)[harp.basename]) ?? {}
    };

    return harp;
};
