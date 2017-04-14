const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
console.log('fffff', path.join(__dirname, 'src/home'));
const pathapp = {
    entry: path.join(__dirname, 'src/home'),
    context: path.join(__dirname, 'src'),
    outputDir: path.join(__dirname, 'dist'),
    outputFile: '[name]/index.js',
    dist: 'dist'
};

// берем переменную окружения
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    // Входные данные
    entry: {
        home: pathapp.entry // Входной файл
    },
    watch: NODE_ENV == 'development', // вотчер только для разработки

    watchOptions: {
        aggregateTimeout: 100 // задержка перед обработкой
    },

    devtool: NODE_ENV == 'development'
        ? 'source-map'
        : null, // sourcemap только для разработки

    output: {
        path: pathapp.outputDir,
        publicPath: '/',
        filename: pathapp.outputFile
    },

    module: {
        loaders: [
            {
                test: /\.(pug|jade)$/,
                loader: [
                    'file-loader?name=[path][name].html&context='+pathapp.context,
                    'pug-html-loader?exports=false'
                ]
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
                test: /\.(ttf|woff|woff2|eot|png|svg)/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[path][name].[ext]',
                    context: pathapp.dist
                }
            }
        ]
    },
    plugins: [new ExtractTextWebpackPlugin('[name]/styles.css')],
    devServer: {
        contentBase: pathapp.outputDir
    }
}
