<template>
  <div class="AddPage">
    <div class="modeling">
      <div  class="modeling-content" :class=" !isPC && 'isMove'">
        <index-modeling1 v-if="'1-1'===modelingTitle" :isPC="isPC" />
        <IndexModeling2 v-if="'1-2'===modelingTitle" :isPC="isPC"></IndexModeling2>
      </div>
    </div>
    <div class="template" v-show="true">
      <h1>模板<span>切换<el-switch v-model="isPC"/></span></h1>
      <ul class="effectPicture">
        <li v-for="(item) in ModelingArray" :key="item.title" @click="SetModelingTitle(item.title)">
          <img alt="" :title="item.title" :src="item.src">
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import IndexModeling1 from "@/components/index/modeling/IndexModeling1.vue";
import IndexModeling2 from "@/components/index/modeling/IndexModeling2.vue";
import {ElMessage} from 'element-plus'
import {ref} from "vue";
//当前选中的模板
const modelingTitle = ref("1-1")
//存放模板图片路径
const ModelingArray = [
  {title: "1-1", 'src': require("@/assets/img/Modeling1-1.png")},
  {title: "1-2", 'src': require("@/assets/img/Modeling1-2.png")}
]
// 切换模板
const SetModelingTitle = (title) => {
  if (modelingTitle.value === title) {
    ElMessage({
      message: '已为当前模板',
      type: 'warning',
    })
  } else {
    modelingTitle.value = title
    ElMessage({
      message: '切换模板成功',
      type: 'success',
    })
  }
}
//存放选项是否为Pc端
const isPC = ref(true)



</script>

<style scoped>
.AddPage {
  min-height: 600px;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.template {
  min-width: 300px;
  max-width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: var(--el-border);
}

.template > h1 {
  display: flex;
  height: 30px;
  justify-content: space-around;
  border-bottom: var(--el-border);
}

.effectPicture {
  padding: 20px 5px;
  height: 88.8vh;
  overflow: auto;
}

.effectPicture > li {
  aspect-ratio: 16/10;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: var(--el-border);
  margin: 5px 0;
}

.effectPicture > li:hover {
  border: 1px solid #ff6060;
  cursor: pointer;
}

.effectPicture > li img {
  width: 100%;
  height: auto;
}

.modeling {
  min-width: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.modeling > .modeling-content {
  width: 100%;
  max-height: 90%;
  aspect-ratio: 16/10;
  transition: 0.5s;
  overflow: hidden;
}

.modeling > .isMove {
  width: auto;
  height: 90%;
  aspect-ratio: 9/19;
}
</style>

