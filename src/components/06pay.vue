<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area+orderInfo.address}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <!-- <canvas width="300" height="300"></canvas> -->
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId"
                    :options="{ size: 200 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//导入生成的二维码
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  name: "pay",
  data: function() {
    return {
      orderId: 0,
      // 订单信息
      orderInfo: {}
    };
  },
  //局部注册
  components: {
    //   js中对象的属性名 不能使用js语法编写 (早期的时候)
    // es6中支持动态生成属性名
    [VueQrcode.name]: VueQrcode
  },
  //上面周期函数
  created() {
    // console.log(this.$route.params.orderid);

    //获取订单号id
    this.orderId = this.$route.params.orderid;

    this.$axios
      .get(`site/validate/order/getorder/${this.orderId}`)
      .then(res => {
        // console.log(res);
        // console.log(res.data.message[0].status);

        this.orderInfo = res.data.message[0];
      });
    // 开启定时器 间隔询问服务器订单的状态
  this.interId =  setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.orderId}`)
        .then(res => {
          //订单付款成功的话  状态为2
          if (res.data.message[0].status === 2) {
            this.$Message.success("恭喜你,付款成功");
            // this.$router.push("/paysuccess");
            this.$router.push({name:"paysuccess"})
           
          }
        });
    }, 1500);
  },
  //生命周期函数  被销毁之后触发
  destroyed() {
     clearInterval(this.interId);
  },
};
</script>


<style>
</style>
