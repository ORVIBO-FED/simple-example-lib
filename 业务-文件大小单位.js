// 例子
var list = [
  // B
  {value: 0},
  {value: 30},
  {value: 546},
  //  KB小数：两位，0则省略
  {value: 400000},
  {value: 138752},
  {value: 100905},
  {value: 100095},
  {value: 100001},
  // MB
  {value: 8702287},
  {value: 9037151},
  // MB小数：两位，0则省略
  {value: 49000000},
  {value: 949990000},
  {value: 10037151},
  {value: 10237151},
  {value: 11237151},
  //  GB
  {value: 9011237151},
];

/**
 * 文件大小格式整理成带单位字符串
 * @param x
 */
function numAndUnitModify(x) {
  function formatFileSize(fileSize, idx = 0) {
    const units = ["B", "KB", "MB", "GB"];
    if (fileSize < 1024 || idx === units.length - 1) {
      return fileSize.toFixed(2) + units[idx];
    }
    return formatFileSize(fileSize / 1024, ++idx);
  }

  var res = formatFileSize(x);
  if (res.indexOf(".00") > -1) {
    res = res.replace(".00", "");
  }
  return res;
}

// 校验
list.forEach(item => {
  item.trans = numAndUnitModify(item.value);
});

console.log(list);


