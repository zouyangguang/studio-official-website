<template>
  <el-dialog title="请选择已有素材" width="800">
    <el-tabs v-model="activeName">
      <el-tab-pane label="已有素材" name="已有素材" style="height: 450px;">
        <el-scrollbar height="400px">
          <ul class="MediaList">
            <li v-for="(item,index) in MediaList" :key="item.mediaId"
                @click="SelectedMediaList[index]=!SelectedMediaList[index]">
              <!--                :src="'http://43.139.254.175/'+item.filePath"-->
              <el-image style="width:95%;height: 70%" fit="contain">
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
        <el-button plain type="success" class="upload-button" @click="SelectedPicture">确定</el-button>
      </el-tab-pane>
      <el-tab-pane label="上传" name="上传" style="height: 450px; border: 1px solid rgba(255,255,255,0)">
        <div class="show-img">
          <ul>
            <li v-for="imgSrc in imgUrl" :key="imgSrc">
              <el-image
                  style="width: 129px; height: 129px;border-radius: 5px;"
                  :src="imgSrc"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[imgSrc]"
                  :initial-index="4"
                  fit="cover"/>
            </li>

            <li class="show-img-addImg" @click="callAddImg">
              <el-icon>
                <Plus/>
              </el-icon>
            </li>
          </ul>
          <el-button plain type="success" class="upload-button" @click="imgUpload">上传</el-button>
          <input v-show="false" multiple="multiple" ref="addImgInput" type="file" name="image" accept="image/*"
                 @change="addImg">
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import {ref, defineEmits, computed} from "vue";
import {ElMessage} from 'element-plus'
import axios from 'axios';
import {Plus, Picture, Select} from '@element-plus/icons-vue'

const emits = defineEmits(['SelectedPicture']);
//确定按钮
const SelectedPicture = () => {
  emits("SelectedPicture", SelectedMediaListUrl.value);
};


//打开对话框 图片
// const dialogTableVisible = ref(true)
const activeName = ref('已有素材')
//存放选取的图片
const imgArray = ref([])
//图片结果
const imgUrl = ref([])

//存放 添加图片按钮
const addImgInput = ref(null)

//调用 选择添加图片 方法
const callAddImg = () => {
  addImgInput.value.click()
}
//选择添加图片
const addImg = (e) => {
  const newImgs = Object.values(e.target.files)
  newImgs.forEach((img) => {
    //判断是不是图片类型
    if (img.type.split("/")[0] == 'image') {
      //读取文件对象
      let reader = new FileReader();
      //读取文件
      reader.readAsDataURL(img)
      reader.onload = () => {
        imgUrl.value.push(reader.result)
      }
      imgArray.value.push(img)
      ElMessage({
        showClose: true,
        message: img.name + '选择成功',
        type: 'success',
      })
    } else {
      ElMessage({
        showClose: true,
        message: img.name + '文件类型不是图片类型哦',
        type: 'warning',
      })
    }
  })
}
//图片上传服务器
const imgUpload = () => {
  imgArray.value.forEach((file) => {
    axios({
      method: 'post',
      url: '/api/upload',
      headers: {"Content-Type": "multipart/form-data"},
      data: {"files": file}
    }).then(function (response) {
      // console.log(file)
      console.log(response)
      ElMessage({
        message: '上传成功',
        type: 'success',
      })
    }).catch((err) => {
      console.log(err)
      ElMessage({
        message: '上传失败',
        type: 'error',
      })
    })
  })
}

//存放所有素材
const MediaList = ref([])

//获取所有图片
const GetMediaList = () => {
  axios.get("/api/query/Media/list").then((res) => {
    MediaList.value = res.data
    SelectedMediaList.value = MediaList.value.map(() => {
      return false
    })
    // console.log(MediaList.value)
  }).catch((err) => {
    console.log("获取图片失败", err)
  })
}
// 存放是否选中图片列表的状态
const SelectedMediaList = ref(MediaList.value.map(() => {
  return false
}))
// 存放选中的图片列表
const SelectedMediaListUrl = computed(() => {
  return MediaList.value.filter((value,index) => SelectedMediaList.value[index])
})

GetMediaList()

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
  padding: 10px 0px;
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

.show-img > ul > .show-img-addImg {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: 0.5s;
}

.show-img > ul > .show-img-addImg:hover {
  --hover-color: #80c5ff;
  color: var(--hover-color);
  border: 1px dashed var(--hover-color);
}

.upload-button {
  position: absolute;
  bottom: 0px;
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