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

var tiger1 = new Tiger("老虎", "黑丝");

cat1.yell();
cat1.eat();
tiger1.yell();
tiger1.eat();
console.log(tiger1.constructor)
