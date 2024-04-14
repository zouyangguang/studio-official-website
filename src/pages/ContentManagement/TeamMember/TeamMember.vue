<template>
  <div class="ProductControl">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #84c1ff"></p> 成员模块</div>
      <div>
        <el-button style="float: right" type="primary" plain @click="confirm">确认
        </el-button>
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
          <span>成员id</span>
          <el-input :disabled="formDataDisabled.memberId" placeholder="成员id" v-model="formData.memberId"/>
        </div>
        <div>
          <span>成员名称</span>
          <el-input :disabled="formDataDisabled.memberName" placeholder="成员名称" v-model="formData.memberName"/>
        </div>
        <div>
          <span>性别</span>
          <el-input :disabled="formDataDisabled.memberSex" placeholder="性别"
                    v-model="formData.memberSex"/>
        </div>
        <div>
          <span>岗位名称</span>
          <el-select :disabled="formDataDisabled.positionId" v-model="positionId" placeholder="请选择操作类型"
                     size="default" style="width: 100%;">
            <el-option v-for="item in positionDtoList" :key="item.positionId" :label="item.positionName"
                       :value="item.positionId"/>
          </el-select>

        </div>
        <div>
          <span>角色名称{{ roleId }}</span>
          <el-select :disabled="formDataDisabled.roleId" v-model="roleId" placeholder="请选择操作类型" size="default"
                     style="width: 100%;">
            <el-option v-for="item in RoleDtoList" :key="item.positionId" :label="item.roleName" :value="item.roleId"/>
          </el-select>
        </div>
        <div>
          <span>邮箱</span>
          <el-input :disabled="formDataDisabled.email" placeholder="邮箱"
                    v-model="formData.email"/>
        </div>
        <div>
          <span>年龄</span>
          <el-input :disabled="formDataDisabled.age" placeholder="年龄"
                    v-model="formData.age"/>
        </div>
        <div>
          <span>电话号码</span>
          <el-input :disabled="formDataDisabled.phoneNum" placeholder="电话号码"
                    v-model="formData.phoneNum"/>
        </div>
        <div>
          <span>入职日期</span>
          <el-date-picker
              v-model="formData.entryDate"
              :disabled="formDataDisabled.entryDate"
              type="date"
              placeholder="入职日期"
              size="default"/>
        </div>
        <div>
          <span>离职日期</span>
          <el-date-picker
              v-model="formData.dimissionDate"
              :disabled="formDataDisabled.dimissionDate"
              type="date"
              placeholder="修改时间"
              size="default"/>
        </div>
        <div>
          <span>岗位介绍</span>
          <el-input :disabled="formDataDisabled.memberIntroduce" placeholder="岗位介绍"
                    v-model="formData.memberIntroduce" style="width: 90%"
                    autosize
                    type="textarea"/>
        </div>
        <div>
          <span>密码</span>
          <el-input :disabled="formDataDisabled.password" placeholder="请输入密码"
                    v-model="formData.password"/>
        </div>
      </form>
    </div>
    <!-- 表格-->
    <div>
      <el-table border :data="elTableDate" style="width: 100%;height: 238px" show-overflow-tooltip>
        <el-table-column prop="memberId" label="ID"/>
        <el-table-column prop="memberName" label="名称"/>
        <el-table-column prop="memberSex" label="性别"/>
        <el-table-column prop="positionName" label="岗位名称"/>
        <el-table-column prop="memberIntroduce" label="岗位介绍"/>
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="entryDate" label="入职日期"/>
        <el-table-column prop="dimissionDate" label="离职日期"/>
        <el-table-column prop="phoneNum" label="电话号码"/>
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

