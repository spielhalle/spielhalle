var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/app.ts",
    output: {
        path: path.resolve("dist/web"),
        filename: "bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".tsx", ".ts", ".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Tank Calling",
            template: "src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: "assets",
                    toType: "dir"
                }
            ]
        })
    ],

    mode: 'development',
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            }, {
                test: /\.ts$/,
                loader: "ts-loader"
            }, {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                loader: 'file-loader'
            }
        ]
    },
    /*
        externals:
        // Don't bundle pixi.js, assume it'll be included in the HTML via a script
        // tag, and made available in the global variable PIXI.
        { "pixi.js": "PIXI" }
    */

};
