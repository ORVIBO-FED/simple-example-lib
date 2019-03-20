/**
 * 快速排序，顺序为小到大
 * @param arr
 */
function quickSort() {
  const list = [85, 24, 63, 45, 17, 31, 96, 50];

  function partion(x, y) {
    return Math.floor((x + y) / 2);
  }

  function handle(arr, start, end) {
    const range = end - start;
    if (range > 1) {
      console.log("⬇️");
      const mid = partion(start, end); // 基准
      const standard = arr[mid];
      console.log(`${start}到${end}`, `基准${mid}值为${standard}`);
      const left = [];
      const right = [];
      for (let i = start; i <= end; i++) {
        const item = arr[i];
        if (item < standard) left.push(item);
        if (item > standard) right.push(item);
      }
      console.log(left, [standard], right);
      left.push(standard); // left到最后一个，也是原来数组到中间
      arr.splice(start, range + 1, ...left.concat(right));
      console.log("处理后", arr);
      handle(arr, start, mid);
      handle(arr, mid, end);
    }
  }

  handle(list, 0, list.length - 1);
  return list;
}

console.log(quickSort());
