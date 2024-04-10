// 路由

import {
    createRouter, createWebHashHistory,
} from 'vue-router'

//上传素材
import MainUpdate from "@/pages/MainUpdate.vue";

//查看岗位信息
import IndexDataNumber from "@/pages/index/IndexDataNumber.vue"

//产品模块
import ProductControl from "@/pages/product/ProductControl.vue"

//文章列表
import ArticleLibrary from "@/pages/article/ArticleLibrary.vue"
//成员列表
import TeamMember from "@/pages/TeamMember/TeamMember.vue"

const routes = [{
    path: "/main-update", name: "MainUpdate", component: MainUpdate,
}, {
    path: "/IndexDataNumber", name: "IndexDataNumber", component: IndexDataNumber,
}, {
    path: "/ProductControl", name: "ProductControl", component: ProductControl,
}, {
    path: "/ArticleLibrary", name: "ArticleLibrary", component: ArticleLibrary,
}, {
    path: "/TeamMember", name: "TeamMember", component: TeamMember,
}

]
// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(), routes
})
export default router;