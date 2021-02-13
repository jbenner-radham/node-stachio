import klawSync from 'klaw-sync';

export default function readFilenames(directory: string): string[] {
    const nodir = true;

    return klawSync(directory, { nodir })
        .map(file => file.path);
}
