"use strict";

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "built.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: { presets: ["es2015"]}
            }
        ],
        noParse: [/foundation-apps/, /lodash/, /angular/]
    }
};