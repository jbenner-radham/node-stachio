import path from 'path';

export default function isPrivateFilename(filename: string): boolean {
    return path.basename(filename).startsWith('_');
};
