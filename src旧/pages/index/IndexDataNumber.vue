<template>
  <div class="IndexData">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #84c1ff"></p> 岗位信息</div>
      <div>
        <el-button style="float: right" type="primary" plain>确认</el-button>
      </div>
    </div>
    <!--操作-->
    <div class="setIndexDataNumber">
      <form>
        <div>
          <span>操作类型</span>
          <el-select v-model="operation" placeholder="请选择操作类型" size="large" style="width: 100px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <div>
          <span>岗位id</span>
          <el-input placeholder="岗位id"/>
        </div>
        <div>
          <span>岗位名称</span>
          <el-input placeholder="岗位名称"/>
        </div>
        <div>
          <span>岗位描述集合</span>
          <el-input placeholder="岗位描述集合"/>
        </div>
        <div>
          <span>岗位主图路径</span>
          <el-input placeholder="岗位主图路径"/>
        </div>
        <div>
          <span>岗位介绍</span>
          <el-input placeholder="岗位介绍" style="width: 90%" autosize type="textarea"/>
        </div>
      </form>
    </div>
    <div class="IndexDataTab">
      <el-table border :data="tableData" style="width: 100%;" show-overflow-tooltip>
        <el-table-column prop="positionId" label="ID"/>
        <el-table-column prop="positionName" label="岗位名称"/>
        <el-table-column prop="positionIntroduce" label="岗位介绍"/>
        <el-table-column prop="positionImgUrl" label="岗位主图路径"/>
        <el-table-column prop="positionDescriptionList" label="岗位描述"/>
        <el-table-column label="编辑" fixed="right" width="100">
          <template #default>
            <el-button link type="danger" size="small">
              删除
            </el-button>
            <el-button link type="primary" size="small">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="currentChange"
                     background layout="prev, pager, next"
                     :default-page-size="5"
                     :total="total"
                     style="margin-top:10px;justify-content:center"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from 'axios';
// 存放操作的类型
const options = [
  {
    value: '设置',
    label: '设置',
  },
  {
    value: '新建',
    label: '新建',
  },
  {
    value: '搜索',
    label: '搜索',
  },
]
//选择的操作类型
const operation = ref(options[0])
const tableData = ref([{
  "positionId": 1,
  "positionName": "后端工程师",
  "positionIntroduce": "负责工作室团队项目后端开发 工作，包含数据库设计与接口设计、开发以及测试",
  "positionDescriptionList": ["java", "Node.js", "Python"],
  "positionImgUrl": "img/a首页5n1.png",
}, {
  "positionId": 1,
  "positionName": "后端工程师",
  "positionIntroduce": "负责工作室团队项目后端开发 工作，包含数据库设计与接口设计、开发以及测试",
  "positionDescriptionList": ["java", "Node.js", "Python"],
  "positionImgUrl": "img/a首页5n1.png",
}, {
  "positionId": 1,
  "positionName": "后端工程师",
  "positionIntroduce": "负责工作室团队项目后端开发 工作，包含数据库设计与接口设计、开发以及测试",
  "positionDescriptionList": ["java", "Node.js", "Python"],
  "positionImgUrl": "img/a首页5n1.png",
}, {
  "positionId": 1,
  "positionName": "后端工程师",
  "positionIntroduce": "负责工作室团队项目后端开发 工作，包含数据库设计与接口设计、开发以及测试",
  "positionDescriptionList": ["java", "Node.js", "Python"],
  "positionImgUrl": "img/a首页5n1.png",
}, {
  "positionId": 1,
  "positionName": "后端工程师",
  "positionIntroduce": "负责工作室团队项目后端开发 工作，包含数据库设计与接口设计、开发以及测试",
  "positionDescriptionList": ["java", "Node.js", "Python"],
  "positionImgUrl": "img/a首页5n1.png",
}])

//总数据量
const total = ref(5)

axios.get("/changyuan/admin/query/position/list", {data: {pageNum: 1, pageSize: 5}}).then((response) => {
  tableData.value = response.data.list
  console.log(response.data)
  total.value = response.data.total
}).catch((err) => {
  console.log("2", err)
})

const currentChange = (number) => {
  console.log(number)
}
</script>

<style scoped>
.IndexData {
  padding: 10px;
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

.setIndexDataNumber form > div span {
  display: block;
  min-width: 120px;
}

.setIndexDataNumber form > div .el-input {
  width: 90%;
}
</style>