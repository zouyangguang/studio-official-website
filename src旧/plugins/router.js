// 路由

import {
    createRouter, createWebHashHistory,
} from 'vue-router'

//上传素材
import MainUpdate from "@/pages/MainUpdate.vue";
//添加页面
import AddPage from "@/pages/AddPage.vue";
//查看岗位信息
import IndexDataNumber from "@/pages/index/IndexDataNumber.vue"

import LongTermCreationProductsList from "@/pages/LongTermCreation/LongTermCreationProductsList.vue";

const routes = [{
    path: "/main-update", name: "MainUpdate", component: MainUpdate,
}, {
    path: "/add-page", name: "AddPage", component: AddPage,
}, {
    path: "/IndexDataNumber", name: "IndexDataNumber", component: IndexDataNumber,
}, {
    path: "/LongTermCreationProductsList",
    name: "LongTermCreationProductsList",
    component: LongTermCreationProductsList,
}

]
// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(), routes
})
export default router;