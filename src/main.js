import Vue from 'vue'
import App from './App.vue'

// 引入ElementUI 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入 axios
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;


// 下载 VueRouter 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import './assets/site/css/style.css'

import index from './components/index.vue'
import detail from './components/02detail.vue'
import shopcar from './components/03shopcar.vue'


Vue.config.productionTip = false

// 实例化路由规则
let routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  component: index
}, {
  //path: '/detail', // 使用动态路由匹配 传递参数 通过 ?artID=`+it1.artID
   path: '/detail/:artID', // 使用动态路由匹配 传递参数 通过 /`+it1.artID
  component: detail
},{
  path:'/shopcar/:needId',
  component:shopcar
}]


// 实例化VueRouter
let router = new VueRouter({
  routes
})

// 导入 moment.js
import moment from "moment";
//全局过滤器
Vue.filter('shortTime',value=>{
  return moment(value).format("YYYY-MM-DD HH:mm:ss ");

})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')