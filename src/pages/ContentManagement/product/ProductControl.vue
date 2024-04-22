<template>
  <div class="ProductControl">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #84c1ff"></p> 产品模块</div>
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
          <span>产品id</span>
          <el-input :disabled="formDataDisabled.productId" placeholder="产品id" v-model="formData.productId"/>
        </div>
        <div>
          <span>产品名称</span>
          <el-input :disabled="formDataDisabled.productName" placeholder="产品名称" v-model="formData.productName"/>
        </div>
        <div>
          <span>产品图标地址</span>
          <el-input :disabled="formDataDisabled.productLogoUrl" placeholder="产品图标地址"
                    v-model="formData.productLogoUrl" @click="openImgUpload('productLogoUrl',true)"/>
        </div>
        <div>
          <span>荣誉图地址</span>
          <el-input :disabled="formDataDisabled.honorImgUrl" placeholder="荣誉图地址(以逗号分割为一个地址)"
                    v-model="formData.honorImgUrl" @click="openImgUpload('honorImgUrl')"/>
        </div>
        <div>
          <span>平台二维码地址</span>
          <el-input :disabled="formDataDisabled.platformImgUrl" placeholder="平台二维码址(以逗号分割为一个地址)"
                    v-model="formData.platformImgUrl" @click="openImgUpload('platformImgUrl')"/>
        </div>
        <div>
          <span>作品截图地址</span>
          <el-input :disabled="formDataDisabled.screenshotImgUrl" placeholder="作品截图地址(以逗号分割为一个地址)"
                    v-model="formData.screenshotImgUrl" @click="openImgUpload('screenshotImgUrl')"/>
        </div>
        <div>
          <span>视频地址</span>
          <el-input :disabled="formDataDisabled.videoUrl" placeholder="视频地址"
                    v-model="formData.videoUrl" @click="openImgUpload('videoUrl',true)"/>
        </div>
        <div>
          <span>产品介绍</span>
          <el-input :disabled="formDataDisabled.productIntroduce" placeholder="产品介绍"
                    v-model="formData.productIntroduce" style="width: 90%"
                    autosize
                    type="textarea"/>
        </div>
      </form>
    </div>
    <!-- 表格-->
    <div>
      <el-table border :data="elTableDate" style="width: 100%;height: 238px" show-overflow-tooltip>
        <el-table-column prop="productId" label="ID"/>
        <el-table-column prop="productName" label="名称"/>
        <el-table-column prop="productLogoUrl" label="主图地址"/>
        <el-table-column prop="productIntroduce" label="介绍"/>
        <el-table-column prop="honorImgUrlList" label="荣誉图地址集合"/>
        <el-table-column prop="platformImgUrlList" label="平台二维码截图"/>
        <el-table-column prop="videoUrl" label="视频地址"/>
        <el-table-column prop="screenshotImgUrlList" label="作品截图地址集合"/>
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
    <!--选择图片对话框 isPicture false多选 true单选-->
    <img-upload v-model="dialogTableVisible" :isPicture="isPicture" @SelectedPicture="SelectedPicture"
                :SelectedPicture="SelectedImg"></img-upload>

  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from 'axios';
import {ElMessage} from 'element-plus'
import ImgUpload from "@/components/ImgUpload.vue";

//对话框输入的数据
const SelectedImg = ref("")
//存放那个输入框打开的对话框
const inputOpneKey = ref("")
//是否为单个文件 false多选 true单选
const isPicture = ref(false)
// 对话框返回选中的图片列表
const imgList = ref()
//控制选择图片是否显示
const dialogTableVisible = ref(false)
//获取选择的图片路径
const SelectedPicture = (item) => {
  imgList.value = item
  dialogTableVisible.value = false
  formData.value[inputOpneKey.value] = item
};

//打开选择图片对话框
const openImgUpload = (key, BoolPicture = false) => {
  inputOpneKey.value = key
  SelectedImg.value = formData.value[key]
  isPicture.value = BoolPicture
  dialogTableVisible.value = true
}


