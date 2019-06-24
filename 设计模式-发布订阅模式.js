/*----------------------------------------------------------------------------------
* about:发布订阅模式
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-6-24
* ----------------------------------------------------------------------------------*/

// 对象：公共部分(单例模式)
const channelCore = {
  fnList: [], // 函数列表
  /**
   * 发送消息
   * @param data
   */
  postMessage(data) {
    const evt = {
      data
    }
    channelCore.fnList.forEach(item => {
      if (
        item.channelName === this.channelName && // 同一频道
        item.channelId !== this.channelId // 自己不接收
      ) {
        item.fn(evt)
      }
    })
  }
}

function PublishChannel(channelName) {
  this.channelName = channelName
  this.channelId = `${parseInt(Math.random() * Math.pow(10, 8))}`
}

PublishChannel.prototype.postMessage = channelCore.postMessage
// 保存订阅函数
PublishChannel.prototype.onmessage = function (fn) {
  channelCore.fnList.push({
    channelName: this.channelName,
    channelId: this.channelId,
    fn: fn.bind(this)
  })
}

// 频道的发布者和订阅者们
const publisher1 = new PublishChannel('channel-1')
const subscirbe1_1 = new PublishChannel('channel-1')
const subscirbe1_2 = new PublishChannel('channel-1')
const publisher2_1 = new PublishChannel('channel-2')
const publisher2_2 = new PublishChannel('channel-2')
const subscirbe2 = new PublishChannel('channel-2')

// 开始通信1
subscirbe1_1.foo = '用于鉴定接收作用域正确'
subscirbe1_1.onmessage(function (evt) {
  console.log('作用域是否正确:', this.foo !== undefined)
  console.log('订阅者1_1收到啦', evt)
})
subscirbe1_1.onmessage(function (evt) {
  console.log('订阅者1_2收到啦', evt)
})
publisher1.onmessage(function (evt) {
  console.log('发布者1不应该收到自己发出的', evt)
})
publisher1.postMessage('hello')

// 开始通信2
subscirbe2.onmessage(function (evt) {
  console.log('订阅者2第一次收到啦', evt)
})
subscirbe2.onmessage(function (evt) {
  console.log('订阅者2第二次收到啦', evt)
})
publisher2_1.postMessage('hello1')
publisher2_1.postMessage('hello2')