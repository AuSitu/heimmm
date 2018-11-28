<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50" v-model.trim="userName">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16" v-model.trim="password">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
                        </div>
                    </div>
                </div>
            </div>
        </div>


   </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.userName == "" || this.password == "") {
        this.$Message.warning("用户名或密码不能为空!");
      } else {
        this.$axios
          .post(`site/account/login`, {
            user_name: this.userName,
            password: this.password
          })
          .then(res => {
            // console.log(res);
            if (res.data.status == 0) {
              this.$Message.success(res.data.message);
              //登录成功修改vuex中的数据
              this.$store.commit("changeLog", true);
              // 后退一步记录，等同于 history.back()
              this.$router.go(-1);
            } else {
              this.$Message.error(res.data.message);
            }
          });
      }
    }
  }
};
</script>

<style>
</style>
