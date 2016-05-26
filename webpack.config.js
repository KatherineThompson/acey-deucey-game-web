"use strict";

// const autoprefixer = require("autoprefixer"); 
const path = require("path");

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
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ],
        noParse: [/foundation-apps/, /lodash/, /angular.js$/]
    },
    sassLoader: {
        includePaths: [path.join(__dirname, "node_modules", "foundation-apps", "scss")]
    },
    // postcss: [],
    devtool: "inline-source-map"
};  