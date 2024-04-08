<template>
  <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo MenuSidebar"
  >
    <!--    <el-menu-item>-->
    <!--      <el-icon>-->
    <!--        <HomeFilled/>-->
    <!--      </el-icon>-->
    <!--      <span>数据分析</span>-->
    <!--    </el-menu-item>-->

    <el-menu-item index="/IndexDataNumber">
      <el-icon>
        <Menu/>
      </el-icon>
      <span>首页管理</span>
    </el-menu-item>

<!--    <el-sub-menu>-->
<!--      <template #title>-->
<!--        <el-icon>-->
<!--          <Menu/>-->
<!--        </el-icon>-->
<!--        <span>首页管理</span>-->
<!--      </template>-->
<!--      <el-menu-item index="/IndexDataNumber">岗位信息</el-menu-item>-->
<!--      <el-menu-item index="/SeIndexDataNumber">设置岗位信息</el-menu-item>-->
<!--    </el-sub-menu>-->

    <el-sub-menu>
      <template #title>
        <el-icon>
          <Watermelon/>
        </el-icon>
        <span>长远创造</span>
      </template>
      <el-menu-item index="/LongTermCreationProductsList">产品信息</el-menu-item>
      <el-menu-item>页面2</el-menu-item>
    </el-sub-menu>

    <!--    <el-menu-item>-->
    <!--      <el-icon>-->
    <!--        <Sugar/>-->
    <!--      </el-icon>-->
    <!--      <span>长远少年</span>-->
    <!--    </el-menu-item>-->

    <!--    <el-menu-item>-->
    <!--      <el-icon>-->
    <!--        <Apple/>-->
    <!--      </el-icon>-->
    <!--      <span>长远导师</span>-->
    <!--    </el-menu-item>-->

    <!--    <el-menu-item>-->
    <!--      <el-icon>-->
    <!--        <CoffeeCup/>-->
    <!--      </el-icon>-->
    <!--      <span>关于我们</span>-->
    <!--    </el-menu-item>-->

    <!--    @click="Update"-->
    <el-menu-item index="/main-update">
      <el-icon>
        <UploadFilled/>
      </el-icon>
      <span>上传素材</span>
    </el-menu-item>
  </el-menu>

</template>

<script setup>
import {
  HomeFilled,
  Menu,
  Watermelon,
  Sugar,
  Apple,
  CoffeeCup,
  UploadFilled,
} from '@element-plus/icons-vue'

// import {useRouter} from "vue-router";
// const router = useRouter()
// const Update = () => {
//   console.log("跳转上传素材 页")
//   router.push('/main-update')
// }


</script>
<style scoped>
.MenuSidebar {
  height: 100%;
  user-select: none;
}
</style>
