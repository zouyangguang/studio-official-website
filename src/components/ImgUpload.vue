<template>
  <el-dialog title="请选择已有素材" width="800" @open="open">
    <el-tabs v-model="activeName">
      <el-tab-pane label="已有素材" name="已有素材" style="height: 450px;">
        <el-scrollbar height="400px">
          <ul class="MediaList">
            <li v-for="(item,index) in MediaList" :key="item.mediaId"
                @click="SelectFile(index)">
              <!--                :src="'http://43.139.254.175/'+item.filePath"-->
              <el-image style="width:95%;height: 70%" :src="globalState.imgUrl+'/'+item.filePath" fit="contain">
                <template #error>
                  <div class="image-slot">
                    <el-icon>
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
              {{ item.filePath }}
              <div class="SelectedPicture" v-show="SelectedMediaList[index]">
                <el-icon color="#67C23A"><Select/></el-icon>
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <div class="upload-button">
          <el-button :icon="RefreshRight" circle type="primary" @click="refreshData"/>
          <el-button plain type="success" @click="SelectedPicture">确定</el-button>
        </div>

      </el-tab-pane>
      <el-tab-pane label="上传" name="上传" style="height: 450px; border: 1px solid rgba(255,255,255,0)">
        <div>
          <el-upload
              :auto-upload="false"
              list-type="picture-card"
              :on-change="uploadChange"
              :on-preview="handlePictureCardPreview">
            <el-icon>
              <Plus/>
            </el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img :src="dialogImageUrl" alt="Preview Image"/>
          </el-dialog>
          <el-button plain type="success" class="upload-button" @click="imgUpload">上传</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import {ref, defineEmits, computed, inject, defineProps} from "vue";
import {ElMessage} from 'element-plus'
import axios from 'axios';
import {Plus, Picture, Select, RefreshRight} from '@element-plus/icons-vue'
//获取全局变量
const globalState = inject('globalState')
//SelectedPicture 输入框里的内容 isPicture是否为多个或单个文件
//isPicture false多选 true单选
const props = defineProps(["SelectedPicture", "isPicture"])

//存放当前对话框
const activeName = ref('已有素材')
//存放所有素材
const MediaList = ref([])
//获取所有图片
const GetMediaList = () => {
  axios.get("/api/query/Media/list").then((res) => {
    MediaList.value = res.data
    refreshSelectedMediaList()
    // console.log(MediaList.value)
  }).catch((err) => {
    console.log("获取图片失败", err)
  })
}
GetMediaList()
// 存放是否选中图片列表的状态
const SelectedMediaList = ref()
// 刷新是否选中图片列表的状态
const refreshSelectedMediaList = () => {
  //判断输入框内容是否为空
  if (props.SelectedPicture === undefined || props.SelectedPicture === "" || props.SelectedPicture === null) {
    SelectedMediaList.value = MediaList.value.map(() => {
      return false
    })
  } else {
    if (props.isPicture === "true" || props.isPicture === true) {
      SelectedMediaList.value = MediaList.value.map((value) => {
        return value.filePath === props.SelectedPicture
      })
    } else {
      //对输入框内容转为数组
      let PictureArray = props.SelectedPicture.split(",")
      SelectedMediaList.value = MediaList.value.map((value) => {
        for (let i = 0; i < PictureArray.length; i++) {
          if (value.filePath === PictureArray[i]) return true
        }
        return false
      })
    }
  }

}
refreshSelectedMediaList()
//每次Dialog 打开的回调
const open = () => {
  imgUrl.value = ""
  refreshSelectedMediaList()
}

// 存放选中的图片列表
const SelectedMediaListUrl = computed(() => {
  return MediaList.value.filter((value, index) => SelectedMediaList.value[index])
})

//点击选中文件
const SelectFile = (index) => {
  if (props.isPicture === "true" || props.isPicture === true) {
    SelectedMediaList.value = SelectedMediaList.value.map(() => false)
  }
  SelectedMediaList.value[index] = !SelectedMediaList.value[index]
}

//刷新所有素材
const refreshData = () => {
  GetMediaList()
  ElMessage({
    message: '刷新成功',
    type: 'success',
  })
}

//要预览的图片
const dialogImageUrl = ref('')
//控制是否显示
const dialogVisible = ref(false)
//存放当前所有要上传的图片列表
const uploadImg = ref()
//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const uploadChange = (uploadFile, uploadFiles) => {
  uploadImg.value = uploadFiles
}

//预览图片
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
//上传文件的图片路径
const imgUrl = ref([])
//上传文件
const imgUpload = async () => {
  imgUrl.value = []
  for (const file of uploadImg.value) {
    await axios({
      method: 'post',
      url: '/api/upload',
      headers: {"Content-Type": "multipart/form-data"},
      data: {"files": file.raw}
    }).then(function (response) {
      ElMessage({
        message: '上传成功',
        type: 'success',
      })
      imgUrl.value.unshift(response.data.data)
    }).catch((err) => {
      console.log(err)
      ElMessage({
        message: '上传失败',
        type: 'error',
      })
    })
  }
  setTimeout(() => {
    GetMediaList()
    SelectedPicture(imgUrl.value)
  }, 2)

}

const emits = defineEmits(['SelectedPicture']);
//确定按钮
const SelectedPicture = () => {
  ElMessage({
    message: '选择成功',
    type: 'success',
  })
  let item = ""

  //判断有没有选中的图片列表
  if (SelectedMediaListUrl.value.length !== 0) {
    item = SelectedMediaListUrl.value.map(value => value.filePath).join(",")
  }

  //判断是否有上传的图片
  if (imgUrl.value.length !== 0) {
    if (props.SelectedPicture) {
      //保留原来输入框内容
      item = props.SelectedPicture + ',' + item
      item = item + ',' + imgUrl.value.map(value => value).join(",")
    } else {
      item = imgUrl.value.map(value => value).join(",")
    }
  }
  //去重
  let temp = [...new Set(item.split(","))];
  //判断返回单个图片,还是多个
  if (props.isPicture === "true" || props.isPicture === true) {
    //单个
    item = temp[temp.length - 1]
  } else {
    item = temp.map(value => value).join(",");
  }
  emits("SelectedPicture", item);
};


</script>

<style scoped>
/*图片选项卡*/
.show-img > ul {
  list-style: none;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 325px;
  max-height: 70dvh;
  overflow-y: auto;
  padding: 10px 0;
  transition: 0.5s;
}


.show-img > ul > li {
  width: 140px;
  height: 140px;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;

}

.upload-button {
  position: absolute;
  bottom: 0;
  right: 0;
}

.MediaList {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 25%);
}

.MediaList > li {
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
}

.MediaList > li:hover {
  border: 2px dashed #80c5ff;

}

.MediaList > li .SelectedPicture {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 25px;
  border-radius: 20px;
  border: 1px solid #67C23A;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
</style>