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
          style="--el-switch-on-color: #84c1ff;"/>
      <div>
        当前用户 {{ globalState.memberName }}
      </div>
      <!-- 用户登录-->
      <el-tooltip content="退出登录">
          <span @click="login" style="height: 50px;display: flex; align-items: center">
            <el-icon size="25" style="cursor: pointer">
            <SwitchButton/>
          </el-icon>
          </span>
      </el-tooltip>

      <!--      <el-avatar style="cursor: pointer" :icon="SwitchButton" @click="login"></el-avatar>-->
    </div>


  </div>
</template>

<script setup>
import {Sunny, Moon, SwitchButton} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {inject, ref} from "vue";
import router from "@/plugins/router";

const globalState = inject("globalState")
console.log(globalState.memberName)
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
  //清除缓存
  localStorage.removeItem("login")
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
  router.push("/UserLogin")
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
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>

