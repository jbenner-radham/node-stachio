export default function isPrivateFilename(filename: string): boolean {
    return filename.startsWith('_');
}
