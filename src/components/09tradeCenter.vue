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
                <strong style="color: red;">￥{{item.payable_amount}}</strong>
                <br>在线支付
              </td>
              <td align="left">{{item.add_time}}</td>
              <td align="left" v-if="item.status==1">待付款</td>
              <td align="left" v-else-if="item.status==2">已付款待发货</td>
              <td align="left">
                <a href="#/site/member/orderinfo/12" class>查看订单</a>
                <br>
                <a href="#/site/goods/payment/12" class>|去付款</a>
                <br>
                <a href="javascript:void(0)">|取消</a>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'tradeCenter',
    data:function(){
      return{
        //订单列表
          tradeList:[]
      }
    },
    methods:{},
    created() {
      
      this.$axios.get(`site/validate/order/userorderlist?pageIndex=1&pageSize=30`).then(res=>{
        console.log(res);
        this.tradeList = res.data.message
        
      })
    },
};
</script>

<style>
</style>


