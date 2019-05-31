/*----------------------------------------------------------------------------------
* about:各种类型判断
* author:马兆铿
* date:2019-5-31
* ----------------------------------------------------------------------------------*/

// 数组
function isArray(arr) {
  return arr && typeof arr === "object" && arr instanceof Array;
}

console.group("数组检查");
[
  [],
  undefined,
  [1, 2, 3],
  {0: "one", 1: "two", length: 2},
].forEach(item => {
  console.log(item, `isArray：${isArray(item) ? '✔️' : '❌'}`)
});
console.groupEnd();

// 对象
function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]'
}

console.group("对象检查");
[
  {},
  undefined,
  {0: "one", 1: "two", length: 2},
  Object.create(null)
].forEach(item => {
  console.log(item, `isObject：${isObject(item) ? '✔️' : '❌'}`)
});
console.groupEnd();

// 函数
function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]'
}

// 数组：数字数组
function isNumArray(val) {
  return isArray(val) && val.every(item => !Number.isNaN(item));
}

console.group("数字数组检查");
[
  [],
  undefined,
  [1, 2, 3],
  {0: "one", 1: "two", length: 2},
].forEach(item => {
  console.log(item, `isNumArray：${isNumArray(item) ? '✔️' : '❌'}`)
});
console.groupEnd();