/*----------------------------------------------------------------------------------
* about:Promise 链的特点：1.下一个环节必须返回 Promise 对象 2.需要有错误处理函数，否则 reject 后会报错
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-10-30
* ----------------------------------------------------------------------------------*/

/* ----------------------------------------- 定义 ----------------------------------------- */
/**
 * Promise链式调用
 * @param arr
 * @returns {TypeError|*}
 */
function Promise_chain (arr) {
  if (!(typeof arr === 'object' && arr instanceof Array)) {
    return TypeError('has to be array of Promise')
  }
  let promise = Promise.resolve()
  while (arr.length) {
    promise = promise.then(arr.shift())
  }
  return promise
}

/* ----------------------------------------- 测试 ----------------------------------------- */

// 天气请求
function queryWeatherOfCity (city) {
  return new Promise((resolve, reject) => {
    console.log(`${city}多云`)
    resolve()
  })
}

// 定时器
function timerPromise (x) {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(+x)) {
      reject('not number')
    }
    setTimeout(() => {
      console.log('time up')
      resolve()
    }, x)
  })
}

const chain1 = [
  queryWeatherOfCity.bind(null, '深圳'),
  timerPromise.bind(null, 500),
  queryWeatherOfCity.bind(null, '广宁'),
  timerPromise.bind(null, 500),
  queryWeatherOfCity.bind(null, '东莞'),
]

const chain2 = [
  queryWeatherOfCity.bind(null, '深圳'),
  timerPromise.bind(null, 500),
  queryWeatherOfCity.bind(null, '广宁'),
  timerPromise.bind(null, undefined),
  queryWeatherOfCity.bind(null, '东莞'),
]

// 全部完成
Promise_chain(chain1).then(() => {
  console.log('/--- chain1完成 ---/')
})

// 中途报错
Promise_chain(chain2).catch(err => {
  console.log(err)
  console.log('/--- chain2中断 ---/')
})

