const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    entry: './src/core/index.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'newbie.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};
