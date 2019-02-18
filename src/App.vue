<template>
  <div id="app">
		<!-- header部分 -->
    <mt-header fixed title="高级vue移动端项目"></mt-header>
		
    <transition name="app">
			<router-view/>
		</transition>

		<!-- 底部导航 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-items" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-items" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-items" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.Totalcount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-items" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
	padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}
.app-enter{
	opacity: 0;
	transform: translateX(100%)
}
.app-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute
}
.app-enter-active,
.app-leave-active{
	transition: all 0.5s ease
}
.mui-bar-tab .mui-tab-items.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-items {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-items .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-items .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

