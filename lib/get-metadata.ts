import fs from 'fs-extra';
import path from 'path';
import attempt from './attempt';

export default function getMetadata(filepath: string): Record<string, any> {
    /**
     * Implement the Harp metadata protocol.
     * @see http://harpjs.com/docs/development/metadata
     */
    const metadataFilepath = `${path.dirname(filepath)}${path.sep}_data.json`;
    const basename = path.basename(filepath, path.extname(filepath));

    return attempt(() => fs.readJsonSync(metadataFilepath)[basename]) ?? {};
}
