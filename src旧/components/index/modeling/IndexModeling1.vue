<template>
  <div class="MainContent_slide1">
    <!-- PC端-->
    <ContextMenu style="display: block" :menu="[{'label':'上传本地视频'},{'label':'更换视频'}]"
                 @select="select($event)">
      <video :style="isPC?'':'display: none'" id="MainContent_slide1_video" src="@/assets/img/官网视频PC.mp4" controls
             autoplay muted loop></video>
    </ContextMenu>

    <!-- PC端结束-->

    <!--移动端-->
    <ContextMenu :menu="[{'label':'更改背景'},{'label':'更改标题'},{'label':'更改图片'}]" @select="select($event)">
      <div :style="isPC?'':'display: flex'" class="MainContent_slide1_move ContextMenu">
        <p class="animate__animated animate__fadeInUp" style="animation-duration: 2s;">无限热爱</p>
        <img class="animate__animated animate__fadeIn" style="animation-delay: 1s ;animation-duration: 2s;" alt=""
             src="@/assets/img/a首页1移动端素材.png">
        <p class="animate__animated animate__fadeInUp" style="animation-delay: 2s; animation-duration: 2s">无限可能</p>
      </div>
    </ContextMenu>
    <!--移动端结束-->

    <div class="MainContent_slide1_D">
      <ContextMenu :menu="[{'label':'更改背景'},{'label':'更改文字'}]" @select="select($event)">
        <p :style="isPC?'':'display: none'">向下滚动了解更多</p>
      </ContextMenu>
      <img alt="" class="slideNext" src="@/assets/img/a下一个图标.png">
    </div>

    <VideoDatabase :videoDatabase="videoDatabase" @hidden="videoDatabase=false"></VideoDatabase>
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue'
import ContextMenu from "@/components/ContextMenu.vue";
import VideoDatabase from "@/components/MaterialLibrary/VideoDatabase.vue";


const choose1 = ref("")

defineProps({
  isPC: Boolean,
})

const videoDatabase = ref(false)
const select = (e) => {
  choose1.value = e.label
  console.log(e)
  if (choose1.value === "更换视频") {
    videoDatabase.value = true
  }
}


</script>

<style scoped>

/*1*/
.MainContent_slide1 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  position: relative;
}

.MainContent_slide1 video {
  pointer-events: none;
  min-height: 100%;
  min-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.MainContent_slide1_move {
  padding: 5vw 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("@/assets/img/b创造1b.png") no-repeat center top;
  background-size: auto 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 130%;
  box-sizing: border-box;
  font-weight: bolder;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.302);
  display: none;
}

.MainContent_slide1_move img {
  width: 80%;
  max-width: 50%;
  margin: 20px 0;
}

.MainContent_slide1_D {
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(45, 45, 45, 0.53));
}

.MainContent_slide1_D p {
  padding: 0;
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-bottom: 35px;
  border-radius: 50px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
  background: url("@/assets/img/a首页2b.png") center center no-repeat;
  background-size: 290px 100px;
  color: white;
  cursor: pointer;

}

/*@media screen and (max-width: 900px) {*/
/*  .MainContent_slide1_D p , #MainContent_slide1_video{*/
/*    display: none;*/
/*  }*/
/*  .MainContent_slide1_move {*/
/*    display: flex;*/
/*  }*/
/*}*/


/*--------*/
</style>


