/* ---------------------------------------------------------------------------------------
* about:路由入口文件
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-11-01
* ---------------------------------------------------------------------------------------- */
/* weex initialized here, please do not move this line */
const { router } = require('./router');
const App = require('@/index.vue');
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/home');

