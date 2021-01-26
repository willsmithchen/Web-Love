import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
//导入字体样式
import './assets/fonts/iconfont.css'
//导入全局样式
import ElementUI from 'element-ui'
// import './assets/css/global.css'
import axios from 'axios'
//axios 网络访问工具
//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8081/love/login-manager'
Vue.prototype.$axios = axios
Vue.prototype.$http = axios
Vue.prototype.$qs=qs
//设置响应请求头

Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
