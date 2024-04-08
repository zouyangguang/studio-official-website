<template>
<div class="LongTermCreationProductsList">
<!--  <div>-->
<!--    <div style="display: flex;align-items: center; justify-content: space-between;">-->
<!--      <div class="headline"><p style="background-color: #84c1ff"></p> 产品信息</div>-->
<!--      <el-button style="margin-right: 15px" type="success" plain>添加</el-button>-->
<!--    </div>-->
<!--    <el-table border :data="tableData">-->
<!--      <el-table-column prop="productName" label="产品名称"/>-->
<!--      <el-table-column prop="productIntroduceList" label="产品介绍"/>-->
<!--      <el-table-column prop="honorImgUrlList" label="荣誉图地址" min-width="110"/>-->
<!--      <el-table-column prop="platformImgUrlList" label="平台二维码地址"/>-->
<!--      <el-table-column prop="productLogoUrl" label="产品图标地址"/>-->
<!--      <el-table-column label="编辑" fixed="right" width="100">-->
<!--        <template #default>-->
<!--          <el-button-->
<!--              link-->
<!--              type="primary"-->
<!--              size="small"-->
<!--          >-->
<!--            设置66666666666666666666666-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->

</div>
</template>

<script setup>
import {ref} from "vue";

// const tableData = ref([
//   {
//     "productName": "实习宝(测试)",
//     "productIntroduceList": ["“实习宝”是一款专业的企业实践管理系统 ，借助5G时代和高速发展的软件技术，为学生和指导老师提供了统一便捷的协作平台。"
//       , "本项目对职业教育中学生的实习期进行了全 流程化管理，以方便高效为目标，以解决实际问题为己任，以数字化发展为契机开启职 业教育数字赋能之路。"
//       , "本项目深入实习一线调研，功能直击实习痛 点，可大幅度提升技工院校实习管理团队的工作效率，辅助未来决策，具有极高的推广 应用价值。"],
//     "honorImgUrlList": ["/img/b创造奖状.png", "/img/b创造奖状.png", "/img/b创造奖状.png", "/img/b创造奖状.png"],
//     "platformImgUrlList": ["/img/b创造实习宝教师端.png", "/img/b创造实习宝学生端.png"],
//     "productLogoUrl": "/img/b创造long1.png"
//   },
//   {
//     "productName": "A+牧草迷宫(测试)",
//     "productIntroduceList": ["【牧草迷宫】坐落在广东省中山市五桂山🌿 ，占地面积4万平方米。迷宫路径曲折迂回，身在其中，放眼皆是绿野，身心舒畅。穿梭 在牧草之间，不仅感受大自然的清新气息，还颇具挑战性！"
//       , "“A+牧草迷宫”小程序顺应需求，应时而生 ，帮助园区负责人快速生成景点打卡二维码，玩家通过寻找“迷宫”中的打卡点，用手 机扫描二维码进行打卡，并进行实时显示，其时间最短的玩家将获得园区奖励."
//       , "“A+牧草迷宫”后台管理系统，简洁明快的 同时管理多个项目，并能实时的精确的查看玩家进度以及排名！"],
//     "productLogoUrl": "/img/b创造long2.png"
//   },
//   {
//     "productName": "雏鹰(测试)",
//     "productIntroduceList": [" “雏鹰”是一款专业的学生成长激励系统，为所有老师提供统一的学生记分平台，为学生和家长提供统一的纵览学生成长历程平台。一键动态生成图表，从多维度综合评价学生在校情况，对控制流失能起到积极作用，学生评优评先更加客观公平，对学生有较强的激励作用。", "主要创新点", "2、教学线与学管线,双线合力,教学与育人并举", "3、学生成长历程完整,随时可查", "4、学生荣誉系统,给予学生充足的成就感"],
//     "honorImgUrlList": ["img/b雏鹰奖状1.png"],
//     "productLogoUrl": "/img/b创造long3.png"
//   }
// ])
</script>

<style scoped>
.LongTermCreationProductsList{
  padding: 10px 0;
}
</style>