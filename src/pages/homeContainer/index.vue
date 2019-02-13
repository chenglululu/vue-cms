<template>
    <div>
        <!-- 轮播图部分 -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item, index) in swipes" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>

        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newList">
		                    <img src="@/images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="@/images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="@/images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="@/images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="@/images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="@/images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            swipes:[]
        }
    },
    created(){
        this.getSwipe()
    },
    methods: {
        getSwipe(){
            //获取轮播图数据
            this.$http.get("api/getlunbo").then(result=>{
                if(result.body.status === 0){
                    this.swipes = result.body.message;
                }else{
                    Toast('获取数据失败')
                }
                // console.log(result)
            })
        }
    },
}
</script>
<style lang="less">
    .mint-swipe{
        height: 200px;
        // background-color: #acc;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img{
            width: 50px;
            height: 50px;
        }
        .mui-media-body{
            font-size: 13px !important;
        }
    }
</style>


