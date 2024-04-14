<template>
  <div class="App" >
    <el-scrollbar style="padding: 0px">
      <router-view v-slot="{ Component }" style="padding: 0px">
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<script setup>


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

.ContentManagement {
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


