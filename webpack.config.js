'use strict';
const webpack = require('webpack');
let path = {
    outputDir: __dirname + '/dist/js',
    outputFile: 'bundle.js'
};

// берем переменную окружения
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname,
    entry: './src/js/app.js', // входной скрипт
    watch: NODE_ENV == 'development', // вотчер только для разработки
    watchOptions: {
        aggregateTimeout: 100 // задержка перед обработкой
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : null, // sourcemap только для разработки
    output: {
        path: path.outputDir,
        filename: path.outputFile
    },
    module: {
        loaders: [
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader'
            },
            {
                test: /\.js/,
                loader: 'babel-loader?presets[]=es2015',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
}
