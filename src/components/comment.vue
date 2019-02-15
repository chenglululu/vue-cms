<template>
    <div>
        <h4>评论内容</h4>
        <textarea placeholder="请输入要BB的内容(最多可以输入140个字)" maxlength="140" v-model="message"></textarea>
        <mt-button type="primary" size="large" @click="addMessage">发表评论</mt-button>
        <div v-for="(item, index) in comment" :key="index">
            <div class="yonghu">第{{index+1}}楼
                <span>用户：{{item.user_name}}</span> &nbsp;
                <span>发表时间：{{item.add_time | datastr}}</span>
            </div>
            <div class="content">{{item.content === "undefined" ? '此用户很懒，什么都没有输入':item.content}}</div>
        </div>
        <mt-button type="danger" plain size="large" @click="getMoreComment">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,
            comment:[],
            message:''
        }
    },
    created(){
        this.getcomment()
    },
    methods: {
        //获取评论数据
        //concat 拼接数组
        getcomment(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex)
            .then(result=>{
                // console.log(result)
                this.comment=this.comment.concat(result.body.message)
            })
        },
        //点击加载更多获取下一页数据
        getMoreComment(){
            this.pageindex++
            this.getcomment()
        },
        //点击发表按钮，发表评论内容
        addMessage(){
            if(this.message.trim().length === 0) return Toast("请输入评论的内容！")
            this.$http.post('api/postcomment/'+this.id,{content:this.message}).then(result=>{
                if(result.body.status===0){
                    //1.自己手动追加一个对象
                    // this.comment.unshift({
                    //     add_time:Date.now(),
                    //     content:this.message,
                    //     user_name:'咩咩'
                    // })
                    
                    //2.调用getcomment()方法
                    this.pageindex=1
                    this.comment=[ ]
                    this.getcomment()
                    this.message=''
                    Toast('发表成功！')
                }else{
                    Toast('发表评论失败！')
                }
            })
        }
    },
    props:['id']
}
</script>
<style lang="less">
    .yonghu{
        padding: 10px 0;
        background-color: #ccc;
        font-size: 13px;
    }
    .content{
        padding: 5px 0;
        text-indent: 2em;
        background-color: #fff;
        font-size: 14px;
    }
</style>
