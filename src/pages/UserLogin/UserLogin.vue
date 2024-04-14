<template>
  <div class="UserLogin">
    <div class="shell">
      <div class="container b-container">
        <form action="" method="" class="form">
          <h2 class="form_title title">登入账号</h2>
          <input type="text" class="form_input" v-model="data.memberName" placeholder="成员姓名">
          <input type="password" class="form_input" v-model="data.password" placeholder="密码">
          <button class="form_button button submit" @click="login">SIGN IN</button>
        </form>
      </div>

      <div class="switch">
        <div class="switch_circle"></div>
        <div class="switch_circle switch_circle-t"></div>
        <div class="switch_container">
          <h2 class="switch_title title" style="letter-spacing: 0;">长远工作室</h2>
          <p class="switch_description description">欢迎使用长远工作室后台管理系统</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ElMessage} from "element-plus";
import router from "@/plugins/router";
import {ref} from "vue";
import axios from "axios";

const data = ref({
  memberName: "林",
  password: "123456"
})
//用户登录
const login = async () => {
  if (IsEmpty(data.value)) {
    // ElMessage({
    //   message: '登录成功',
    //   type: 'success',
    // })
    // router.push("/")
    await axios.post("/changyuan/user/login", data.value).then((res) => {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      localStorage.setItem("login",JSON.stringify(res.data.data))
      router.push("/")
    }).catch((err) => {
      ElMessage({
        message: '登录失败',
        type: 'warning',
      })
      console.log("登录成功失败", err)
    })

  }
}

// 判断输入框 是否为空
const IsEmpty = (Obj) => {
  const temp = ref(true)
  for (let key in Obj) {
    if (key !== 'memberId') {
      if (Obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') === "") {
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

</script>

<style scoped>
.UserLogin {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}


.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}


.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  color: black;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}


.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}


.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}


.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>