<template>
  <div class="MainUpdate">
    <h1 style="display: flex;align-items: center;">
      <el-icon style="margin-right: 10px;">
        <UploadFilled/>
      </el-icon>
      上传素材
    </h1>
    <el-tabs v-model="activeName" class="demo-tabs MainUpdate-tabs">

      <!--文字-->
      <el-tab-pane label="文字" name="txt">
        <el-input
            v-model="textarea"
            :autosize="{ minRows: 20, maxRows: 20}"
            type="textarea"
            placeholder="请输入内容"
            resize="none"
        />
        <el-button plain type="success" class="upload-button" @click="textUpload">上传</el-button>
      </el-tab-pane>
      <!--文字-->

      <!--图片-->
      <el-tab-pane label="图片" name="img">
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
                  fit="cover"
              />
            </li>

            <li class="show-img-addImg" @click="callAddImg">
              <el-icon>
                <Plus/>
              </el-icon>
            </li>
          </ul>
          <el-button plain type="success" class="upload-button" @click="imgUpload">上传</el-button>
        </div>
        <input v-show="false" multiple="multiple" ref="addImgInput" type="file" name="image" accept="image/*"
               @change="addImg">

      </el-tab-pane>
      <!--图片-->


      <!--视频-->
      <el-tab-pane label="视频" name="video" class="video">

        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>上传视频</span>
              <el-button style="margin-top:0" plain type="success" @click="videoUpload" class="upload-button">上传服务器</el-button>
            </div>
          </template>

          <div>
            <div v-show="!showVide" class="upload-a-video">
              <el-icon>
                <Plus/>
              </el-icon>
              <el-tooltip class="box-item" effect="dark" content="点击或拖拽上传" placement="bottom">
                <input title="" ref="addVideoInput" type="file" @change="addVideo" name="*" accept="video/*">
              </el-tooltip>
            </div>
            <video v-show="showVide" :src="videoDomSrc"  controls autoplay></video>
          </div>
          <template v-if="showVide" #footer>
            <el-button plain @click="addVideoInput.click()" type="success">重新选择视频</el-button>
          </template>
        </el-card>

      </el-tab-pane>
      <!--视频-->
    </el-tabs>


  </div>
</template>

<script setup>
import {UploadFilled, Plus} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {ref, inject} from "vue";


// 获取全局对象
const global = inject('global')
//MainUpdate-tabs  当前选项卡
const activeName = ref('video')
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
  // imgArray.value.forEach((file) => {
  //   global.axios({
  //     method: 'post',
  //     url: 'http://127.0.0.1:5000/upload-img',
  //     headers: {"Content-Type": "multipart/form-data"},
  //     data: {"file": file}
  //   }).then(function (response) {
  //     console.log(response)
  //   })
  // })
  ElMessage({
    showClose: true,
    message: '上传成功',
    type: 'success',
  })
}


const addVideoInput = ref(null)
//显示视频路径
const videoDomSrc = ref('')
//保存存放要上传的视频文件
const videArray = ref('')
//控制显示隐藏视频
const showVide = ref(false)
/*
* 选择视频
* */
const addVideo = (e) => {
  let selecttType = e.target.files[0].type.split("/")[0]
  if (selecttType == "video") {
    let url = window.webkitURL.createObjectURL(e.target.files[0])
    videoDomSrc.value = url //显示视频
    videArray.value = e.target.files[0]
    showVide.value = true
    ElMessage({
      showClose: true,
      message: '选择成功',
      type: 'success',
    })
  } else {
    ElMessage({
      showClose: true,
      message: '请选择视频类型的文件哦',
      type: 'warning',
    })
  }

}
const videoUpload=()=>{
  ElMessage({
    showClose: true,
    message: '视频上传成功',
    type: 'success',
  })
}

//文本内容
const textarea = ref('')
//文本上传
const textUpload = () => {
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
}


</script>

<style scoped>
* {
  user-select: none;
}

/*最大合作*/
.MainUpdate {
  padding: 10px;
}

/*选项div*/
.MainUpdate-tabs {
  margin-top: 20px;
}

/*上传按钮*/
.upload-button {
  margin-top: 20px;
  float: right;
}

/*图片选项卡*/
.show-img > ul {
  list-style: none;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 325px;
  max-height: 70dvh;
  border: 1px solid var(--border-color);
  overflow-y: auto;
  padding: 10px 0px;
  transition: 0.5s;
}

.show-img > ul::-webkit-scrollbar {
  width: 5px;
}

.show-img > ul::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}

.show-img > ul::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}

.show-img > ul > li {
  width: 140px;
  height: 140px;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
}

.show-img > ul > .show-img-addImg {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed var(--border-color);
  transition: 0.5s;
}

.show-img > ul > .show-img-addImg:hover {
  --hover-color: #80c5ff;
  color: var(--hover-color);
  border: 1px dashed var(--hover-color);
}

/*视频上传*/
.upload-a-video {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5dvmin;
  position: relative;

}

.upload-a-video > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.video .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.video video{
  width: 100%;
  height: 100%;
}



</style>

