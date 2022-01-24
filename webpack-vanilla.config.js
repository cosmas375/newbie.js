const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname),
    entry: './src/entry-vanilla.ts',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'newbie.css',
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts'],
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
        path: path.resolve('./dist/vanilla'),
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    devServer: {
        static: [path.join(__dirname, './sandbox/vanilla/')],
    },
};
