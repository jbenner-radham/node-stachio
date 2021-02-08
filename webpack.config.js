const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './lib/index.ts',
    target: ['es5', 'node'],
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map', // Or alternatively: `inline-source-map`
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                // exclude: /node_modules/,
                use: [
                    /** @see https://www.npmjs.com/package/babel-loader */
                    'babel-loader',

                    /** @see https://www.npmjs.com/package/ts-loader */
                    'ts-loader'
                ]
            }
        ]
    }
}
