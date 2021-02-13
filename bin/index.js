#!/usr/bin/env node

'use strict';

const meow = require('meow');
const path = require('path');
const app = require('../dist/index').default;
const attempt = require('../dist/attempt').default;

const bin = 'stachio';
const defaultOut = 'dist';
const cli = meow(`
    Usage
        $ ${bin} [$SOURCE_DIRECTORY=.] [$OUT_DIRECTORY=${defaultOut}]

    Options
        --help, -h       Display this message.
        --version, -v    Display the application version.
`, {
    flags: {
        help: {
            alias: 'h'
        },
        version: {
            alias: 'v'
        }
    }
});

try {
    const cwd = attempt(() => path.resolve(cli.input[0])) || process.cwd();
    const destination = attempt(() => path.resolve(cli.input[1])) || defaultOut;
    const pages = app({ cwd, destination });

    //console.log({ pages })
    //console.log({ 'cli.input': cli.input })
} catch (error) {
    console.error(error);
}
