<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发布时间：{{ item.add_time | datastr }}</span>
                                <span>点击：{{ item.click }}次</span>
                            </p>
						</div>
					</a>
				</li>
			</ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newsList:[]
        }
    },
    created(){
      this.getnewsList()  
    },
    methods: {
        getnewsList(){
            this.$http.get('api/getnewslist').then((result)=>{
                // console.log(result)
                this.newsList = result.body.message
            })
        }
    },
}
</script>
<style lang="less">
    .mui-table-view{
        li{
            h1{
                font-size: 13px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
