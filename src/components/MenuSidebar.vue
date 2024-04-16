<template>
  <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo MenuSidebar"
  >

    <el-menu-item index="/IndexDataNumber">
      <el-icon>
        <Menu/>
      </el-icon>
      <span>岗位模块</span>
    </el-menu-item>


    <el-menu-item index="/ProductControl">
      <el-icon>
        <Watermelon/>
      </el-icon>
      <span>产品模块</span>
    </el-menu-item>


    <el-menu-item index="/ArticleLibrary">
      <el-icon>
        <Sugar/>
      </el-icon>
      <span>文章模块</span>
    </el-menu-item>

    <el-menu-item index="/TeamMember" v-if="globalState.login.roleName==='admin'">
      <el-icon>
        <Apple/>
      </el-icon>
      <span>成员模块</span>
    </el-menu-item>

  </el-menu>

</template>

<script setup>
import {
  Menu,
  Watermelon,
  Sugar,
  Apple,
} from '@element-plus/icons-vue'
import {inject} from "vue";

const globalState = inject("globalState")


</script>
<style scoped>
.MenuSidebar {
  height: 100%;
  user-select: none;
}
</style>
