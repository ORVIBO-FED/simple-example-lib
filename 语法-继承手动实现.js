// 声明1
function M1 (x) {
  this.m1 = x
}

M1.prototype.yell1 = function () {
  console.log('yell1')
}

// 声明2
function M2 (x) {
  this.m2 = x
}

M2.prototype.yell2 = function () {
  console.log('yell2')
}

// 继承
function S (x) {
  M1.call(this, x)
  M2.call(this, x)
}

S.prototype = Object.create(M1.prototype)
Object.assign(S.prototype, M2.prototype)
S.prototype.constructor = S

const s = new S('cat')
console.log(s)
console.log(S.prototype.constructor)
s.yell1()
s.yell2()

