const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired');
const SassRuleRewirer = require('./sass.conf');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.join(__dirname, 'src')
  }
  config = injectBabelPlugin([
    'import',
    { libraryName: 'antd-mobile', style: 'css' }
  ], config);

  new SassRuleRewirer()
    .withLoaderOptions({
      data: `@import "src/var.sass";`
    })
    .rewire(config, env);
  return config;
}
