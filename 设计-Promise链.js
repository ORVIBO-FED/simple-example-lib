/*----------------------------------------------------------------------------------
* about:Promise 链的特点：1.下一个环节必须返回 Promise 对象 2.需要有错误处理函数，否则 reject 后会报错
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-10-30
* ----------------------------------------------------------------------------------*/

let promise = Promise.resolve()
const chain = []

function send (x) {
  console.log('send', x)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x === 2) {
        return reject('--中断-- ' + x)
      }
      console.log('完成', x)
      resolve({ errcode: 0 })
    }, 300)
  })
}

for (let i = 0; i < 4; i++) {
  const queryFn = () => {
    return send(i)
  }

  chain.push(queryFn)
}

while (chain.length) {
  promise = promise
    .then(
      chain.shift(),
      (err) => {
        console.log(err)
      }
    )
}
