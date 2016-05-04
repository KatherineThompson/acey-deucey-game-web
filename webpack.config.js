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
                exclude: /node_modules\/(?!acey-deucey-game-engine)/,
                loader: "babel",
                query: { presets: ["es2015"]}
            }
        ],
        noParse: [/foundation-apps/, /lodash/, /angular.js$/]
    },
    devtool: "inline-source-map"
};