export default function isLayoutFilename(filename: string): boolean {
    return filename.toLowerCase() === '_layout.hbs';
}
