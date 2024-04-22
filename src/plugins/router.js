// 路由

import {
    createRouter, createWebHashHistory,
} from 'vue-router'
//登录页
import UserLogin from "@/pages/UserLogin/UserLogin.vue"

// 内容页
import ContentManagement from "@/pages/ContentManagement/ContentManagement.vue";

//上传素材
//import MainUpdate from "@/pages/ContentManagement/MainUpdate.vue";

//查看岗位信息
import IndexDataNumber from "@/pages/ContentManagement/index/IndexDataNumber.vue"

//产品模块
import ProductControl from "@/pages/ContentManagement/product/ProductControl.vue"

//文章列表
import ArticleLibrary from "@/pages/ContentManagement/article/ArticleLibrary.vue"
//成员列表
import TeamMember from "@/pages/ContentManagement/TeamMember/TeamMember.vue"

//系统日志
import ChangyuanLog from "@/pages/ContentManagement/ChangyuanLog/ChangyuanLog.vue"
import MainUpdate from "@/pages/ContentManagement/MainUpdate.vue"
import {ElMessage} from "element-plus";
import axios from "axios";


const routes = [{
    path: "/UserLogin", name: "UserLogin", component: UserLogin,
}, {
    path: "/",
    name: "ContentManagement",
    component: ContentManagement,
    redirect: "/ChangyuanLog",
    meta: {requiresAuth: true},
    children: [
        {path: "IndexDataNumber", name: "IndexDataNumber", component: IndexDataNumber},
        {path: "ProductControl", name: "ProductControl", component: ProductControl},
        {path: "ArticleLibrary", name: "ArticleLibrary", component: ArticleLibrary},
        {path: "TeamMember", name: "TeamMember", component: TeamMember},
        {path: "ChangyuanLog", name: "ChangyuanLog", component: ChangyuanLog},
        {path: "MainUpdate", name: "MainUpdate", component: MainUpdate},
    ]
}]


// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(), routes
})

//全局前置守卫
//验证是否登录成功
router.beforeEach((to, from, next) => {
    //判断是否需要身份验证检查
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //需要身份验证检查
        //从缓存获取login
        const login = JSON.parse(localStorage.getItem("login"))
        if (login === null) {
            //login为空则没有登录
            ElMessage({message: '请登录', type: 'warning',})
            //跳转到登录页
            next("/UserLogin")
        } else {
            //登录过
            //设置私有请求的headers
            axios.defaults.headers.common.Authorization = "Bearer " + login.token
            //查询数据判断是否成功
            axios.get("/changyuan/admin/query/position/list").catch((err) => {
                //验证不通过
                ElMessage({message: '请登录', type: 'warning',})
                console.log(err.response)
                //移除请求的headers
                axios.defaults.headers.common.Authorization = null
                ////跳转到登录页
                next("/UserLogin")
            }).then(() => {
                //判断是否为管理员 是否进入用户管理页
                if (to.path === "/TeamMember" && login.roleName !== 'admin') {
                    ElMessage({message: '抱歉，您无权限查看', type: 'warning',})
                    next("IndexDataNumber")
                } else {
                    next()
                }
            })

        }
    } else {
        //正常跳转
        next()
    }

})
export default router;