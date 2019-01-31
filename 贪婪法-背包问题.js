/* ---------------------------------------------------------------------------------------
* about:0-1背包问题
* author:马兆铿
* date:2018-11-06
* ---------------------------------------------------------------------------------------- */

// 物品类
function Item(weight, price) {
  return {
    weight,
    price
  }
}

// 一批物品的重量和价值
const wi = [35, 30, 60, 50, 40, 10, 25];
const pi = [10, 40, 30, 50, 35, 40, 30];
const itemList = [];
for (let i = 0; i < 7; i++) {
  itemList.push(new Item(wi[i], pi[i]));
}


class Knapsack {
  constructor() {
    this.list = [];
    this.weightLeft = 150; // 可装载重量
    this.totalPrice = 0;
  }
}

const knapsack = new Knapsack();

console.log("原始背包", knapsack);

/**
 * 排序函数，根据数组属性
 */
function compare(propName) {
  return function (obj1, obj2) {
    var val1 = obj1[propName];
    var val2 = obj2[propName];
    if (val1 < val2) { //正序
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  }
}

function putItemInto() {
  // 第一原则：性价比最高
  itemList.forEach(item => {
    item.ratio = parseInt(item.price / item.weight * 100) / 100;
  });

  itemList.sort(compare("ratio"));

  console.log("根据性价比排序后的物品列表", itemList);

  // 放入
  itemList.forEach(item => {
    // 第二原则：可放入
    if (knapsack.weightLeft >= item.weight) {
      knapsack.list.push(item);
      knapsack.totalPrice += item.price;
      knapsack.weightLeft -= item.weight;
    }
  });

  console.log("最终背包", knapsack);
}

putItemInto();

