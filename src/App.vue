<template>
  <div id="app">
   	<iheader :seller="seller"></iheader>
		<iswiper></iswiper>
		<!-- <shopcar></shopcar> -->
   	
    <!-- <div class="tab border1px">
    
    	<div class="tab-item">
    		<router-link to="/goods">商品</router-link>
    	</div>
    	
    	<div class="tab-item">
    		<router-link to="/ratings">评论</router-link>
    	</div>
    	
    	<div class="tab-item">
    		<router-link to="/seller">商家</router-link>
    	</div>
    	
    </div> -->
    <!-- <keep-alive>
    	<router-view :seller="seller"></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
	import iheader from "./components/header/header.vue";
	import igoods from "./components/goods/goods.vue";
	import iswiper from "./components/swiper/swiper.vue";
	import shopcar from "./components/shopcar/shopcar.vue";
	
	export default {
  	name: 'app',
		data(){
			return{
				seller:Object
			};
//			return{
//				goods:Object
//			};
		},
		created(){
			this.$http.get('api/seller').then(response =>{
				this.seller = response.body.seller;
				
			});
//			this.$http.get('api/goods').then(response =>{
//				this.goods = response.body.data;
//				console.log(this.goods);
//			});
		},
		
		
		components:{
			iheader:iheader,
			igoods,
			iswiper,
			shopcar
		}
	}
</script>


<style lang="scss" scoped>
	@import "./common/common.scss";
	.tab {
		height: 40px;
  	background: white;
		display: flex;
		line-height: 40px;
		@include border1px(rgba(7,17,27,0.1));
		.tab-item{
			flex: 1;
			text-align: center;
			&>a{
				display: block;
				height: 100%;
				font-size: 14px;
				color: rgb(77,85,93);
				&.active{
					color: rgb(240,20,20);
				}
			}
		}
	}
</style>
