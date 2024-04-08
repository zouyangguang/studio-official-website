<template>
  <!--主题标题-->
  <ContextMenu :menu="[{'label':'设置标题'}]" @select="choose1=$event.label;console.log(choose1)">


  <div class="IndexMainContentHeadline ContextMenu animate__animated  animate__fadeInLeft"
       :class="isPC?'':'IndexMainContentHeadlineMove'">
    <!--Log-->
    <div :style="`background-image: url(`+Headline.backgroundImage+`)`">
      <img alt="log" :src="Headline.logUrl">
    </div>
    <div>
      <!--标题-->
      <h1 :style="isPC?'':'margin: 5px auto;text-align: center;'">{{ Headline.headline }}</h1>
      <!--介绍-->
      <p :style="isPC?'':'font-size: 1em;text-align: center;'">{{ Headline.introduce }}</p>
    </div>
  </div>
  <!--按钮-->
  <div :style="isPC?'':'display: none'">
    <div :style="Headline.btnBackground" v-if="Headline.btn!==''"
         class="IndexMainContentHeadline_btn ContextMenu animate__animated  animate__fadeInRight">
      {{ Headline.btn }}
    </div>
  </div>
  </ContextMenu>
</template>

<script setup>

import {defineProps,ref} from "vue";
import ContextMenu from "@/components/ContextMenu.vue";

const choose1 = ref("")
defineProps({
  Headline: Object,
  isPC: Boolean
})
</script>

<style scoped>

.IndexMainContentHeadline {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: left;
  color: white;
  width: 65%;
  height: 15%;
  left: 5%;
  container-type: inline-size;

}

.IndexMainContentHeadline div:nth-child(1) {
  height: 50%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 160% auto;
  border-radius: 100%;
  margin-right: 2%;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
}

.IndexMainContentHeadline img {
  width: 70%;
}

.IndexMainContentHeadline div:nth-child(2) {
  width: 100%;
}

.IndexMainContentHeadline div:nth-child(2) h1 {
  /* cqw容器查询单位*/
  font-size: 5cqw;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 5px 2px 5px rgb(0, 11, 35);
  text-align: left;
}

.IndexMainContentHeadline div:nth-child(2) p {
  font-size: 2.5cqw;
}


.IndexMainContentHeadline_btn {
  position: absolute;
  right: 5%;
  width: 25%;
  height: 7%;
  margin-top: 1.5%;
  min-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 1cqw;
  text-align: center;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  background: linear-gradient(270deg, rgba(2, 3, 67, 0.90) 17%, rgba(255, 255, 255, 0.00) 100%);
}

.IndexMainContentHeadline_btn:hover {
  box-shadow: 0 0 20px 3px rgba(222, 215, 215, 0.5);
}


.IndexMainContentHeadlineMove {
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  text-align: center !important;
  align-items: center;
  animation: fadeInDown;
  animation-duration: 1s;
}

/*@media screen and (max-width: 900px) {*/

/*  .IndexMainContentHeadline_btn {*/
/*    display: none;*/
/*  }*/

/*  .IndexMainContentHeadline {*/
/*    width: 100%;*/
/*    left: 0;*/
/*    display: flex;*/
/*    flex-direction: column;*/
/*    text-align: center;*/
/*    align-items: center;*/
/*    animation: fadeInDown;*/
/*    animation-duration: 1s;*/
/*  }*/

/*  .IndexMainContentHeadline div h1 {*/
/*    margin: 5px 0;*/
/*    font-size: 1.5em !important;*/
/*  }*/

/*  .IndexMainContentHeadline div p {*/
/*    font-size: 1em !important;*/
/*  }*/

/*  .IndexMainContentHeadline div:nth-child(1) {*/
/*    height: 30%;*/
/*  }*/

/*}*/

</style>

<style>
:root {
  --border-color: #1b469d;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.App {
  height: 100vh;
}


.App-aside::-webkit-scrollbar {
  width: 5px;
}

.App-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}
/*------*/
body {
  overflow: hidden;
}

img {
  width: 100px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: "微软雅黑", system-ui;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

.layout_backdrop {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-slide {
  overflow: hidden;
}

.layout_content {
  padding-top: 40px;
  width: 100%;
  margin-top: 0vw;
  aspect-ratio: 16 / 10;
  position: relative;
  container-type: inline-size;
}

.boxScrollbar {
  overflow-y: auto;
}

body::-webkit-scrollbar {
  width: 0.5em;
}

body::-webkit-scrollbar-thumb {
  background-color: #8a8a8a;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #6c6c6c;
}

.boxScrollbar::-webkit-scrollbar {
  width: 0.5cqw;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.boxScrollbar::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
  background-color: rgb(185, 185, 185);
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}

.boxScrollbar::-webkit-scrollbar-thumb:hover {
  background-color: white;
}

.slideNext {
  position: absolute;
  bottom: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  animation: slideNex 1s alternate infinite linear;
  z-index: 10;
}

/*@media screen and (max-width: 900px) {*/
/*  .layout_backdrop {*/
/*    min-width: 100%;*/
/*    min-height: 100%;*/
/*    align-items: flex-start;*/
/*  }*/

/*  .layout_content {*/
/*    height: 90%;*/
/*    max-height: 90%;*/
/*    width: auto;*/
/*    min-width: 320px;*/
/*    max-width: initial;*/
/*    aspect-ratio: 490 / 667;*/
/*    position: relative;*/
/*  }*/
/*}*/
</style>