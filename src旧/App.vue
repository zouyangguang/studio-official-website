<template>
  <div class="App">

    <el-container hidden="hidden" style="height: 100%">
      <el-header style="padding: 0">
        <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <el-aside class="App-aside" width="160px">
          <MenuSidebar/>
        </el-aside>
        <el-main style="padding:0;">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>
import MenuSidebar from './components/MenuSidebar.vue'
import AppHeader from "./components/AppHeader.vue"

</script>
<style>
/*标题*/
.headline {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 15px;
  font-weight: bold;
}

.headline > p {
  width: 10px;
  height: 40px;
  margin-right: 5px;
}
.el-table {
  margin-top: 15px;
}

</style>


