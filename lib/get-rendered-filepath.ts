import path from 'path';

export default function getRenderedFilepath(filepath = '', { cwd = '', destination = '' }): string {
    const relativeFilepath = path.relative(cwd, filepath);
    const destinationFilepath = path.resolve(destination, relativeFilepath);

    return destinationFilepath.replace(/\.hbs$/i, '.html');
}
