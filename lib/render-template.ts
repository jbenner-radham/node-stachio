import fs from 'fs-extra';
import Handlebars from 'handlebars';

export default function renderTemplate(filepath: string, { context = {}, layout = '' }): string {
    const fileContents = fs.readFileSync(filepath).toString();
    const template = Handlebars.compile(fileContents)(context);

    return layout
        ? Handlebars.compile(layout)({ content: template, ...context })
        : template;
}
