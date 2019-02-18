<template>
  <div class="goodsinfo">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="isshow" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item, index) in swipe" :key="index">
                    <img :src="item.src">
            </mt-swipe-item>
        </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{price.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span >市场价：<span class="old">￥{{price.market_price}}</span></span>
            <span>销售价：<span class="now">￥{{price.sell_price}}</span></span>
          </div>
          <div class="goodsNumber">
            <span>购买数量：</span>
            <input type="button" value="-" @click="buyCount >=2 && buyCount--">
            <input type="number" v-model="buyCount" @change="filterMaxcount">
            <input type="button" value="+" @click="buyCount < price.stock_quantity && buyCount++">
          </div>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToshopcar" >加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{price.goods_no}}</p>
          <p>库存情况：{{price.stock_quantity}}件</p>
          <p>上架时间：{{price.add_time | datastr }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getDesc(price.id)">图文介绍</mt-button>
        <br>
        <mt-button type="danger" size="large" plain @click="getComment(price.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      buyCount:1,
      swipe:[], //轮播图
      price:{}, //商品名称和参数
      isshow:false
    };
  },
  created(){
      this.getlunbotu()
      this.getPrice()
  },
  methods: {
      getlunbotu(){ 
        //获取轮播图
          this.$http.get('api/getthumimages/'+this.id).then(result=>{
            //   console.log(result)
              this.swipe=result.body.message
          })
      },
      getPrice(){  
        //获取价格以及参数
          this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
              // console.log(result)
              this.price=result.body.message[0]
          })
      },
      filterMaxcount(){ 
        //input text限制输入的最大值
            if(this.buyCount > this.price.stock_quantity){
                this.buyCount = this.price.stock_quantity
            }
      },
      getDesc(id){  
        //利用编程式导航，通过编写代码来实现页面的跳转
        this.$router.push('/home/goodsDesc/'+this.id)
      },
      getComment(id){
        this.$router.push('/home/goodsComment/'+this.id)
      },
      addToshopcar(){
        this.isshow=!this.isshow
        this.$store.commit('addTocar',{
          id:this.id,
          count:this.buyCount,
          prices:this.price.sell_price,
          selected:true
        })
      },
      beforeEnter(el){
        el.style.transform = "translate(0,0)"
      },
      enter(el,done){
        el.offsetWidth;
        //获取小球在页面中的位置
        let ball = this.$refs.ball.getBoundingClientRect()
        //获取徽标在页面中的位置 也就是小球最终移动到的位置
        let badge = document.getElementById('badge').getBoundingClientRect()
        //获取小球移动到徽标的距离
        let xDist = badge.left - ball.left
        let yDist = badge.top - ball.top
        el.style.transform=`translate(${xDist}px,${yDist}px)`
        el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)"
        done()
      },
      afterEnter(el){
        this.isshow=!this.isshow
      },

  },
};
</script>
<style lang="less">
.goodsinfo{
  position: relative;
    .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color:red;
      z-index: 99;
      position: absolute;
      top: 305px;
      left: 137px;
    }
    .mui-card {
        .mint-swipe{
            height: 150px;
            text-align: center;
        }
        img{
            height: 100%;
        }
        .price{
          span{
              color: #8f8f94;
                .old{
                    text-decoration: line-through;
                    margin-right: 5px;
                }
                .now{
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }
          }
        }
        .goodsNumber{
            margin: 10px 0;
            display: flex;
            align-items: center;
            input{
                width: 30px;
                height: 30px;
                padding: 0;
                margin: 0;
                text-align:center;
                border-radius: 0;
                color: #616164;
                &[type="number"]{
                    width: 40px;
                    border-left: 0;
                    border-right: 0;
                    font-size: 14px;
                }
                &[type="button"]{
                    background-color: #eee;
                }
            }
        }
    }
      .mui-card-footer {
        display: flex;
        justify-content: space-between;
        display: block;
        margin: 10px 0;
      }
  }
  
</style>
