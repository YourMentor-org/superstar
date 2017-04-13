let webpack = require('webpack');
let path = {
    outputDir: __dirname + '/dist/js',
    outputFile 'bundle.js'
};

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: './src/js/app.js',
    output: {
        path: path.outputDir,
        filename: path.outputFile
    },
    
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
}
