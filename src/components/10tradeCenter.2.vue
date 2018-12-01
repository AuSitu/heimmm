<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr v-for="(item, index) in tradeList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>在线支付
              </td>
              <td align="left">{{item.add_time | shortTime}}</td>
              <td align="left">{{item.statusName}}</td>
              <!-- <td align="left" v-else-if="item.status==2">已付款待发货</td> -->
              <td align="left">
                <!-- <a href="#/site/member/orderinfo/12" class> -->
                <!-- <router-link :to="'/vipCenter/tradeDetails/'+item.id">查看订单</router-link> -->
                <!-- <router-link :to="{name:'tradeDetails',query:{orderid:item.id}}">查看订单</router-link> -->
                <router-link :to="{name:'tradeDetails',params:{orderid:item.id}}">查看订单</router-link>

                <!-- </a> -->
                <br>
                <!-- <a v-show="item.status==1" href="#/site/goods/payment/12" class> -->
                <!-- <router-link :to="'/pay/'+item.id">|去付款</router-link> -->
                <router-link
                  v-show="item.status==1"
                  :to="{name:'pay',params:{orderid:item.id}}"
                >|去付款</router-link>
                <!-- </a> -->
                <br>
                <a href="javascript:void(0)">|取消</a>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageIndexChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tradeCenter",
  data: function() {
    return {
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 总条数
      totalcount: 0,
      //订单列表
      tradeList: []
    };
  },
  methods: {
    pageIndexChange(pageIndex) {
      console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getOrderList();
    },
    pageSizeChange(pageSize) {
      console.log(pageSize);
      // 保存数据
      this.pageSize = pageSize;
      // 重置到第一页 方便用户查看
      this.pageIndex = 1;
      // 重新获取数据
      this.getOrderList();
    },
    //获取订单的方法
    getOrderList() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res);
          this.tradeList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style>
td a {
  /* display: block; */
}
</style>


