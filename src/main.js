
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入vue-resource
import VueResource from 'vue-resource'
// 注册vue-resource
Vue.use(VueResource)

// 导入mint-ui组件框架 按需导入要配置插件
import { Header,Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// 导入mui 
import "./lib/mui/css/mui.css"
// 导入扩展字体的css
import './lib/mui/css/icons-extra.css'

// 全局配置配置根路径
Vue.http.options.root="http://www.lovegf.cn:8899/"

// 全局配置传统表单数据
Vue.http.options.emulateJSON=true

// 引入 moment 包定义一个全局时间过滤器dateFormat
import moment from "moment";
Vue.filter("dateFormat",(content,parten="YYYY-MM-DD HH:mm:ss")=>{
    return moment(content).format(parten);
})

// 定义一个评论全局组件
import comment from "./components/common/comment"
// 参数一：全局组件名称 参数二：全局组件对象
Vue.component("comment",comment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
 render:a=>a(App)
})
