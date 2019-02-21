/* ---------------------------------------------------------------------------------------
* about:三点坐标求夹角大小。可以用于制作「转盘」。
* author:马兆铿
* date:2019-2-21
* ---------------------------------------------------------------------------------------- */

/**
 * 传入坐标数组，返回角度数组
 * @param a
 * @param b
 * @param c
 */
function getAngle(a, b, c) {
  const A = {X: a[0], Y: a[1]};
  const B = {X: b[0], Y: b[1]};
  const C = {X: c[0], Y: c[1]};
  //
  var lengthAB = Math.sqrt(Math.pow(A.X - B.X, 2) +
    Math.pow(A.Y - B.Y, 2)),
    lengthAC = Math.sqrt(Math.pow(A.X - C.X, 2) +
      Math.pow(A.Y - C.Y, 2)),
    lengthBC = Math.sqrt(Math.pow(B.X - C.X, 2) +
      Math.pow(B.Y - C.Y, 2));
  var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
    (2 * lengthAB * lengthAC);
  var cosB = (Math.pow(lengthAB, 2) + Math.pow(lengthBC, 2) - Math.pow(lengthAC, 2)) /
    (2 * lengthAB * lengthBC);
  var cosC = (Math.pow(lengthAC, 2) + Math.pow(lengthBC, 2) - Math.pow(lengthAB, 2)) /
    (2 * lengthAC * lengthBC);

  /**
   * 用反三角函数计算夹角
   * @param x
   * @returns {number}
   */
  function angle(x) {
    return Math.round(Math.acos(x) * 180 / Math.PI);
  }

  return [angle(cosA), angle(cosB), angle(cosC)];
}

// 调用
const triangle1 = getAngle([0, 0], [2, 0], [0, 2]);
const triangle2 = getAngle([0, 0], [2, 0], [0, 1]);

console.log("角度为：", triangle1);
console.log("角度为：", triangle2);
