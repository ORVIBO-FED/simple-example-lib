/* ---------------------------------------------------------------------------------------
* about:百元买鸡问题
* author:马兆铿
* date:2019-2-30
* ---------------------------------------------------------------------------------------- */
// 要求得到100只🐔，问有多少方法
const MONEY = 100;
const CNT_NEED_TO_BUY = 100;
const PRICE_ROOSTER = 5;
const PRICE_HEN = 3;
const PRICE_CHICK = 1 / 3;

// 确定取值空间
const range = {
  rooster: [0, MONEY / PRICE_ROOSTER],
  hen: [0, Math.floor(MONEY / PRICE_HEN)],
  chick: [0, Math.floor(MONEY / PRICE_CHICK)],
};

console.log("range:", range);

/**
 * 购买函数
 * @param range 购买的数量范围
 */
function buy(range) {
  let cnt = 0;
  for (let rooster = range.rooster[0]; rooster <= range.rooster[1]; rooster++) {
    for (let hen = range.hen[0]; hen <= range.hen[1]; hen++) {
      for (let chick = range.chick[0]; chick <= range.chick[1]; chick++) {
        if (
          rooster + hen + chick === CNT_NEED_TO_BUY &&
          rooster * PRICE_ROOSTER + hen * PRICE_HEN + chick * PRICE_CHICK === MONEY &&
          chick % 3 === 0
        ) {
          console.log(rooster, hen, chick);
          cnt++;
        }
      }
    }
  }
  return cnt;
}

console.log("res:", buy(range));


