<template>
    <div>
        <h3>{{imgInfo.title}}</h3>
        <div class="time">
            <span>发表时间：{{imgInfo.add_time | datastr}}</span>
            <span>点击：{{imgInfo.click}}次</span>
        </div>
        <hr>
        <!-- 图片部分 -->
        <img class="preview-img" v-for="(item, index) in list" 
        :src="item.src" height="100" 
        @click="$preview.open(index, list)"
        :key="item.src"  />

        <!-- 文字部分 -->
        <div class="content" v-html="imgInfo.content"></div>
        <!-- 评论子组件 -->
        <combox :id="this.id"></combox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            imgInfo:{ },
            list:[ ]
        }
    },
    created(){
        this.getimageInfo()
        this.getImages()
    },
    methods: {
        getimageInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                // console.log(result)
                this.imgInfo=result.body.message[0]
            })
        },
        getImages(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                console.log(result)
                result.body.message.forEach(item => {
                    item.w = 600
                    item.h = 400
                });
                this.list = result.body.message
            })
        }
    },
}
</script>

<style lang="less">
    h3{
        color: red;
        font-size: 16px;
        text-align: center;
    }
    .time{
        display: flex;
        justify-content: space-between;
        color: #226aff;
        font-size: 13px;
        margin-bottom: 3px;
    }
    .content{
        font-size: 15px;
    }
    img{
        margin: 5px 10px;
        box-shadow: 0 0 8px rgb(95, 92, 92);
    }
</style>
