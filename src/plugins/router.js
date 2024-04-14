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


const routes = [{
    path: "/", redirect: "ContentManagement",
}, {
    path: "/UserLogin", name: "UserLogin", component: UserLogin,
}, {
    path: "/ContentManagement", name: "ContentManagement", component: ContentManagement,
    redirect: "/IndexDataNumber",
    children: [
        {path: "/IndexDataNumber", name: "IndexDataNumber", component: IndexDataNumber},
        {path: "/ProductControl", name: "ProductControl", component: ProductControl},
        {path: "/ArticleLibrary", name: "ArticleLibrary", component: ArticleLibrary},
        {path: "/TeamMember", name: "TeamMember", component: TeamMember}
    ]
}
]
// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(), routes
})
export default router;