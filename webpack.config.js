'use strict';
const webpack = require('webpack');
const path    = require('PATHAPP');
const PATHAPP = {
    entry: './src/js/app.js',
    outputDir: __dirname + '/dist/js',
    outputFile: 'bundle.js'
};

// берем переменную окружения
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname,
    // Входные данные
    entry: {
        application: PATHAPP.entry // Входной файл
    }
    watch: NODE_ENV == 'development', // вотчер только для разработки
    watchOptions: {
        aggregateTimeout: 100 // задержка перед обработкой
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : null, // sourcemap только для разработки
    devServer: {
        contentBase: PATHAPP.dist,
        info:        true,
        hot:         false,
        inline:      true
    },
    output: {
        PATHAPP: PATHAPP.outputDir,
        filename: PATHAPP.outputFile
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
