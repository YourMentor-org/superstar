const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
console.log('fffff', path.join(__dirname, 'dist'));

// берем переменную окружения
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    // Входные данные
    entry: { // вход
        index: path.join(__dirname, 'src')
    },

    output: { // вывод
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js'
    },

    devServer: { // включение сервера разработки
        contentBase: './dist', // куда компилить
        // info: true,
        hot: false,
        inline: true // записывает специальный скрипт на странице для обновления без
        // перезагрузки
    },

    module: {
        loaders: [
            {
                test: /\.(pug|jade)$/,
                loader: ['file-loader?name=[path][name].html&context=src', 'pug-html-loader?exports=false']
            },
            // js loader
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                }
            },
            // Stylus files
            {
                test: /\.styl$/,
                loader: ExtractTextWebpackPlugin.extract(['css-loader', 'postcss-loader', 'stylus-loader'])
            },
            // CSS files
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract(['css-loader', 'postcss-loader'])
            },
            // Files that require no compilation or processing
            {
                test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                loader: [
                    'file?context=' + path.join(__dirname, 'src') + '&name=assets/static/[ext]/[name].[hash].[ext]'
                ]
            }
        ]
    },
    plugins: [new ExtractTextWebpackPlugin('[name]/styles.css')]
}
