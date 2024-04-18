<template>
  <div class="ChangyuanLog">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #f17224"></p> 系统日志</div>
    </div>

    <div class="IndexDataTab">
      <el-table border :data="dataList" style="width: 100%;height: 80vh" show-overflow-tooltip>
        <el-table-column prop="logId" label="编号" width="100"/>
        <el-table-column prop="memberName" label="姓名"/>
        <el-table-column prop="operationdate" label="时间"/>
        <el-table-column prop="type" label="内容"/>
      </el-table>
    </div>

  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";

const dataList = ref([])
//查询所有日志
const GetList = () => {
  // 网络请求数据
  axios.get("/changyuan/log").then((response) => {
    dataList.value = response.data.list
  }).catch((err) => {
    console.log(err)
  })
}
GetList()
</script>

<style scoped>

</style>