#!/usr/bin/env node

'use strict';

const meow = require('meow');
const path = require('path');
const app = require('../dist/index').default;
const attempt = require('../dist/attempt').default;
const readConfigFile = require('../dist/read-config-file').default;

const bin = 'stachio';
const defaultDestination = 'dist';
const cli = meow(`
    Usage
        $ ${bin} [$SOURCE_DIRECTORY=.] [$OUTPUT_DIRECTORY=${defaultDestination}]

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

(async () => {
    const cwd = attempt(() => path.resolve(cli.input[0])) || process.cwd();
    const config = await readConfigFile();
    const destination = attempt(() => path.resolve(cli.input[1])) || defaultDestination;

    app({ ...config, cwd, destination });
})();
