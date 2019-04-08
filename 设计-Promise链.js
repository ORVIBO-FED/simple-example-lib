/*----------------------------------------------------------------------------------
* about:Promise链生成。形态与 axios 一致。
* date:2018-12-25
* ----------------------------------------------------------------------------------*/

function Fetch( config ) {
  console.log("开始发送，配置：", config);
  return new Promise(( resolve, reject ) => {
    if ( config ) {
      resolve("请求发送成功")
    } else {
      reject("请求发送失败");
    }
  });
}

// 模拟普通请求
function fetch( str ) {
  return new Fetch(str);
}

// axios请求链
const intercepter = {
  request: {
    success( config ) {
      config && console.log("请求拦截，配置：", config);
      if ( config.trigErr === "requestIntercepter" ) {
        console.log("请求拦截报错");
        return Promise.reject(config);
      }
      return config; // 作为下一个 Promise 的参数
    },
    fail( config ) {
      console.log("请求拦截到错误");
      return Promise.reject(config);
    }
  },
  responce: {
    success( res ) {
      console.log("响应拦截，结果：", res);
      return res;
    },
    fail( err ) {
      console.log("响应拦截到错误");
      return Promise.reject(err);
    }
  }
};

function chainFetch( config ) {
  console.log("/*----------------------------------*/");
  config && console.log(config.name);
  let chain = Promise.resolve(config); // 参数传递
  // 增加拦截
  chain = chain
    .then(intercepter.request.success, intercepter.request.fail) // 请求拦截
    .then(fetch, undefined) // 请求
    .then(intercepter.responce.success, intercepter.responce.fail) // 响应拦截
  return chain;
}

/*chainFetch({ name: "请求链1：全部resolve" })
  .then(res => {
    console.log("请求链全部完成，结果：", res);
  })
  .catch(err => {
    console.log("请求链出现错误，错误：", err);
  });*/

chainFetch({ name: "请求链2：请求拦截中错误", trigErr: "requestIntercepter" })
  .then(res => {
    console.log("请求链全部完成，结果：", res);
  })
  .catch(err => {
    console.log("请求链出现错误，错误：", err);
  });
