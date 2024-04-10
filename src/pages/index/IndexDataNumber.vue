<template>
  <div class="IndexData">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #e884ff"></p> 岗位信息</div>
      <div>
        <el-button style="float: right" type="primary" plain @click="confirm">确认</el-button>
      </div>
    </div>
    <!--操作-->
    <div class="setIndexDataNumber">
      <form>
        <div>
          <span>操作类型</span>
          <el-select v-model="operation" @change="typeChange" placeholder="请选择操作类型" size="large"
                     style="width: 100px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                       :disabled="item.disabled"/>
          </el-select>
        </div>
        <div>
          <span>ID</span>
          <el-input :disabled="formDataDisabled.positionId" placeholder="ID" v-model="formData.positionId"/>
        </div>
        <div>
          <span>名称</span>
          <el-input :disabled="formDataDisabled.positionName" placeholder="岗位名称" v-model="formData.positionName"/>
        </div>
        <div>
          <span>描述集合</span>
          <el-tooltip content="示例: java,Node.js,Python" placement="top">
            <el-input :disabled="formDataDisabled.positionDescriptionList"
                      placeholder="岗位描述数组(英文逗号分割)"
                      v-model="formData.positionDescription"/>
          </el-tooltip>
        </div>
        <div>
          <span>主图路径</span>
          <el-input :disabled="formDataDisabled.positionImgUrl" placeholder="岗位主图路径"
                    v-model="formData.positionImgUrl"/>
        </div>
        <div>
          <span>介绍</span>
          <el-input :disabled="formDataDisabled.positionIntroduce" placeholder="岗位介绍"
                    v-model="formData.positionIntroduce" style="width: 90%"
                    autosize
                    type="textarea"/>
        </div>
      </form>
    </div>
    <div class="IndexDataTab">
      <el-table border :data="elTableDate" style="width: 100%;height: 238px" show-overflow-tooltip>
        <el-table-column prop="positionId" label="ID"/>
        <el-table-column prop="positionName" label="名称"/>
        <el-table-column prop="positionIntroduce" label="介绍"/>
        <el-table-column prop="positionImgUrl" label="主图路径"/>
        <el-table-column prop="positionDescriptionList" label="描述集合"/>
        <el-table-column label="编辑" fixed="right" width="100">
          <template #default="scope">
            <el-popconfirm title="确认删除?" @confirm="deleteData(scope)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button link type="primary" size="small" @click="GetSetData(scope)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background layout="prev, pager, next"
          :default-page-size="5"
          :total="total"
          @current-change="currentChange"
          :current-page="currentPage"
          style="margin-top:10px;justify-content:center"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from 'axios';
import {ElMessage} from 'element-plus'

