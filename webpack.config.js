var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: './app/index.js',
    output: {
        path: __dirname + "/dist/",
        filename: "js/app.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
            },
            {
            test: /.*\.(gif|png|jpe?g)$/i,
            use: "file-loader?name=[name].[ext]&publicPath=../&outputPath=images/"
          }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({

            minify: {
                collapseWhitespace: true
            },
            template: 'app/index.html'
        }),
        new ExtractTextPlugin('css/main.css')
    ]
};
