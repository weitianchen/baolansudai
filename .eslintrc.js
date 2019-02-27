module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  'rules': {
    "no-console": 0,//禁止使用console
    // "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
    // "no-multiple-empty-lines": [1, { "max": 2 }],//空行最多不能超过2行w
    // "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    // "comma-spacing": 0,//逗号前后的空格
    // "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    // "indent": [2, 4],//缩进风格
    "semi-spacing": [2, { "before": false, "after": true }],//分号前后空格
  }
}

