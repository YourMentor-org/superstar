const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
console.log('fffff', path.join(__dirname, 'dist'));

// берем переменную окружения
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    // Входные данные
    context: path.join(__dirname, 'src'), // Поиск модулей начиная с этой папки

    entry: { // вход
        searchPage: './pages/search-page' // точка входа src/index.js
    },

    output: { // вывод
        path: path.join(__dirname, 'dist'),
        publicPath: '/', // Указывает какой путь будет у динамически подключаемых модулей
        filename: '[name].js' // имя будет зависит от точки входа
    },

    devServer: { // включение сервера разработки
        contentBase: path.join(__dirname, 'dist'), // куда компилить
        // info: true,
        hot: false,
        inline: true // записывает специальный скрипт на странице для обновления без
        // перезагрузки
    },

    // resolve: {
    //     modulesDirectories: ['node_modules']
    // },

    module: {
        loaders: [
            {
                test: /\.(pug|jade)$/,
                exclude: /(node_modules|bower_components)/,
                loader: ['file-loader?name=[name].html&context=src', 'pug-html-loader?exports=false']
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
                loader: ['file-loader?name=[path][name].[ext]']
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextWebpackPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({name: 'common'})
    ]
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }))
}
