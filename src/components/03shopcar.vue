<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-for="(item, index) in goodsList" :key="item.id">
                  <td>
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="#9e9e9e"
                      @change="ab(index)"
                    ></el-switch>
                  </td>
                  <td>
                    <img :src="item.img_url" alt>
                    <span>{{item.title}}</span>
                  </td>
                  <td>{{item.sell_price}}</td>
                  <td>
                    <el-input-number v-model="item.buycount" :min="0"></el-input-number>
                  </td>
                  <td>{{item.buycount*item.sell_price}}</td>
                  <td>
                    <el-button type="primary" icon="el-icon-delete" @click="delteOne(item.id)"></el-button>
                  </td>
                </tr>

                <!-- 购物车为0  隐藏下面 -->
                <tr v-show="goodsList.length == 0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{ChooseNumber}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <!-- <router-link :to="`/order/`+selectId"> -->
              <!-- <router-link :to="{name:'order',query :{ids:selectId}}"> -->
              <router-link :to="{name:'order',params:{ids:selectId}}">
                <button class="submit">立即结算</button>
              </router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "shopcar",
  data: function() {
    return {
      //购物车商品数据
      goodsList: []
    };
  },
  methods: {
      ab(currentIndex){
        //   console.log(currentIndex);
        //   console.log(this.goodsList[currentIndex].isSelected);
          
      },
    delteOne(id) {
      this.$confirm("此操作将永久删除此购物车数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          //删除goodsList的数据 同事watch也会同步监听到
          this.goodsList.forEach((v, index) => {
            // console.log(v);
            // console.log(index);
            if (v.id == id) {
              this.goodsList.splice(index, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    //商品的ID
    let needId = "";
    //   console.log(this.$store.state.cartData);
    //   console.log(this.$store.getters.totalCount);
    for (const key in this.$store.state.cartData) {
      // console.log(key);
      // console.log(this.$store.state.cartData[key]);
      needId += "," + key;
    }
    //   console.log(needId.replace(",",""));
    needId = needId.replace(",", "");
    // console.log(needId);

    this.$axios
      .get(`http://111.230.232.110:8899/site/comment/getshopcargoods/${needId}`)
      .then(result => {
        // console.log(result);
        // 数据没有商品的数量 和 是否被选择 自行添加上数据内容
        result.data.message.forEach(val => {
          val.buycount = this.$store.state.cartData[val.id];
          val.isSelected = true;
        });
        // console.log(result);
        this.goodsList = result.data.message;
      });
  },
  // 计算属性
  computed: {
    ChooseNumber() {
      let num = 0;
      this.goodsList.forEach(val => {
        if (val.isSelected == true) {
          num += val.buycount;
        }
      });
      return num;
    },
    selectedPrice() {
      let price = 0;
      this.goodsList.forEach(val => {
        if (val.isSelected == true) {
          price += val.buycount * val.sell_price;
        }
      });
      return price;
    },
    //弄传到订单页的id
    selectId() {
      let ids = "";
      this.goodsList.forEach(val => {
        if (val.isSelected == true) {
          ids += val.id;
          ids += ",";
        }
      });
      ids = ids.slice(0, ids.length - 1);
      return ids;
    }
  },
  //使用watch 观察数据的改变
  watch: {
    goodsList: {
      handler: function(val, oldVal) {
        // console.log(val);
        let obj = {};
        // console.log(this.goodsList[0].isSelected);
        val.forEach(v => {
          obj[v.id] = v.buycount;
        });
        // console.log(obj);
        this.$store.commit("updateCarData", obj);
      },
      deep: true
    }
  }
};
</script>

<style >
tr img {
  width: 100px;
}
td > span {
  margin-left: 10px;
}

td:nth-of-type(2) {
  display: flex;
  align-items: center;
}
</style>
