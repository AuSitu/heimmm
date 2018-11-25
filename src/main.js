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

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 购物车ID → 数量
    //读取本地存储的数据
    cartData: JSON.parse(window.localStorage.getItem('ShoppingCartData'))||{
      90: 12,
    }
  },
  mutations: {
    addTOCart(state, obj) {
      // console.log('触发了');
      console.log(state);
      // console.log(obj);
      // console.log( state.cartData[obj.goodId]  );
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum

        // 上面代码的 扩写
        //  let oldNum = state.cartData[obj.goodId];
        //  oldNum+=obj.goodNum;
        //  state.cartData[obj.goodId]=oldNum;
      } else {
        // 商品不存在
        // 动态增加键值对  这种方法不行
        // state.cartData[obj.goodId] = obj.goodNum;
        // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
        // 它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 
        // 使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set( state.cartData, obj.goodId, obj.goodNum )
      }
      // console.log(state);
    }
  },
  getters: {
    totalCount(state) {
      let num = 0;
      for (const key in state.cartData) {
        num += state.cartData[key]
      }
      return num
    }
  }
});
//浏览器关闭保存数据
window.onbeforeunload = function(){
  window.localStorage.setItem('ShoppingCartData',JSON.stringify(store.state.cartData))
}


//导入 axios
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;

//绑定全局的axios地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';


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
}, {
  path: '/shopcar/:needId',
  component: shopcar
}]


// 实例化VueRouter
let router = new VueRouter({
  routes
})

// 导入 moment.js
import moment from "moment";
//全局过滤器
Vue.filter('shortTime', (value) => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");

})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')