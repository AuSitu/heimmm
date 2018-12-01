import Vue from 'vue'
import App from './App.vue'

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

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
    cartData: JSON.parse(window.localStorage.getItem('ShoppingCartData')) || {
      // 90: 12,
    },
    // 存储是否登录
    isLogin: false
  },
  mutations: {
    addTOCart(state, obj) {
      // console.log('触发了');
      // console.log(state);
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
        Vue.set(state.cartData, obj.goodId, obj.goodNum)
      }
      // console.log(state);
    },
    // 购物车数据改变右上角变化
    updateCarData(state, obj) {
      // console.log(obj);
      state.cartData = obj
    },
    // 删除某一条数据的方法
    delGoodsById(state, id) {
      // 必须使用Vue.delete才可以同步更新视图
      // console.log(id);

      Vue.delete(state.cartData, id)
    },
    //判断是否登录
    changeLog(state, islog) {
      state.isLogin = islog
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
window.onbeforeunload = function () {
  window.localStorage.setItem('ShoppingCartData', JSON.stringify(store.state.cartData))
}


//导入 axios
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;

//绑定全局的axios地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 设置带上cookie
axios.defaults.withCredentials = true; //让ajax携带cookie


// 下载 VueRouter 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import './assets/site/css/style.css'

import index from './components/index.vue'
import detail from './components/02detail.vue'
import shopcar from './components/03shopcar.vue'
import order from './components/04order.vue'
import login from './components/05login.vue'
import pay from './components/06pay.vue'
import paysuccess from './components/07paysuccess.vue'
import vipCenter from './components/08vipCenter.vue'
import personalCenter from './components/09personalCenter.vue'
import tradeCenter from './components/10tradeCenter.2.vue'
import tradeDetails from './components/11tradeDetails.vue'


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
  path: '/shopcar',
  component: shopcar,
}, {
  path: '/order/:ids',
  name: 'order',
  component: order,
  // 运用路由员信息
  meta: {
    checkLogin: true
  }
}, {
  path: '/login',
  component: login
}, {
  path: '/pay/:orderid',
  name: 'pay',
  component: pay,
  // 运用路由员信息
  meta: {
    checkLogin: true
  }
}, {
  path: '/paysuccess',
  name: 'paysuccess',
  component: paysuccess,
  // 运用路由员信息
  meta: {
    checkLogin: true
  }
}, {
  path: '/vipCenter',
  name: 'vipCenter',
  component: vipCenter,
  // 运用路由员信息
  meta: {
    checkLogin: true,
    currentName:'中心首页'
  },
  children: [{
    path: '',
    redirect: 'personalCenter',
    
  }, {
    path: 'personalCenter',
    // name: 'personalCenter',
    component: personalCenter,
    // 运用路由员信息
    meta: {
      checkLogin: true,
      currentName:'中心首页'
    }
  }, {
    path: 'tradeCenter',
    name: 'tradeCenter',
    component: tradeCenter,
    // 运用路由员信息
    meta: {
      checkLogin: true,
      currentName:'交易列表'
    }
  }, {
    path: 'tradeDetails/:orderid',
    name: 'tradeDetails',
    component: tradeDetails,
    // 运用路由员信息
    meta: {
      checkLogin: true,
      currentName:'交易详情'
    }
  }, ]
}, ]


// 实例化VueRouter
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return 期望滚动到哪个的位置
    return {
      x: 0,
      y: 0
    }
  },
  // 使用h5的history模式 让url更加美观
  mode: 'history',
});
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // window.scrollTo(0, 0);

  if (to.meta.checkLogin == true) {

    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == 'nologin') {
        Vue.prototype.$Message.warning("请先登录");

        router.push('/login')
      } else {
        next()
      }
    })

  } else {
    next()

  }

})
// // 路由跳转完毕触发
// 这种方法 是使用导航守卫的 回调函数实现 
// router.afterEach((to, from) => {
//   // console.log(to);
//   // console.log(from);
//   // 页面滚到顶部即可
//   window.scrollTo(0, 0);

// })
// 导入 moment.js
import moment from "moment";
//全局过滤器
Vue.filter('shortTime', (value) => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");

})



new Vue({
  render: h => h(App),
  router,
  store,
  created() {


    //判断一次是否登录
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == 'nologin') {
        // Vue.prototype.$Message.warning("请先登录");

        // router.push('/login')
      } else {
        store.state.isLogin = true
      }
    })
  },
  // watch: {
  //   "$route.path"(newVal, oldVal) {
  //     console.log(newVal+'---'+oldVal);

  //   }
  // },
}).$mount('#app')