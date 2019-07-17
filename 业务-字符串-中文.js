/*----------------------------------------------------------------------------------
* about:找到中文
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-07-15
* ----------------------------------------------------------------------------------*/

/* ----------------------------------------- 包含中文字 ----------------------------------------- */
const list = [
  '哈哈',
  'hello world',
  'hello, jack',
  'hello 王小明',
  '123',
  'hello 123',
  '123 王小明',
  undefined,
  ''
]

function checkIfHaveCh(str) {
  const REG = /[^\x00-\xff]/
  return str && !!str.match(REG)
}

list.forEach(item => {
  console.log(item, checkIfHaveCh(item), encodeURI(item))
})