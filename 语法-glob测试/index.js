/*----------------------------------------------------------------------------------
* about:glob语法测试
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-
* ----------------------------------------------------------------------------------*/
const glob = require('glob')
const path = require('path')
const ROOT = path.resolve(__dirname)

// 找到所有 vue 文件，但是不包括 components 下的 vue 文件
// const rule = '/pages/**/Add/*.vue' Add下的
// const rule = '/pages/**/components/**/*.vue' 找到了 components 下的所有
// const rule = '/pages/**/!(components)/*.vue' 排除了 components 下的直接子 vue
const rule = '/pages/**/*.vue'
const ruleWhole = ROOT + rule
const ignore = ROOT + '/pages/**/components/**'

console.log('路径', ruleWhole)
console.log('忽略', ignore)

// options is optional
glob(ruleWhole, { ignore }, function (er, files) {
  console.log(files)
  if ([].some.call(files, item => item.indexOf('components') > -1)) {
    console.log('❌含有components文件下的vue文件，错误')
  } else if (files.length > 0) {
    console.log('✔️正确')
  } else {
    console.log('没有匹配上')
  }
})
