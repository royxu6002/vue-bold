<template>
  <div class="login-page container">
    <h5>Login</h5>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
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
<style></style>
