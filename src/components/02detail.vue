<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number controls-position="right" v-model="buyCount" size="medium"  :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <!-- <router-link to="/shopcar">立即购买</router-link> -->
                                                <!-- <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy"><router-link to="/shopcar">立即购买</router-link></button> -->
                                                <!-- <button onclick="cartAdd(this,'/',0,'/cart.html');"  class="add"><router-link  @click.prevent="doThis" to="/shopcar">加入购物车</router-link></button> -->
                                                  <button  class="buy"><router-link :to="`/shopcar/`+goodsinfo.id">立即购买</router-link></button>
                                                <button   class="add"><router-link  @click.prevent="doThis" to="/shopcar">加入购物车</router-link></button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" style="display: block;" v-show="tabIndex==0" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容" v-model.trim="commentTxt" @keyup.enter="txtSub"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="txtSub">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | shortTime }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                      
                                          
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <Page @on-page-size-change="paszChange" @on-change="pageChange" :page-size-opts="[8,16,24]" :page-size="pageSize" placement="top" :total="totalcount"show-sizer  show-elevator  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                              <router-link :to="`/detail/`+item.id">     
                                                <img :src="item.img_url">
                                                </router-link> 
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                              <router-link :to="`/detail/`+item.id">     
                                            {{item.title}}
                                            </router-link> 
                                            <!-- </a> -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                             
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop><span>☝</span></BackTop>
    </div>
</template>

<script>
export default {
  name: "detail",
  data: function() {
    return {
      //每个商品的ID
      artID: "",
      // 商品详情
      goodsinfo: {},
      //   图片列表
      imglist: [],
      //   热卖商品
      hotgoodslist: [],
      // 购买数量
      buyCount: 1,
      // 商品介绍和商品评论tab索引
      tabIndex: 0,
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 评论内容
      comments: [],
      // 总评论数
      totalcount: 0,
      // 评论内容
      commentTxt: ""
    };
  },
  methods: {
    //初始化数据
    initData() {
      this.buyCount = 1;

      // console.log(this.$route.query.artID)  //第一种方式
      // this.artID = this.$route.query.artID

      // console.log(this.$route.params.artID); // 第二种方式
      this.artID = this.$route.params.artID;

      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          //   console.log(result);

          // 商品详情
          this.goodsinfo = result.data.message.goodsinfo;
          //   热卖商品
          this.hotgoodslist = result.data.message.hotgoodslist;
          //   图片列表
          this.imglist = result.data.message.imglist;
        });
      //调取评论方法
      this.getComments();
    },
    // 提交评论内容
    txtSub() {
      //   console.log(this.commentTxt);

      if (this.commentTxt == "") {
        this.$Message.warning("请输入评论,不能为空");
      } else {
        // 发送评论请求
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.commentTxt
          })
          .then(response=> {
            //   console.log(response);
              
            if (response.data.status == 0) {
              this.$Message.success(response.data.message);

              this.commentTxt = "";
              this.pageIndex =1;
              //调取评论方法
              this.getComments();
            } else {
            //   this.$Message.error("没有发表成功");
            }
          });
      }
    },
    //获取评论
    getComments() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          //   console.log(result);
          this.comments = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    },
    //页码改变
    pageChange(pageIn) {
      //   console.log(pageIn);
      this.pageIndex = pageIn;
      //调取评论方法
      this.getComments();
    },
    //每页条数改变
    paszChange(pasz) {
      //   console.log(pasz);
      this.pageSize = pasz;
      //调取评论方法
      this.getComments();
    }
  },
  created() {
    this.initData();
    // this.txtSub();
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      // $route(newVal, oldVal) {
      // console.log(newVal+'---'+oldVal);
      //   console.log("数据变了");

      this.initData();
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
}
.ivu-back-top span {
  font-size: 80px;
  color: purple;
}
</style>
