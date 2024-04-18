import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from "@/plugins/router";
import 'swiper/css';
import "@/plugins/ErrorLoop"
import {ref} from "vue";
import axios from 'axios';
axios.defaults.baseURL="http://43.139.254.175:8080"
//公共属性
const globalState = ref({
    login:JSON.parse(localStorage.getItem("login")),
    memberName:localStorage.getItem("memberName"),
    IPAddress: "http://43.139.254.175:8080"//访问接口地址
})
const app = createApp(App)
app.provide("globalState", globalState)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')


