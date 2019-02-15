<template>
    <div class="newsinfo">
        <h1>{{ newsinfo.title }}</h1>
        <hr>
        <div class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | datastr }}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </div>
        <div class="content" v-html=" newsinfo.content "></div>
        <combox :id="this.id"></combox>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            id:this.$route.params.id,
            newsinfo:''
        }
    },
    created(){
        this.getnewsinfo()
    },
    methods: {
        getnewsinfo(){
            this.$http.get('api/getnew/'+this.id).then((result)=>{
                // console.log(result)
                if(result.body.status===0){
                    this.newsinfo = result.body.message[0]
                }else{
                    Toast('数据获取失败！')
                }
                
            })
        }
    },
}
</script>
<style lang="less">
    .newsinfo{
        padding: 0 4px;
        h1{
            color: red;
            font-size: 16px;
            text-align:center;
        }
        .subtitle{
            color: #226aff;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
   
</style>
