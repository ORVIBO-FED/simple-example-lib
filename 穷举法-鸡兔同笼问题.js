/* ---------------------------------------------------------------------------------------
* about:鸡兔同笼问题
* author:马兆铿
* date:2019-2-30
* ---------------------------------------------------------------------------------------- */
// 要求得到
const total = {head: 50, feet: 120};
const FEET_CHICKEN = 2;
const FEET_RABBIT = 4;

function min(x, y) {
  return x > y ? y : x;
}

// 确定取值空间
const range = {
  chicken: [0, min(total.feet / FEET_CHICKEN, total.head)],
  rabbit: [0, min(total.feet / FEET_RABBIT, total.head)]
};

console.log("range", range);

for (let chicken = range.chicken[0]; chicken <= range.chicken[1]; chicken++) {
  for (let rabbit = range.rabbit[0]; rabbit <= range.rabbit[1]; rabbit++) {
    if (
      chicken + rabbit === total.head &&
      chicken * FEET_CHICKEN + rabbit * FEET_RABBIT === total.feet
    ) {
      console.log(chicken, rabbit);
    }
  }
}


