// 例子
var list = [
  // B
  {value: 0, expect: "0B"},
  {value: 30, expect: "30B"},
  {value: 546, expect: "546B"},
  // KB小数：两位，0则省略
  {value: 400000, expect: "400KB"},
  {value: 138752, expect: "138.75KB"},
  {value: 100905, expect: "100.90KB"},
  {value: 100095, expect: "100.09KB"},
  {value: 100001, expect: "100KB"},
  // MB
  {value: 8702287, expect: "8.70MB"},
  {value: 9037151, expect: "9.03MB"},
  // MB小数：两位，0则省略
  {value: 49000000, expect: "49MB"},
  {value: 949990000, expect: "949.99MB"},
  {value: 10037151, expect: "10.03MB"},
  {value: 10237151, expect: "10.23MB"},
  {value: 11237151, expect: "11.23MB"},
  // GB
  {value: 9011237151, expect: "9.01GB"},
];

// 功能：将浮点数四舍五入，取小数点后2位，如果不足2位则补0,这个函数返回的是字符串的格式
function changeTwoDecimal_f(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  f_x = Math.floor(f_x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}

/**
 * 文件大小格式整理成带单位字符串
 * @param x
 */
function unitModify(x) {
  let num = x;
  let unit_cnt = 0;

  function downgrade(num) {
    return Math.floor(num / 1000);
  }

  while (downgrade(num)) {
    unit_cnt += 1;
    num = downgrade(num);
  }
  var unit_name = {
    0: "B",
    1: "KB",
    2: "MB",
    3: "GB"
  }[unit_cnt];
  if (unit_cnt) {
    var pow = Math.pow(10, unit_cnt * 3);
    var modifyNum = changeTwoDecimal_f(x / pow);
    var zeroPos = modifyNum.indexOf("."); // 0的位置
    if (modifyNum.slice(zeroPos) === ".00") {
      return modifyNum.slice(0, zeroPos) + unit_name;
    } else {
      return modifyNum + unit_name;
    }
  } else {
    return x + unit_name;
  }
}

// 校验
list.forEach(item => {
  var res = unitModify(item.value);
  console.log(res === item.expect, item.expect, res);
});

