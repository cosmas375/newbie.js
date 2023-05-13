const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end();

        config.resolve.extensions.add('.ts').add('.tsx');

        config.resolve.modules.add('node_modules');

        config.plugin('html').tap(args => {
            args[0].template = path.resolve('../index.html');
            return args;
        });
    },
});
