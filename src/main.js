/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import moment from 'moment'
import ElementUI from 'element-ui';

import axios from "axios"
axios.defaults.baseURL = "http://47.106.148.205:8899/"

//模仿vue-rresource
Vue.prototype.$axios = axios;

//使用基于vue的中间件
Vue.use(VueRouter)  //Vue.prototype.$route Vue.prototype.$router
Vue.use(Vuex)
Vue.use(ElementUI); //把我们ElementUI都进行注册 & 并且在Vue的原型上还绑定了$message..

//定义全局过滤器
Vue.filter("dateFmt",(input,formatStr="YYYY-MM-DD")=>{
    
    return moment(input).format(formatStr);
})

//导入App.vue
import App from './App.vue'

//导入全局需要用到的样式
import 'element-ui/lib/theme-chalk/index.css';
import "./statics/site/css/style.css"

//路由相关
//导入定义好的组件
import goodslist from "./components/goods/goodslist.vue"
import goodsinfo from "./components/goods/goodsinfo.vue"
import shopcart from "./components/shopcart/shopcart.vue"
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart}
    ]
})

import {
    addLocalGoods,
    getTotalLocalCount
} from './common/localStorageHelper'
const store = new Vuex.Store({
    state:{
        buyCount:0
    },
    getters: {
        getTotalGoodsCount(state){
            if(state.buyCount > 0){
                return state.buyCount
            }else{
                return getTotalLocalCount()
            }
            
        }
    },
    mutations: {
        addGoods(state,goods){
            // console.log("main vuex",goods)
            // state.buyCount += goods.count

            state.buyCount = addLocalGoods(goods)
        }
    }
})

new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store
})