const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'newbie.css',
  }),
];

module.exports = {
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    entry: './src/vanilla/index.ts',
    mode: 'development',
    plugins,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
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
        ]
    },
    output: {
        filename: 'newbie.js',
        path: path.resolve('./dist/vanilla'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};
