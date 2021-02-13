#!/usr/bin/env node
const app = require('../dist/index').default;

try {
    const cwd = process.cwd();
    const destination = 'dist';
    const pages = app({ cwd, destination });

    console.log({ pages })
} catch (error) {
    console.error(error);
}