// 存放网络获取的数据
const tableData = ref([{
  "memberId": 999,
  "memberName": "林(测试)",
  "memberSex": "男",
  "positionName": "后端工程师",
  "phoneNum": "19800000000",
  "entryDate": "2023-01-01 00:00:00",
  "dimissionDate": "2023-07-24 00:00:00",
  "memberIntroduce": "我是一个后端工程师",
  "age": "19",
  "email": "111@qq.com",
  "roleName": "成员"
}])
//总数据量
const total = ref(5)
//页面
const currentPage = ref(1)
//请求 查询成员信息列表
const GetList = (pageNum, pageSize) => {
  // 网络请求数据
  axios.get("/changyuan/admin/teammember/list", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then((response) => {
    tableData.value = response.data.list
    console.log("查询成员信息列表", response.data)
    //总数据量
    total.value = response.data.total
    currentPage.value = pageNum
  }).catch((err) => {
    console.log("查询成员信息错误", err)
    ElMessage.error(err.message)
  }).finally(() => {
    elTableDate.value = tableData.value
  })
}
GetList(1, 5)

//存放岗位列表
const positionDtoList = ref([{
  "positionId": 999,
  "positionName": ""
}])
//存放当前选择的岗位
const positionId = ref(positionDtoList.value[0].positionId)
//查询岗位列表
axios.get("/changyuan/admin/positionDto/list",).then((response) => {
  positionDtoList.value = response.data
  positionId.value = positionDtoList.value[0].positionId
}).catch((err) => {
  console.log("查询全部岗位错误", err)
  ElMessage.error(err.message)
})

//存放全部角色列表
const RoleDtoList = ref([{
  "roleName": "user",
  "roleId": 999
}])
//存放选中的角色列表
const roleId = ref(RoleDtoList.value[0].roleId)
//查询全部角色
axios.get("/changyuan/admin/RoleDto/list",).then((response) => {
  RoleDtoList.value = response.data
  roleId.value = RoleDtoList.value[0].roleId
}).catch((err) => {
  console.log("查询角色错误", err)
  ElMessage.error(err.message)
})


// 展示数据
const elTableDate = ref([])
//更换分页
const currentChange = (n) => {
  GetList(n, 5)
}


//存放输入框数据
const formData = ref({
  "memberId": "",
  "memberName": "",
  "memberSex": "",
  "positionId": positionId.value,
  "phoneNum": "",
  "entryDate": "",
  "dimissionDate": "",
  "memberIntroduce": "",
  "age": "",
  "email": "",
  "roleId": roleId.value,
  "password": ""
})
//控制输入框是否禁用
const formDataDisabled = ref({
  "memberId": true,
  "memberName": false,
  "memberSex": true,
  "positionId": true,
  "phoneNum": true,
  "entryDate": true,
  "dimissionDate": true,
  "memberIntroduce": true,
  "age": true,
  "email": true,
  "roleId": true,
  "password": true
})

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
//操作类型改变
const typeChange = () => {
  formData.value = {
    "memberId": "",
    "memberName": "",
    "memberSex": "",
    "positionId": positionId.value,
    "phoneNum": "",
    "entryDate": "",
    "dimissionDate": "",
    "memberIntroduce": "",
    "age": "",
    "email": "",
    "roleId": roleId.value,
    "password": ""
  }
  if (operation.value === "搜索") {
    formDataDisabled.value = {
      "memberId": true,
      "memberName": false,
      "memberSex": true,
      "positionId": true,
      "phoneNum": true,
      "entryDate": true,
      "dimissionDate": true,
      "memberIntroduce": true,
      "age": true,
      "email": true,
      "roleId": true,
      "password": true
    }
  } else {
    formDataDisabled.value = {
      "memberId": true,
      "memberName": false,
      "memberSex": false,
      "positionId": false,
      "phoneNum": false,
      "entryDate": false,
      "dimissionDate": false,
      "memberIntroduce": false,
      "age": false,
      "email": false,
      "roleId": false,
      "password": false
    }
  }
}
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
// 判断输入框 是否为空
const IsEmpty = () => {
  const temp = ref(true)
  for (let key in formData.value) {
    if (key !== 'memberId' && key !== 'dimissionDate') {
      if (formData.value[key] === undefined || formData.value[key] === null) {
        formData.value[key] = ""
      }
      if (formData.value[key].toString().replace(/(^\s*)|(\s*$)/g, '') === "") {
        temp.value = false
        ElMessage({
          message: '输入框不能为空!' + key,
          type: 'warning',
        })
        break
      }
    }
  }
  return temp.value
}
//搜索
const seek = async () => {
  console.log("搜索")
  console.log(formData.value)
  //判断 id 不为空id不重复
  elTableDate.value = []
  //存放那个请求 请求成功
  const succeed = ref([false, false])
  // //岗位id 不为空 请求 搜索
  // if (formData.value.memberId !== "") {
  //   await axios.get("/changyuan/admin/query/productsById/" + formData.value.memberId).then((response) => {
  //     elTableDate.value.unshift(response.data)
  //     succeed.value[0] = true
  //   }).catch((err) => {
  //     console.log("搜索id错误", err)
  //   })
  // }
  //岗位名称 不为空 请求 搜索
  if (formData.value.memberName !== "") {
    await axios.get("/changyuan/admin/query/TeammemberByName/" + formData.value.memberName).then((response) => {
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
  if (formData.value.memberId === "" && formData.value.memberName === "") {
    elTableDate.value = tableData.value
  }
}
//点击设置 输入框获取值
const GetSetData = (scope) => {
  //更改操作类型
  operation.value = options[2].value
  typeChange()
  positionId.value = positionDtoList.value.find((item) => item.positionName === scope.row.positionName).positionId
  roleId.value = RoleDtoList.value.find((item) => item.roleName === scope.row.roleName).roleId
  console.log(roleId.value)
  formData.value = {
    "memberId": scope.row.memberId,
    "memberName": scope.row.memberName,
    "memberSex": scope.row.memberSex,
    "positionId": positionId.value,
    "phoneNum": scope.row.phoneNum,
    "entryDate": scope.row.entryDate,
    "dimissionDate": scope.row.dimissionDate,
    "memberIntroduce": scope.row.memberIntroduce,
    "age": scope.row.age,
    "email": scope.row.email,
    "roleId": roleId.value,
    "password": ""
  }
  // console.log("修改", scope)
}

//修改
const setData = async () => {
  if (IsEmpty()) {
    formData.value.positionId = positionId.value
    formData.value.roleId = roleId.value
    await axios.put("/changyuan/admin/teammember/update", formData.value).then(() => {
      ElMessage({
        message: '修改成员信息成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '修改成员信息失败',
        type: 'warning',
      })
      console.log("修改成员信息错误", err)
    })
  }
}


//新建
const addData = async () => {
  if (IsEmpty()) {
    await axios.post("/changyuan/admin/teammember/add", formData.value).then((res) => {
      ElMessage({
        message: '新增成员成功',
        type: 'success',
      })
      console.log(res)
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '新增成员失败',
        type: 'warning',
      })
      console.log("新增成员错误", err)
    })
  }
}

//删除
const deleteData = (scope) => {
  axios.delete("/changyuan/admin/teammember/delete/" + scope.row.memberId).then((response) => {
    console.log(response.data)
    if (response.data.code === 500) {
      ElMessage({
        message: '删除成员信息失败！',
        type: 'error',
      })
    } else if (response.data.code === 200) {
      ElMessage({
        message: '删除成员信息成功',
        type: 'success',
      })
    }
  }).catch((err) => {
    ElMessage({
      message: '删除成员信息失败！',
      type: 'error',
    })
    console.log("删除成员信息错误", err)
  }).finally(() => {
    GetList(1, 5)
  })
}
</script>

<style scoped>

</style>