// 存放操作的类型
const options = [
  {
    value: '搜索',
    label: '搜索',
  },
  {
    value: '新建',
    label: '新建',
  },
  {
    value: '修改',
    label: '修改',
    disabled: true,
  },

]
//选择的操作类型
const operation = ref(options[0].value)
// 网络获取的数据
const tableData = ref([{
  "positionId": "999",
  "positionName": "1",
  "positionIntroduce": "1",
  "positionDescriptionList": [1],
  "positionImgUrl": "1"
}, {
  "positionId": "1000",
  "positionName": "2",
  "positionIntroduce": "2",
  "positionDescriptionList": [2],
  "positionImgUrl": "2"
}])
//总数据量
const total = ref(5)
//页面
const currentPage = ref(1)
//请求 查询岗位列表
const GetList = (pageNum, pageSize) => {
  // 网络请求数据
  axios.get("/changyuan/admin/query/position/list", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then((response) => {
    tableData.value = response.data.list
    //console.log("查询岗位列表", response.data)
    //总数据量
    total.value = response.data.total
    currentPage.value = pageNum
  }).catch((err) => {
    console.log("查询岗位列表错误", err)
    ElMessage.error(err.message)
  }).finally(() => {
    elTableDate.value = tableData.value
  })
}
GetList(1, 5)

// 展示数据
const elTableDate = ref([])
//更换分页
const currentChange = (n) => {
  GetList(n, 5)
}


//存放输入框数据
const formData = ref({
  "positionId": "",
  "positionName": "",
  "positionIntroduce": "",
  "positionDescription": "",
  "positionImgUrl": ""
})
//控制输入框是否禁用
const formDataDisabled = ref({
  "positionId": false,
  "positionName": false,
  "positionIntroduce": true,
  "positionDescriptionList": true,
  "positionImgUrl": true
})

//确认按钮
const confirm = () => {
  if (operation.value === "搜索") {
    seek()
  } else if (operation.value === "修改") {
    setData()
  } else if (operation.value === "新建") {
    addData()
  }
}
//操作类型改变
const typeChange = () => {
  formData.value = {
    "positionId": "",
    "positionName": "",
    "positionIntroduce": "",
    "positionDescription": "",
    "positionImgUrl": ""
  }
  if (operation.value === "搜索") {
    formDataDisabled.value = {
      "positionId": false,
      "positionName": false,
      "positionIntroduce": true,
      "positionDescriptionList": true,
      "positionImgUrl": true
    }
  } else {
    formDataDisabled.value = {
      "positionId": true,
      "positionName": false,
      "positionIntroduce": false,
      "positionDescriptionList": false,
      "positionImgUrl": false
    }
  }
}

//搜索
const seek = async () => {
  //判断 id 不为空id不重复
  elTableDate.value = []
  //存放那个请求 请求成功
  const succeed = ref([false, false])
  //岗位id 不为空 请求 搜索
  if (formData.value.positionId !== "") {
    await axios.get("/changyuan/admin/query/positionById/" + formData.value.positionId).then((response) => {
      elTableDate.value.unshift(response.data)
      succeed.value[0] = true
    }).catch((err) => {
      console.log("搜索id错误", err)
    })
  }
  //岗位名称 不为空 请求 搜索
  if (formData.value.positionName !== "") {
    await axios.get("/changyuan/admin/query/positionByName/" + formData.value.positionName).then((response) => {
      elTableDate.value.unshift(...response.data)
      succeed.value[1] = true
    }).catch((err) => {
      console.log("搜索岗位名称错误", err)
    })
  }

  //岗位id 或 岗位名称  请求成功 提示
  if (succeed.value[0] || succeed.value[1]) {
    ElMessage({
      message: '搜索成功',
      type: 'success',
    })
  }
  // 输入框 都为空 展示原始数据
  if (formData.value.positionId === "" && formData.value.positionName === "") {
    elTableDate.value = tableData.value
  }
}
//点击设置 输入框获取值
const GetSetData = (scope) => {
  console.log("修改", scope)
  //更改操作类型
  operation.value = options[2].value
  typeChange()
  //赋值
  formData.value.positionId = scope.row.positionId
  formData.value.positionName = scope.row.positionName
  formData.value.positionDescription = scope.row.positionDescriptionList.toString()
  formData.value.positionImgUrl = scope.row.positionImgUrl
  formData.value.positionIntroduce = scope.row.positionIntroduce
}
//修改岗位信息
const setData = async () => {
  if (formData.value.positionName === "" || formData.value.positionDescription === "" || formData.value.positionIntroduce === "" || formData.value.positionImgUrl === "") {
    ElMessage({
      message: '输入框不能为空!',
      type: 'warning',
    })
  } else {
    await axios.put("/changyuan/admin/position/update", JSON.stringify(formData.value), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data)
      ElMessage({
        message: '修改岗位信息成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '修改岗位信息错误!' + err.message,
        type: 'warning',
      })
      console.log("修改岗位信息错误", err)
    })
  }
}
//新建
const addData = async () => {
  if (formData.value.positionName === "" || formData.value.positionDescription === "" || formData.value.positionIntroduce === "" || formData.value.positionImgUrl === "") {
    ElMessage({
      message: '输入框不能为空!',
      type: 'warning',
    })
  } else {
    //新建岗位信息
    await axios.post("/changyuan/admin/position/add", JSON.stringify(formData.value), {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
          ElMessage({
            message: '新建岗位信息成功',
            type: 'success',
          })
          console.log("新建岗位信息成功", response.data)
          GetList(1, 5)
        }).catch((err) => {
          ElMessage({
            message: '新建岗位信息错误',
            type: 'warning',
          })
          console.log("新建岗位信息错误", err)
        })
  }

}
//删除
const deleteData = (scope) => {
  axios.delete("/changyuan/admin/position/delete/" + scope.row.positionId).then((response) => {
    console.log(response.data)
    if (response.data.code === 500) {
      ElMessage({
        message: '操作失败！',
        type: 'error',
      })
    } else if (response.data.code === 200) {
      ElMessage({
        message: '删除岗位信息成功',
        type: 'success',
      })
    }
  }).catch((err) => {
    console.log("删除岗位信息错误", err)
  }).finally(() => {
    GetList(1, 5)
  })

}
</script>

<style scoped>

</style>