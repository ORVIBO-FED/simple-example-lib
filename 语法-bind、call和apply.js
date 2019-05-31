/*----------------------------------------------------------------------------------
* about:bind、call、apply 的实际作用其实都是一致的，就是「上下文」借用。
* - bind：主要生成一个新的函数，就好像说好了要借，但是只留下了联系方式。
* - call、apply：主要直接借用，为了构建时借入，为了使用时借出
* - apply：额外有「数组变成参数列表」的功能
* author:马兆铿
* date:2019-50-30
* ----------------------------------------------------------------------------------*/

/* ----------------------------------------- 借入 ----------------------------------------- */
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(null, name, price); // 函数是Product，里面的指针替换成这里的this
  // <==> Product.apply(this, [name, price]);
  // <==> Product.bind(this, name, price)();
  this.category = 'food';
}

const food = new Food("shit", 12);
console.log(food);

/* ----------------------------------------- 出借 ----------------------------------------- */
function greet() {
  var reply = [
    this.animal,
    'typically sleep between',
    this.sleepDuration
  ].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};
greet.call(obj);  // cats typically sleep between 12 and 16 hours
// <==>greet.apply(obj);
// <==> greet.bind(obj)();

/* ----------------------------------------- 借用标准库 ----------------------------------------- */
console.log(Array.prototype.join.call("hello", "-"));
console.log(Array.prototype.slice.call({0: "one", 1: "two", 2: "three", length: 2}, 0));

/* ----------------------------------------- apply：数组作为参数列表 ----------------------------------------- */
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.log(max);


