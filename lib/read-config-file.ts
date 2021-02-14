import path from 'path';
import attempt from './attempt';

export const CONFIG_RELATIVE_FILEPATH = path.join('.config', 'stachio', 'config.js');

export default function readConfigFile(): Promise<Record<string, any>> {
    const configFilepath = path.resolve(process.cwd(), CONFIG_RELATIVE_FILEPATH);

    return attempt(() => import(configFilepath)) ?? Promise.resolve({});
}
