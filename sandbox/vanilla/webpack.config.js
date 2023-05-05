const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: ['../../src/entry-vanilla.ts', './index.js', './style.css'],
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'newbie.css',
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts'],
        }),
        new HtmlWebpackPlugin({
            template: '../index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: 'newbie.js',
        path: path.resolve('./dist/cdn'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};
