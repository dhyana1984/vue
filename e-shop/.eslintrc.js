module.exports = {
    //仅使用本配置
    root:true,
    //文件解析器
    parser:"vue-eslint-parser",
    parserOptions:{
        //对javascript使用babel-eslint
        "parser":"babel-eslint",
        "ecmaVersion":2017,
        //使用import/export语法
        "sourceType":"module"
    },
    //全局变量
    env:{
        browser:true,
        es6:true
    },
    extends: [
        // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
        'standard',
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended',
      ],
      rules: {
        // https://github.com/babel/babel-eslint/issues/517
        'no-use-before-define': 'off',
        'comma-dangle': ['error', 'always-multiline'],
      },
}