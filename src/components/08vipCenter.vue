<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <a href="/user/center/index.html">会员中心</a>&gt;
              <a href="/user/center/index.html">{{currentName}}</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a href="/user/center/avatar.html" class="img-box">
                    <!-- <i class="iconfont icon-user-full"></i> -->
                    <img src="../assets/timg.gif" alt>
                  </a>
                  <h3>ivanyb</h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <!-- <a href="#/site/member/orderlist" class> -->
                          <!-- <i class="iconfont icon-arrow-right"></i>交易订单 -->
                          <router-link to="/vipCenter/tradeCenter">
                            <i class="iconfont icon-arrow-right"></i>
                            交易订单
                          </router-link>
                          <!-- </a> -->
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>账户资料
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>修改密码
                          </a>
                        </p>
                        <p>
                          <a @click="logout" href="javascript:void(0)">
                            <i class="iconfont icon-arrow-right"></i>退出登录
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "vipCenter",
  data: function() {
    return {
       currentName: ""
    };
  },
  methods: {
    logout() {
      this.$confirm("请问确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.get(`site/account/logout`).then(res => {
            //   console.log(res);
            if (res.data.status === 0) {
              this.$Message.success(res.data.message);
              this.$router.push("/index");
              //修改vuex的登录的字段
              this.$store.commit("changeLog", false);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请继续购物"
          });
        });
    }
  },
  // 使用侦听器
  watch: {
    $route(val, oldVal) {
      console.log(val);
      this.currentName = this.$route.meta.currentName;
    }
  },
  created(){
    // console.log(this.$route);
    // console.log(this.$route.meta.currentName);
     this.currentName = this.$route.meta.currentName;
  }
};
</script>

<style>
.sub-tit {
  padding-top: 0;
}
.avatar-box {
  height: auto;
}
</style>

