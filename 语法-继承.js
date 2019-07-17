/* ---------------------------------------------------------------------------------------
* about:继承的方法
* author:马兆铿
* date:2019-4-22
* ---------------------------------------------------------------------------------------- */

/* ----------------------------------------- ES5 ----------------------------------------- */

function Cat(name, color) {
  this.name = name
  this.color = color
}

Cat.prototype.yell = function () {
  console.log(this.name + "喵喵叫")
}
Cat.prototype.eat = function () {
  console.log(this.name + '吃猫粮')
}
var cat1 = new Cat('猫', '白色')

console.info('\n/* 继承的实现 */')

function Tiger() {
  Cat.call(this, ...arguments) // 第一步
}

Tiger.prototype = Object.create(Cat.prototype)
Tiger.prototype.constructor = Tiger
Tiger.prototype.eat = function () {
  console.log(this.name + '吃人肉')
}
Tiger.prototype.kill = function () {
  console.log(this.name + '杀人')
}
Cat.prototype.yell = function () {
  console.log(this.name + "改口，汪汪叫")
}
var tiger1 = new Tiger("老虎", "黑丝")

cat1.yell()
cat1.eat()
// cat1.kill(); // undefined
tiger1.yell()
tiger1.eat()
tiger1.kill()
console.log(tiger1.constructor)

console.info('\n/* 对原型的操作 */')

const cat2 = new Cat('猫', '黑色')
cat1.__proto__.boo = 'boo'
cat2.foo = 'foo'
// Cat.prototype.boo = 'boo' // 等价于上一句
console.log('Cat的prototype上多了boo', Cat.prototype)
console.log('Cat本身没有boo，color之类的也没有', Cat.boo, Cat.color)
console.log('cat1上没有boo，但是cat1能用boo', cat1, cat1.boo)
console.log('cat2上没有boo，但是cat2能用boo', cat2, cat2.boo)
console.log('cat2上有foo，cat1上没有', cat2.foo, cat1.foo)

/* ----------------------------------------- ES6 ----------------------------------------- */
class Yog {
  constructor(name) {
    this.name = name
  }

  kill() {
    console.log(this.name + "杀死所有人")
  }

  yell() {
    console.log("呼唤")
  }
}

class SonOfYog extends Yog {
  constructor(name) {
    super(...arguments)
  }

  kill() {
    console.log(this.name + "杀死一个村民")
  }
}

const yog = new Yog("尤格索托斯")
const sonOfYog = new SonOfYog("威利")

console.info('\n/* 方法的继承 */')
yog.kill()
sonOfYog.kill()
sonOfYog.yell()




