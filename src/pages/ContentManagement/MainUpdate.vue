<template>
  <div class="MainUpdate">
    <div style="display: flex;align-items: center; justify-content: space-between;">
      <div class="headline"><p style="background-color: #e51251"></p> 文件管理</div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="资源列表" name="ImgList">
        <el-scrollbar height="70vh">
          <ul class="MediaList">
            <li v-for="(item,index) in MediaList" :key="item.mediaId"
                @click="SelectedMediaList[index]=!SelectedMediaList[index]">
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
                <el-icon color="red">
                  <Delete/>
                </el-icon>
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <div style="float: right; margin-top: 10px">
          <el-button :icon="RefreshRight" circle type="primary" @click="refreshData"/>
          <el-tooltip content="删除已选中图片">
            <el-button type="danger" :icon="Delete" circle @click="DeleteFile"/>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传文件" name="Update">
        <div class="Update">
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
  </div>
</template>

<script setup>
import {computed, inject, ref} from 'vue'
import {Plus, RefreshRight, Select, Delete} from '@element-plus/icons-vue'
import axios from "axios";
import {ElMessage} from "element-plus";
//获取全局变量
const globalState = inject('globalState')
const activeName = ref('ImgList')

//存放所有素材
const MediaList = ref([])
//获取所有图片
const GetMediaList = () => {
  axios.get("/api/query/Media/list").then((res) => {
    MediaList.value = res.data
    // console.log(MediaList.value)
  }).catch((err) => {
    console.log("获取图片失败", err)
  })
}
GetMediaList()
//刷新所有素材
const refreshData = () => {
  GetMediaList()
  ElMessage({
    message: '刷新成功',
    type: 'success',
  })
}


// 存放是否选中图片列表的状态
const SelectedMediaList = ref(MediaList.value.map(() => false))

// 存放选中的图片列表
const SelectedMediaListUrl = computed(() => {
  return MediaList.value.filter((value, index) => SelectedMediaList.value[index])
})

//删除图片
const DeleteFile = () => {

  SelectedMediaListUrl.value.forEach(item => {
    axios({
      method: 'post',
      url: '/api/file/delete',
      data: {"mediaId": item.mediaId}
    }).then(function (response) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      console.log("删除", response.data.data)
    }).catch((err) => {
      console.log("删除失败",err)
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    })
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

//上传文件
const imgUpload = async () => {
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
      console.log("上传成功", response.data.data)
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
  }, 2)

}

</script>

<style scoped>
.MainUpdate {
  min-width: 600px;
}

.Update {
  min-height: 500px;
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
  overflow: hidden;
  font-size: 1vw;
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
  border: 1px solid red;
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

