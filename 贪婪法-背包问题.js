/* ---------------------------------------------------------------------------------------
* about:0-1背包问题
* author:马兆铿
* date:2018-11-06
* ---------------------------------------------------------------------------------------- */

// 物品类
function Item(weight, price) {
  return {
    weight,
    price,
    status: 0, // 0：未选中 1：选中 2：已经不可选
  }
}

// 背包
const knapsack = {
  list: [], // 可选物品
  weightLeft: 150 // 总承重量
};

class Knapsack {
  constructor() {
    this.list = [];
    this.weightLeft = 150;
    this.totalPrice = 0;
    // 一批物品的重量和价值
    const wi = [35, 30, 60, 50, 40, 10, 25];
    const pi = [10, 40, 30, 50, 35, 40, 30];

    for (let i = 0; i < 7; i++) {
      this.list.push(new Item(wi[i], pi[i]));
    }
  }
}

console.log("原始背包", new Knapsack());

/**
 * 按照价值密度装入
 */
(function packByDensity() {
  const knapsack = new Knapsack();

  function testalble(target) {
    target.isAlmostFull = false; // 几乎填满
    target.isFull = false; // 填满
  }

  testalble(knapsack);


  // 算密度
  knapsack.list.forEach(item => {
    item.density = Math.round(item.price / item.weight * 100) / 100; // 保留小数两位
  });
  console.log("背包1", knapsack);

  // 找到剩余的物品中，密度最大的物品
  function getMaxDensityItem() {
    let indexOfMax = 0;
    knapsack.list.forEach((item, index) => {
      const max = knapsack.list[indexOfMax].density;
      if (item.density >= max) {
        indexOfMax = index;
      }
    });
    const maxItem = knapsack.list[indexOfMax];
    // 还放得下
    if (knapsack.weightLeft >= maxItem.weight) {
      knapsack.weightLeft -= maxItem.weight;
      knapsack.totalPrice += maxItem.price;
      knapsack.list.splice(indexOfMax, 1); // 删除放入了的物品
    }
    // 饱满
    else {
      knapsack.isAlmostFull = true;
    }
  }

  // 填装
  while (!knapsack.isAlmostFull) {
    getMaxDensityItem();
  }

  // 剩余的最后，找到「能放入的」的里面的价值最大，来补充最后剩余的空间
  let max = 0;
  let indexOfMax = 0;
  knapsack.list.forEach((item, index) => {
    if (item.weight < knapsack.weightLeft && item.price > max) {
      max = item.price;
      indexOfMax = index;
    }
  });
  knapsack.weightLeft -= knapsack.list[indexOfMax].weight;
  knapsack.totalPrice += knapsack.list[indexOfMax].price;

  console.log("密度计算法算得", knapsack);
})();