<template>
  <div class="ProductControl">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #2df65c"></p> 文章模块</div>
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
          <span>文章id</span>
          <el-input :disabled="formDataDisabled.articleId" placeholder="文章id" v-model="formData.articleId"/>
        </div>
        <div>
          <span>标题</span>
          <el-input :disabled="formDataDisabled.articleTitle" placeholder="标题"
                    v-model="formData.articleTitle"/>
        </div>
<!--        <div>-->
<!--          <span>类别</span>-->
<!--          <el-input :disabled="formDataDisabled.categoryId" placeholder="类别id" v-model="formData.categoryId"/>-->
<!--        </div>-->
        <div>
          <span>作者</span>
          <el-input :disabled="formDataDisabled.author" placeholder="作者"
                    v-model="formData.author"/>
        </div>
        <div>
          <span>简介</span>
          <el-input :disabled="formDataDisabled.articleIntroduc" placeholder="简介"
                    v-model="formData.articleIntroduc"/>
        </div>
        <div>
          <span>主图路径</span>
          <el-input :disabled="formDataDisabled.articleImgUrl" placeholder="主图路径"
                    v-model="formData.articleImgUrl"/>
        </div>
        <div>
          <span>创建时间</span>
          <el-date-picker
              v-model="formData.createDate"
              :disabled="formDataDisabled.createDate"
              type="date"
              placeholder="创建时间"
              size="default"
          />
        </div>
        <div>
          <span>修改时间</span>
          <el-date-picker
              v-model="formData.updateDate"
              :disabled="formDataDisabled.updateDate"
              type="date"
              placeholder="修改时间"
              size="default"/>
        </div>
        <div>
          <span>文章内容</span>
          <el-input :disabled="formDataDisabled.articleContent" placeholder="文章内容"
                    v-model="formData.articleContent" style="width: 90%"
                    autosize
                    type="textarea"/>
        </div>
      </form>
    </div>
    <!-- 表格-->
    <div>
      <el-table border :data="elTableDate" style="width: 100%;height: 238px" show-overflow-tooltip>
        <el-table-column prop="articleId" label="ID"/>
        <el-table-column prop="articleTitle" label="标题"/>
        <el-table-column prop="categoryId" label="类别id"/>
        <el-table-column prop="articleContent" label="内容"/>
        <el-table-column prop="author" label="作者"/>
        <el-table-column prop="articleIntroduc" label="简介"/>
        <el-table-column prop="articleImgUrl" label="主图路径"/>
        <el-table-column prop="createDate" label="创建时间"/>
        <el-table-column prop="updateDate" label="修改时间"/>
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
  "articleId": 9999,
  "categoryId": 0,
  "articleTitle": "A+闯关挑战(测试)",
  "articleContent": "陈肖均同学叙述他在长远遇见的无限可能，用独特的视角展示创新与坚持的力量\r\n\r\n",
  "author": "陈肖均",
  "CreateDate": "2024-03-21",
  "UpdateDate": "2024-03-21",
  "articleIntroduc": "陈肖均同学叙述他在长远遇见的无限可能，用独特的视角展示创新与坚持的力量",
  "articleImgUrl": "img/A+文章图.png",
  "updateDate": "2024-03-21",
  "createDate": "2024-03-21"
}])
//总数据量
const total = ref(5)
//页面
const currentPage = ref(1)
//请求 查询文章列表
const GetList = (pageNum, pageSize) => {
  // 网络请求数据
  axios.get("/changyuan/admin/article/list", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then((response) => {
    tableData.value = response.data.list
   // console.log("查询文章列表", response.data)
    //总数据量
    total.value = response.data.total
    currentPage.value = pageNum
  }).catch((err) => {
    console.log("查询文章列表错误", err)
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
  "articleId": "",
  "articleTitle": "",
  "articleContent": "",
  "author": "",
  "articleIntroduc": "",
  "articleImgUrl": "",
  "updateDate": new Date(),
  "createDate": new Date()
})
//控制输入框是否禁用
const formDataDisabled = ref({
  "articleId": false,
  "articleTitle": false,
  "articleContent": true,
  "author": true,
  "articleIntroduc": true,
  "articleImgUrl": true,
  "updateDate": true,
  "createDate": true
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
    "articleId": "",
    "articleTitle": "",
    "articleContent": "",
    "author": "",
    "articleIntroduc": "",
    "articleImgUrl": "",
    "updateDate": new Date(),
    "createDate": new Date()
  }
  if (operation.value === "搜索") {
    formDataDisabled.value = {
      "articleId": false,
      "articleTitle": false,
      "articleContent": true,
      "author": true,
      "articleIntroduc": true,
      "articleImgUrl": true,
      "updateDate": true,
      "createDate": true
    }
  } else {
    formDataDisabled.value = {
      "articleId": true,
      "articleTitle": false,
      "articleContent": false,
      "author": false,
      "articleIntroduc": false,
      "articleImgUrl": false,
      "updateDate": false,
      "createDate": false
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
//搜索
const seek = async () => {
  console.log("搜索")
  //判断 id 不为空id不重复
  elTableDate.value = []
  //存放那个请求 请求成功
  const succeed = ref([false, false])
  //岗位id 不为空 请求 搜索
  if (formData.value.articleId !== "") {
    await axios.get("/changyuan/admin/articleById/" + formData.value.articleId).then((response) => {
      elTableDate.value.unshift(response.data)
      succeed.value[0] = true
    }).catch((err) => {
      console.log("搜索id错误", err)
    })
  }
  //岗位名称 不为空 请求 搜索
  if (formData.value.articleTitle !== "") {
    await axios.get("/changyuan/admin/articleByTitle/" + formData.value.articleTitle).then((response) => {
      elTableDate.value.unshift(...response.data)
      succeed.value[1] = true
    }).catch((err) => {
      console.log("搜索名称错误", err)
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
  if (formData.value.articleId === "" && formData.value.articleTitle === "") {
    elTableDate.value = tableData.value
  }
}
//点击设置 输入框获取值
const GetSetData = (scope) => {
  //更改操作类型
  operation.value = options[2].value
  typeChange()
  formData.value = {
    "articleId": scope.row.articleId,
    "categoryId": scope.row.categoryId,
    "articleTitle": scope.row.articleTitle,
    "articleContent": scope.row.articleContent,
    "author": scope.row.author,
    "articleIntroduc": scope.row.articleIntroduc,
    "articleImgUrl": scope.row.articleImgUrl,
    "updateDate": scope.row.updateDate,
    "createDate": scope.row.createDate
  }
  // console.log("修改", scope)
}

//修改
const setData = async () => {
  if (IsEmpty()) {
    await axios.put("/changyuan/admin/article/update", formData.value).then(() => {
      ElMessage({
        message: '修改文章成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '修改文章失败',
        type: 'warning',
      })
      console.log("修改文章错误", err)
    })
  }
}


//新增文章
const addData = async () => {
  console.log(formData.value)
  if (IsEmpty()) {
    await axios.post("/changyuan/admin/article/add", formData.value).then(() => {
      ElMessage({
        message: '新增文章成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '新增文章失败',
        type: 'warning',
      })
      console.log("新增文章错误", err)
    })
  }
}
// 判断输入框 是否为空
const IsEmpty = () => {
  const temp = ref(true)
  for (let key in formData.value) {
    if (key !== "articleId") {
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

//删除
const deleteData = (scope) => {
  axios.delete("/changyuan/admin/article/delete/" + scope.row.articleId).then((response) => {
    if (response.data.code === 500) {
      ElMessage({
        message: '删除文章失败！',
        type: 'error',
      })
    } else if (response.data.code === 200) {
      ElMessage({
        message: '删除文章成功',
        type: 'success',
      })
    }
  }).catch((err) => {
    ElMessage({
      message: '删除文章失败！',
      type: 'error',
    })
    console.log("删除文章错误", err)
  }).finally(() => {
    GetList(1, 5)
  })
}
</script>

<style scoped>

</style>