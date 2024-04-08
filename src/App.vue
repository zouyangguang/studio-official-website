<template>
  <div class="App">
    <el-container style="height: 100%;">
      <el-header style="padding: 0">
        <AppHeader></AppHeader>
      </el-header>

      <el-container style="height:90%;">

        <el-aside class="App-aside" width="160px">
          <MenuSidebar/>
        </el-aside>
        <el-main style="padding:0px; height: 100%">
          <el-scrollbar>
            <router-view v-slot="{ Component }" style="padding: 10px">
              <transition name="el-fade-in-linear" mode="out-in">
                <keep-alive>
                  <component :is="Component"/>
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar>
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
  /*padding: 0 15px;*/
  font-weight: bold;
}

.App {
  height: 100vh;
}

body {
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.headline > p {
  width: 10px;
  height: 40px;
  margin-right: 5px;
}

.el-table {
  margin-top: 15px;
}


.setIndexDataNumber {
  padding: 10px;
}

.setIndexDataNumber form {
  display: flex;
  flex-wrap: wrap;
}


.setIndexDataNumber form > div {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
}

.setIndexDataNumber form > div > span {
  display: block;
  min-width: 120px;
}

.setIndexDataNumber form > div > .el-input {
  width: 90%;
}

</style>


