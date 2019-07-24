/*----------------------------------------------------------------------------------
* about:设计模式：装饰者模式
* author:马兆铿
* date:2019-5-31
* ----------------------------------------------------------------------------------*/

// localStorage 仿真
const localStorage = {
  save: {},
  setItem: function (key, value) {
    this.save[key] = value
  },
  getItem: function (key) {
    return this.save[key] || undefined
  },
  test: function () {
    this.setItem('test', 'success')
    const res = this.getItem('test')
    console.log('localStorage test: ', res)
  }
}

localStorage.test()

// storejs 仿真
const store = {
  key: 'store',
  desc: '浏览器本地储库仿真',
  set: function (key, value) {
    localStorage.setItem(key, value)
  },
  get: function (key) {
    return localStorage.getItem(key)
  },
  addPlugin: function (plugin) {
    // 省略功能：插件递归、查重、合法性判断 都省略，只考虑增加插件
    const pluginProperties = plugin.call(this)
    console.log('要添加的插件', Object.getOwnPropertyNames(pluginProperties))
    for (let key in pluginProperties) {
      this[key] = this._assignPluginFnProp(pluginProperties[key], key)
    }
  },
  _assignPluginFnProp: function (pluginFnProp, propName) {
    console.log(`添加${propName}插件`)
    const oldFn = this[propName]
    const self = this
    return function pluginFu() {
      const args = Array.prototype.slice.call(arguments, 0) // copy
      console.log('插件参数', args)
      // super_fn calls the old function which was overwritten by
      // this mixin.
      function super_fn() {
        if (!oldFn) {
          return
        }
        // 集成第一层的参数
        for (let key in arguments) {
          args[key] = arguments[key]
        }
        console.log('插件参数_下一层', args)
        return oldFn.apply(self, args)
      }

      // 回调的形式返回旧函数: [回调函数,参数1,参数2...]
      var newFnArgs = [super_fn].concat(args)

      return pluginFnProp.apply(self, newFnArgs)
    }
  }
}

// 插件添加
const userBehavePlugin = function () {
  const userName = this.get('user') // 证明this是属于对象的
  return {
    // 新功能：直接添加
    remove: function () {
      return `remove方法，输出参数：${userName}`
    },
    /**
     * 同名功能：不覆盖，同时调用
     * @param super_fn 旧的方法
     * @param key 参数
     * @returns {string}
     */
    get: function (super_fn, key) {
      const val = super_fn(key, 'newParam') // 旧函数获取存取值
      return `从存储中获得值是：【${val}】`
    }
  }
}

// 测试开始
store.set('user', 'Charlie')
store.addPlugin(userBehavePlugin)
const storeInfo = store.get('user')

console.log(`plugin方式调用get：${storeInfo}`)


