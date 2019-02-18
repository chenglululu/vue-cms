<template>
    <div>
        <h3>{{Count.title}}</h3>
        <hr>
        <div v-html="Count.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Count:{},
            id:this.$route.params.id
        }
    },
    created(){
        this.getDesc()
    },
    methods: {
        getDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                // console.log(result)
                this.Count=result.body.message[0]
            })
        }
    },
}
</script>

<style lang="less">
    h3{
        color: #226aff;
        font-size: 16px;
        margin: 15px 0;
        text-align: center;
    }
    img{
        width: 100%;
    }
</style>
