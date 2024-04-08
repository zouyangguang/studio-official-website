<template>
  <Teleport to="body">
    <transition name="el-fade-in-linear">
      <div v-if="videoDatabase" class="VideoDatabase">
        <div>

          <div class="card">
            <h2><span>请选择视频 :</span>
              <el-icon @click="Hidden">
                <CircleCloseFilled style="cursor: pointer" color="#fd6565"/>
              </el-icon>
            </h2>
            <ul class="VideoArray">
              <li v-for="i in 10" :key="i">
                <video :src="video"></video>
              </li>
            </ul>
            <div class="option">
              <el-button type="danger" plain @click="Hidden">取消</el-button>
              <el-button type="primary" plain>确定</el-button>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
import {CircleCloseFilled} from '@element-plus/icons-vue'

const video = require("@/assets/img/官网视频M.mp4")

defineProps({
  videoDatabase: Boolean
})
const emit = defineEmits(["hidden"])

const Hidden = () => {
  emit('hidden')
}
</script>

<style scoped>
.VideoDatabase {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.VideoDatabase > div {
  min-width: 500px;
  width: 60%;
  aspect-ratio: 100/60;
}

.card {
  width: 100%;
  height: 100%;
  background-color: var(--el-bg-color-overlay);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow);
  display: flex;
  flex-direction: column;
}

.card > h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--el-border);
  padding: 10px;
}

.card > .VideoArray {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: auto;
  list-style: none;
  border-bottom: var(--el-border);
}

.card > .VideoArray li {
  width: 47%;
  aspect-ratio: 2/1;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--el-border);
  cursor: pointer;
  box-shadow: var(--el-box-shadow);
  border-radius: var(--el-border-radius-base);
  transition: 0.1s;
  padding: 5px 0;
}
.card > .VideoArray li:hover{
  box-shadow:0 0 5px 1px #cacaca;
}

.card > .VideoArray li > video {
  height: 100%;
}

.option {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 50px;
  padding-right: 25px;
}
</style>