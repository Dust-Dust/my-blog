// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'
// import css from 'src\css\App.css'

Vue.config.productionTip = false

// 导入resource
Vue.use(VueResource)
Vue.use(VueRouter)

// 自定义指令
Vue.directive('rainbow',{
  bind(el,binding,vnode){ //element,binding,虚拟节点
    el.style.color = "#" + Math.random().toString(16).slice(2,8) 
    //随机颜色
  }
})

Vue.directive('theme',{
  bind(el,binding,vnode){
    if(binding.value == 'wide'){
      el.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow'){
      el.style.maxWidth = "560px"
    }

    if(binding.arg == 'column'){
      el.style.background = "#6677cc"
      el.style.padding = "20px"
    }
  }
})

//自定义过滤器
Vue.filter("to-uppercase",function(value){
  return value.toUpperCase();
  // 转换为大写
})

Vue.filter("snippet",function(value){
  return value.slice(0,100) + "...";
  // 只显示前100个字符，并在尾部加上...
})

// 创建路由
const router = new VueRouter({
  routes: Routes,
  mode:"history"  
  // 去除地址的 #/
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
// 注册路由
  router:router
})
