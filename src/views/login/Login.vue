<template>
  <div class="login-page container">
    {{GLOBAL.url}}
    <div class="login-box">
      <img src="../../assets/imgs/logo.svg" alt="">
      <el-form ref="loginForm" :model="loginForm">
      <el-form-item>
        <el-input v-model="loginForm.email" prefix-icon="iconfont icon-account icon-smallfix"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password" prefix-icon="iconfont icon-tiaoshi icon-smallfix" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.axios
        .post(this.GLOBAL.baseUrl + "/login", this.qs.stringify(this.loginForm))
        .then(res => {
          if (res.status == 200) {
            alert(res.data.msg);
            // sessionStorate 窗口关闭, token 就会消失
            window.sessionStorage.setItem("cle_api_token", res.data.cle_api_token);
            // 跳转路由
            this.$router.push("/home")
          }
        })
        .catch(err => {
            alert(err)
        })
    }
  }
};
</script>
<style>
.login-page .login-box {
  position: absolute;
  width: 30%;
  min-width: 200px;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-page .login-box img {
  position: relative;
  width: 138px;
  left: 50%;
  transform: translate(-50%);
  padding: 30px 0;
}
</style>
