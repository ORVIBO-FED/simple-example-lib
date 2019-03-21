/* ---------------------------------------------------------------------------------------
* about:
* author:马兆铿
* date:2019-
* ---------------------------------------------------------------------------------------- */

const list = [
  {name: "ksadfsa", size: 9},
  {name: "Bdsafd", size: 4},
  {name: "bdasfds", size: 5},
  {name: "1dsaf", size: 1},
  {name: "099", size: 2},
  {name: "12", size: 2},
  {name: "8io", size: 7},
  {name: "我是谁", size: 8},
  {name: "あなたの後", size: 12},
  {name: "Adsafd", size: 3},
  {name: "*sfds", size: 3},
  {name: ".dsfds", size: 3},
  {name: "！dsafd", size: 3},
  {name: "😄ds", size: 3},
  {name: null, size: 3},
  {name: undefined, size: 3},
  {name: NaN, size: 3},
];

//排序函数
function compare(property) {
  return function (obj1, obj2) {
    const value1 = obj1[property];
    const value2 = obj2[property];
    return value1 > value2 ? 1 : -1; // 升序
  }
}

list.sort(compare("name"));

const numFirstArr = [];
const letterFirstArr = [];
const specialFirstArr = [];
const othersArr = [];
// 拆解
list.forEach(item => {
  const name = item.name;
  if (typeof name === "string") {
    const firstLetter = name[0];
    if (!isNaN(firstLetter)) {
      numFirstArr.push(item);
    } else if (firstLetter.match(/^[A-Za-z]$/)) {
      letterFirstArr.push(item)
    } else {
      specialFirstArr.push(item);
    }
  } else {
    othersArr.push(item);
  }
});

const newList = letterFirstArr.concat(numFirstArr).concat(specialFirstArr).concat(othersArr);

// 先大小写字母，再到数字
console.log(list.length);
console.log(newList.length);
console.log(newList);