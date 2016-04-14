"use strict";

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "built.js"
    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ['es2015']
            }
        }
    ]
};