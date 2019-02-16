<template>
    <div class="content">
        <div class="goods" v-for="(item, index) in goodsinfo" :key="index" @click="goodsInfo(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div class="info-one">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="info-two">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodsinfo:[],
            pageindex:1
        }
    },
    created(){
        this.getgoodslist()
    },
    methods: {
        getgoodslist(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                console.log(result)
                this.goodsinfo =this.goodsinfo.concat(result.body.message) 
            })
        },
        getMore(){
            this.pagesindex++,
            this.getgoodslist()
        },
        goodsInfo(id){
            this.$router.push('/home/goodsInfo/'+id)
        }
    },
}
</script>
<style lang="less" scoped>
    .content{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 5px;
        background-color: #fff;
        .goods{
            width: 49%;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
            margin: 5px 0;
            padding: 2px;
            min-height: 293px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            .title{
                font-size: 15px;
            }
            .info{
                background-color: #eee;
                padding: 10px;
                .info-one{
                    .now{
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old{
                        font-size: 13px;
                        margin-left: 10px;
                        text-decoration: line-through;
                        color: #aaa;
                    }
                }
                .info-two{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #aaa;
                }
            }
        }
    }
</style>