// 存放网络获取的数据
const tableData = ref([{
  "productId": 9999,
  "productName": "实习宝(测试)",
  "productIntroduce": "“实习宝”是一款专业的企业实践管理系统 ，借助5G时代和高速发展的软件技术，为学生和指导老师提供了统一便捷的协作平台。/n本项目对职业教育中学生的实习期进行了全 流程化管理，以方便高效为目标，以解决实际问题为己任，以数字化发展为契机开启职 业教育数字赋能之路。/n本项目深入实习一线调研，功能直击实习痛 点，可大幅度提升技工院校实习管理团队的工作效率，辅助未来决策，具有极高的推广 应用价值。",
  "honorImgUrlList": ["img/b实习宝奖状1.png", "img/b实习宝奖状2.png", "img/b实习宝奖状3.png"],
  "platformImgUrlList": ["/img/b创造实习宝教师端.png", "/img/b创造实习宝学生端.png"],
  "productLogoUrl": "/img/b创造long1.png",
  "videoUrl": "/img/实习宝宣讲视频（40S）.mp4",
  "screenshotImgUrlList": [""]
}])
//总数据量
const total = ref(5)
//页面
const currentPage = ref(1)
//请求 查询岗位列表
const GetList = (pageNum, pageSize) => {
  // 网络请求数据
  axios.get("/changyuan/admin/query/product/list", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then((response) => {
    tableData.value = response.data.list
    // console.log("查询产品信息", response.data)
    //总数据量
    total.value = response.data.total
    currentPage.value = pageNum
  }).catch((err) => {
    console.log("查询产品信息错误", err)
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
  "productId": "",
  "productName": "",
  "productIntroduce": "",
  "honorImgUrl": "",
  "platformImgUrl": "",
  "screenshotImgUrl": "",
  "videoUrl": "",
  "productLogoUrl": ""
})
//控制输入框是否禁用
const formDataDisabled = ref({
  "productId": false,
  "productName": false,
  "productIntroduce": true,
  "honorImgUrl": true,
  "platformImgUrl": true,
  "screenshotImgUrl": true,
  "videoUrl": true,
  "productLogoUrl": true
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
    "productId": "",
    "productName": "",
    "productIntroduce": "",
    "honorImgUrl": "",
    "platformImgUrl": "",
    "screenshotImgUrl": "",
    "videoUrl": "",
    "productLogoUrl": ""
  }
  if (operation.value === "搜索") {
    formDataDisabled.value = {
      "productId": false,
      "productName": false,
      "productIntroduce": true,
      "honorImgUrl": true,
      "platformImgUrl": true,
      "screenshotImgUrl": true,
      "videoUrl": true,
      "productLogoUrl": true
    }
  } else {
    formDataDisabled.value = {
      "productId": true,
      "productName": false,
      "productIntroduce": false,
      "honorImgUrl": false,
      "platformImgUrl": false,
      "screenshotImgUrl": false,
      "videoUrl": false,
      "productLogoUrl": false
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
  console.log(formData.value)
  //判断 id 不为空id不重复
  elTableDate.value = []
  //存放那个请求 请求成功
  const succeed = ref([false, false])
  //岗位id 不为空 请求 搜索
  if (formData.value.productId !== "") {
    await axios.get("/changyuan/admin/query/productsById/" + formData.value.productId).then((response) => {
      elTableDate.value.unshift(response.data)
      succeed.value[0] = true
    }).catch((err) => {
      console.log("搜索id错误", err)
    })
  }
  //岗位名称 不为空 请求 搜索
  if (formData.value.productName !== "") {
    await axios.get("/changyuan/admin/query/productByName/" + formData.value.productName).then((response) => {
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
  if (formData.value.productId === "" && formData.value.productName === "") {
    elTableDate.value = tableData.value
  }
}
//点击设置 输入框获取值
const GetSetData = (scope) => {
  //更改操作类型
  operation.value = options[2].value
  typeChange()
  formData.value = {
    "productId": scope.row.productId,
    "productName": scope.row.productName,
    "productIntroduce": scope.row.productIntroduce,
    "honorImgUrl": scope.row.honorImgUrlList.toString(),
    "platformImgUrl": scope.row.platformImgUrlList.toString(),
    "screenshotImgUrl": scope.row.screenshotImgUrlList.toString(),
    "videoUrl": scope.row.videoUrl,
    "productLogoUrl": scope.row.productLogoUrl
  }
  // console.log("修改", scope)
}

//修改
const setData = async () => {
  if (IsEmpty()) {
    await axios.put("/changyuan/admin/product/update", formData.value).then(() => {
      ElMessage({
        message: '修改产品信息成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '修改产品信息失败',
        type: 'warning',
      })
      console.log("修改产品信息错误", err)
    })
  }
}


//新建
const addData = async () => {
  if (IsEmpty()) {
    await axios.post("/changyuan/admin/product/add", formData.value).then(() => {
      ElMessage({
        message: '新建产品信息成功',
        type: 'success',
      })
      GetList(1, 5)
    }).catch((err) => {
      ElMessage({
        message: '新建产品信息失败',
        type: 'warning',
      })
      console.log("新建产品信息错误", err)
    })
  }
}
// 判断输入框 是否为空
const IsEmpty = () => {
  const temp = ref(true)
  for (let key in formData.value) {
    if (key === 'productName' || key === 'productIntroduce' || key === 'productLogoUrl') {
      if (formData.value[key].replace(/(^\s*)|(\s*$)/g, '') === "") {
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
  axios.delete("/changyuan/admin/product/delete/" + scope.row.productId).then((response) => {
    console.log(response.data)
    if (response.data.code === 500) {
      ElMessage({
        message: '删除产品信息失败！',
        type: 'error',
      })
    } else if (response.data.code === 200) {
      ElMessage({
        message: '删除产品信息成功',
        type: 'success',
      })
    }
  }).catch((err) => {
    ElMessage({
      message: '删除产品信息失败！',
      type: 'error',
    })
    console.log("删除岗位信息错误", err)
  }).finally(() => {
    GetList(1, 5)
  })
}


</script>

<style scoped>

</style>