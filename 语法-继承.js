/* ---------------------------------------------------------------------------------------
* about:继承的方法
* author:马兆铿
* date:2019-4-22
* ---------------------------------------------------------------------------------------- */

// ES5

function Cat(name, color) {
  this.name = name;
  this.color = color;
}

Cat.prototype.yell = function () {
  console.log(this.name + "喵喵叫");
}
Cat.prototype.eat = function () {
  console.log(this.name + '吃猫粮');
};
var cat1 = new Cat('猫', '白色');

function Tiger() {
  Cat.call(this, ...arguments); // 第一步
}

Tiger.prototype = Object.create(Cat.prototype);
Tiger.prototype.constructor = Tiger;
Tiger.prototype.eat = function () {
  console.log(this.name + '吃人肉');
};
Tiger.prototype.kill = function () {
  console.log(this.name + '杀人');
};
Cat.prototype.yell = function () {
  console.log(this.name + "改口，汪汪叫");
}
var tiger1 = new Tiger("老虎", "黑丝");

cat1.yell();
cat1.eat();
// cat1.kill(); // undefined
tiger1.yell();
tiger1.eat();
tiger1.kill();
console.log(tiger1.constructor)


// ES6

class Yog {
  constructor(name) {
    this.name = name;
  }

  kill() {
    console.log(this.name + "杀死所有人");
  }

  yell() {
    console.log("呼唤");
  }
}

class SonOfYog extends Yog {
  constructor(name) {
    super(...arguments);
  }

  kill() {
    console.log(this.name + "杀死一个村民");
  }
}

const yog = new Yog("尤格索托斯");
const sonOfYog = new SonOfYog("威利");

yog.kill();
sonOfYog.kill();
sonOfYog.yell();



