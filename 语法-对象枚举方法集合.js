/*----------------------------------------------------------------------------------
* about:枚举方法
* author:马兆铿
* date:2019-4-19
* ----------------------------------------------------------------------------------*/

function Obj() {
  this.type = 99;
  this.say = {
    name: "you",
    words: "hello"
  }
}

Obj.prototype.inPrototypeProp = "原型链上的";

const obj = new Obj();
// 可枚举：单个
const objinPrototypeProp = obj.inPrototypeProp; // '原型链上的'
const objHasOwn = obj.hasOwnProperty("inPrototypeProp"); // false
const objProIsEnu = obj.propertyIsEnumerable("inPrototypeProp"); // false
console.log(objHasOwn, objProIsEnu)
// 可枚举：数组
const keyList = Object.keys(obj); // [ 'type', 'say' ]
const valueList = Object.values(obj); // [ 99, { name: 'you', words: 'hello' } ]
const entryList = Object.entries(obj); // [ [ 'type', 99 ], [ 'say', { name: 'you', words: 'hello' } ] ]
// 可枚举 + 原型链
for (let key in obj) {
  console.log("for的输出", key) // 'type', 'say', 'inPrototypeProp'
}
// 可枚举 + 不可枚举 - 原型链
const objGetOwnProNames = Object.getOwnPropertyNames(obj); //[ 'type', 'say' ]
