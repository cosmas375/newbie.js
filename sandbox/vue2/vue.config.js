module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();

    config.resolve.extensions.add('.ts').add('.tsx');

    config.resolve.modules.add('node_modules');
  },
};
