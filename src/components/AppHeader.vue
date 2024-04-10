<template>
  <div class="AppHeader">

    <h1 style="width: 160px;text-align: center">长远工作室</h1>

    <div class="AppHeader-right">
      <!-- 切换主题-->
      <el-switch
          v-model="switchBtn"
          :active-action-icon="Sunny"
          :inactive-action-icon="Moon"
          :before-change="switchTopic"
          style="--el-switch-on-color: #84c1ff;"
      />
      <!-- 用户登录-->
      <el-avatar style="cursor: pointer" :icon="UserFilled" @click="login"></el-avatar>
    </div>


  </div>
</template>

<script setup>
import {Sunny, Moon, UserFilled} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {ref} from "vue";

/*切换主题*/
const switchBtn = ref(false)
const switchTopic = () => {
  if (!switchBtn.value) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
  return true
}

const login = () => {
  ElMessage({
    message: '还未登录',
    type: 'warning',
  })

}

</script>

<style scoped>
* {
  padding: 0 !important;
  margin: 0 !important;
}

.AppHeader {
  padding: 10px;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--el-border-color);
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.AppHeader-right {
  width: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>

