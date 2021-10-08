const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/ts/app.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions:['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use:  'ts-loader',
                include: [
                    path.resolve(__dirname, 'src/ts')    
                ]
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/index.html", to: "./index.html" },
                { from: "./src/css", to: "./css" },
                { from: "./src/icons", to: "./icons" },
                { from: "./src/manifest.json", to: "./manifest.json" },
                { from: "./src/sw.js", to: "./sw.js" },
            ],
        })
    ]

}