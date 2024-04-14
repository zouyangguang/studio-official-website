<template>
  <div class="ContentManagement">
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
import MenuSidebar from '@/components/MenuSidebar.vue'
import AppHeader from "@/components/AppHeader.vue"
</script>



