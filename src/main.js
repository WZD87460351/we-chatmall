// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter) //注册VueRouter script src="../vue-router.js";

import VueResource from 'vue-resource'  //获取（获取数据插件）并使用
Vue.use(VueResource)

import VueAwesomeSwiper from 'vue-awesome-swiper'//引用了轮播插件
Vue.use(VueAwesomeSwiper)

//组件
import seller from './components/seller/seller.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'

Vue.config.productionTip = false

//定义组件的路由
const routes = [
	{path: '/', redirect: '/goods'},  //进入首页默认显示的内容
	{path: '/goods',component: goods},
	{path: '/ratings',component: ratings},
	{path: '/seller',component: seller}
]

//注册组件 实例
const router = new VueRouter({
	routes,         //相当于routes:routes
	linkActiveClass: 'active'   //a标签点击后变颜色和css的active呼应
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');    //挂载组件
