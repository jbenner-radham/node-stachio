#!/usr/bin/env node
const app = require('../dist/index').default;
// const app = require('../dist/bundle.min');

// console.log(typeof app, { app })

try {
    const cwd = process.cwd();
    const partials = app();

    console.log( { partials })
    // partials.forEach(partial => {
    //     const regex = /^_(.+)\.hbs$/i;
    //     // const matches = partial.match(regex);
    //     // const [, publicBasename] = partial.match(regex);

    //     console.log( { publicBasename })
    // });
} catch (error) {
    console.error(error);
}
