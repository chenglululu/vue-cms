<template>
    <div>
        <!-- 应用这个会出现的问题：
            1.默认是全屏的  删除mui-fullscreen类
            2.引入js报错   是严格模式的原因，修改babelrc略过mui.js文件
            3.第一次开启服务器进入页面的时候无法滚动 初始化scroll控件 (切换到移动端的时候没有刷新到页面，默认还是在客户端)
            4. tab-bar 无法切换    修改mui-tab-item类名  -->
            <!-- tab-top部分 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id===0 ? 'mui-active' : '']" 
                    @click="getimages(item.id)"
                    v-for="(item, index) in ptotoInfo" :key="index">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片区域 -->
        <ul class="photoList">
            <router-link v-for="item in list" :key="item.id" :to="'/home/imageInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="title">
                    <p>{{item.title}}</p>
                    <p>{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '@/lib/mui/js/mui.js'
export default {
    data() {
        return {
           ptotoInfo:[],
           list:[ ]
        }
    },
    created(){
        this.getphotoInfo()
        this.getimages(0)
    },
    mounted(){
        //初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getphotoInfo(){
            this.$http.get('api/getimgcategory').then(result=>{
                // console.log(result)
                result.body.message.unshift({
                    title:"全部",
                    id:0
                })
                 this.ptotoInfo=result.body.message
            })
        },
        getimages(cateId){
            this.$http.get('api/getimages/'+cateId).then(result=>{
                // console.log(result)
                this.list=result.body.message
            })
        }
    },
}
</script>
<style lang="less" scoped>
    *{
        touch-action: pan-x;    //解决passive报错
    }
    .photoList{
        li{
            box-shadow: 0 0 8px #eee;
            position: relative;
            img[lazy=loading] {
                width: 40px;
                height: 100px;
                margin: auto;
            }
            img{
                width: 100%;
                background-color: #ccc;
            }
            .title{
                margin: 2px 0;
                position: absolute;
                bottom: 0;
                max-height: 84px;
                font-size: 13px;
                background-color: rgba(0, 0, 0, 0.4);
                p{
                    color:#fff;
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
    
</style>

