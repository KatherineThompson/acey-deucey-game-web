"use strict";

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "built.js"
    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
        }
    ]
};