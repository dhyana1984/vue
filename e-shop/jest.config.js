module.exports = {
  //transform定义了javascript文件和vue文件的处理器
  transform: {
    '.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '.+\\.vue$': '<rootDir>/node_modules/vue-jest',
  },
  //告诉jest使用jest-serializer-vue序列化组件快照
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  //启动源代码映射
  mapCoverage: true,
}
