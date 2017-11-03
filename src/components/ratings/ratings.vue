<template>
 	<div>
  <div class="ratings_Scroll" ref="ratings_Scroll">
  <div class="ratings">
    <div class="evaluate clearfix">
    	<div class="evaluate_left">
    		<div class="score">{{seller.score}}</div>
    		<h3>综合评分</h3>
				<p>高于周边商家{{seller.rankRate}}%</p>
    	</div>
    	
    	<div class="evaluate_right">
    		<ul>
    			<li>
    				服务态度
    				<div class="star-wrapper">
    					<star :score="seller.serviceScore" :size="36"></star>
    				</div>
    				<span class="num">{{seller.serviceScore}}</span>
    			</li>
    					
    			<li>
    				服务态度
    				<div class="star-wrapper">
    					<star :score="seller.foodScore" :size="36"></star>
    				</div>
    				<span class="num">{{seller.foodScore}}</span>
    			</li>
    			<li>
    				送达时间
    				<span class="deliverytime">{{seller.deliveryTime}}分钟</span>
    			</li>
    		</ul>
    	</div>
    </div>
    
    <div class="linebar"></div>
    
    <ratingselect :desc="desc" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
    
    
<!--
    <div class="btnandcont">
    	<div class="buttons">
    		<button @click.prevent.stop="allShow">全部<span>{{satisfaction.length}}</span></button>
    		<button @click.prevent.stop="highShow">满意<span>{{highsatisfaction.length}}</span></button>
    		<button @click.prevent.stop="lowShow">不满意<span>{{lowsatisfaction.length}}</span></button>
    	</div>
			<div class="cont" @click.prevent.stop="withText($event)">
				<i class="iconfont icon-check_circle" :class="{'highlight':this.highLight}" ></i>
				<span>只看有内容的评论</span>
			</div>
    </div>
-->
    
    <div class="commentbar">
    	<ul>
    		<li class="eachcomment" v-for="item in ratings" v-show="needShow(item.rateType,item.text)">
					<img :src="item.avatar" alt="">
   				<div class="comment">
   					<div class="username">{{item.username}}</div>
   					<div class="star-wrapper">
    					<star :score="item.score" :size="48"></star>
    				</div>
    				<span class="deliveryTime" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>	
    				<p class="text">{{item.text}}</p>
    				<div class="recommend">
    					<i class="iconfont thumb" :class="{'icon-thumb_up':item.rateType==0}"></i>
    					<i class="iconfont thumb" :class="{'icon-thumb_down':item.rateType==1}"></i>
							<ul class="clearfix">
								<li v-for="food in item.recommend">{{food}}</li>
							</ul>
    				</div>
   				</div>
    			<div class="rateTime">{{format(item.rateTime)}}</div>
    		</li>
    	</ul>
    </div>
   
<!--    <star :score="seller.serviceScore" :size="36"></star>-->
  </div>
  </div>
<!--
  <div class="shopcar-wrapper">
    <shopcar></shopcar>
  </div>
-->
  </div>
</template>

<script>
	import star from "../star/star.vue";
	import shopcar from "../shopcar/shopcar.vue";
	import BScroll from "better-scroll";
	import ratingselect from "../ratingselect/ratingselect.vue";
export default {
	watch:{
		"ratings"(){
			this.$nextTick(() => {
				this.init_Scroll();
			});
		},
		'selectType'(type){
			 this.$nextTick(() => {
				 this.ratings_Scroll.refresh();
			 })
		 },
		 'onlyContent'(onlyContent){
			 this.$nextTick(() => {
				 this.ratings_Scroll.refresh();
			 })
		 }
	},
	data(){
		return{
			ratings:[],
			//below之前写的
			satisfaction:[],
			highsatisfaction:[],
			lowsatisfaction:[],
			hasText:[],
			originalArr:[],
			highLight: false,
			//above之前写的
			selectType:2,
			onlyContent:false,
			desc:{
				all:'全部',
				positive:'满意',
				negative:'不满意'
			}
		}
	},
  props:{
		seller:{
			return:Object
		}
	},
	methods:{
		allShow(){
			this.highLight = false;
			this.ratings = this.satisfaction;
		},
		highShow(){
			this.highLight = false;
			this.ratings = this.highsatisfaction;
		},
		lowShow(){
			this.highLight = false;
			this.ratings = this.lowsatisfaction;
		},
		withText(event){
			if(!event._constructed){
				return
			}
			alert(1);
			this.highLight = !this.highLight;
			console.log(this.highLight);
			this.hasText = [];
			if(this.highLight == true){
				this.originalArr = [];
				this.ratings.forEach((item) => {
					this.originalArr.push(item);
					if(item.text !== ""){
						this.hasText.push(item);
					}
				});
				this.ratings = this.hasText;
//				console.log(this.originalArr);
			}else{
				this.ratings = this.originalArr;
//				console.log(this.originalArr);
			};
//			console.log(this.ratings);
				
		},
		init_Scroll(){
			this.ratings_Scroll = new BScroll(this.$refs.ratings_Scroll,{
				click: true
			})
		},
			
		needShow(type,text){
			if(this.onlyContent && !text){
				 return false;
			 }
			 if(this.selectType == 2){
				 return true
			 }else{
				 return type === this.selectType;
			 }
		},
		
		format(date){
			 var date = new Date(date);//如果date为13位不需要乘1000
  		 var Y = date.getFullYear() + '-';
  		 var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  		 var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  		 var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  		 var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  		 var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
  		 return Y+M+D+h+m+s;
		}
	},
	created(){
		this.$http.get('api/ratings').then(response => {
			this.ratings = response.body.data;
			this.ratings.forEach((item) => {
				this.satisfaction.push(item);
				if(item.score>=4){
					this.highsatisfaction.push(item);
				}else{
					this.lowsatisfaction.push(item);
				}
			});
		})
	},
	components:{
		star,
		shopcar,
		ratingselect
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/mixin.scss";
	@import "../../common/common.scss";
	.ratings_Scroll{
		position: absolute;
		top: 183px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.ratings{
		.evaluate{
/*			background: pink;*/
			padding: 18px 0;
			width: 100%;
			box-sizing: border-box;
			font-size: 0;
			.evaluate_left{
/*				background: yellow;*/
				float: left;
				margin: -2px;
				text-align: center;
				width: 33.3%;
				border-right: 1px solid #e6e7e8;
				font-size: 10px;
				.score{
					font-size: 24px;
					line-height: 28px;
					color: rgb(255,153,0);
				}
				h3{
					font-size: 12px;
					line-height: 12px;
					color: black;
				}
				p{
					font-size: 5px;
					line-height: 10px;
					color: #c3c6c9;
					margin: 8px auto 6px auto;
				}
			}
			.evaluate_right{
/*				background: lightgray;*/
				float: right;
				width: 66.6%;
				font-size: 10px;
				li{
					font-size: 12px;
					padding-left: 10px;
					margin-bottom: 6px;
					.star-wrapper{
/*						background: green;*/
						display: inline-block;
						vertical-align: top;
						margin-left: 12px;
						margin-top: 3px;
					}
					.num{
						color: rgb(255,153,0);
						line-height: 18px;
					}
					.deliverytime{
						margin-left: 12px;
						color: rgb(147,153,159);
					}
				}
			}
		}
		
		.linebar{
			height: 20px;
			width: 100%;
			background: #f3f5f7;
			border-bottom: 1px solid #e6e7e8;
			border-top: 1px solid #e6e7e8;
		}
		
		.btnandcont{
			border-bottom: 1px solid #e6e7e8;
			padding: 0 18px;
			font-size: 0;
/*			background: green;*/
			.buttons{
				padding: 18px 0;
				border-bottom: 1px solid lightgray;
				button{
					border: none;
					outline: none;
					border-radius: 2px;
					padding: 10px;
					font-size: 12px;
					&:nth-child(1){
						background: #00a0dc;
						color: white;
					}
					&:nth-child(2){
						background: #ccecf8;
						color: #5c636a;
						margin-left: 10px;
					}
					&:nth-child(3){
						background: #e9ebec;
						color: #5c636a;
						margin-left: 10px;
					}
				}
			}
			
			.cont{
				font-size: 10px;
				padding: 18px 0;
				color: rgb(147,153,159);
				i{
					font-size: 25px;
					&.highlight{
						color: #00a0dc;
					}
				}
				span{
					display: inline-block;
					vertical-align: top;
					line-height: 25px;
				}
			}
		}
		
		.commentbar{
			padding: 0 18px;
			.eachcomment{
				padding: 18px 0;
				border-bottom: 1px solid lightgray;
				font-size: 0;
				position: relative;
				img{
					width: 28px;
					height: 28px;
					border-radius: 50%;
				}
				.comment{
					max-width: 85%;
/*					background: pink;*/
					display: inline-block;
					vertical-align: top;
					margin-left: 12px;
					.username{
						font-size: 10px;
						line-height: 12px;
						color: rgb(7,17,27);
					}
					.star-wrapper{
						display: inline-block;
						vertical-align: top;
						margin-top: 4px;
					}
					.deliveryTime{
						font-size: 10px;
						font-weight: 200;
						color: rgb(147,153,159);
						line-height: 12px;
						display: inline-block;
						vertical-align: top;
						margin: 4px auto auto 6px;
					}
					.text{
						margin-top: 4px;
						font-size: 12px;
						line-height: 18px;
						color: rgb(7,17,27);
					}
					.recommend{
						font-size: 12px;
						margin-top: 8px;
						.thumb{
							font-size: 12px;
							line-height: 16px;
							float: left;
							&.icon-thumb_up{
								color: rgb(0,160,220);
							}
							&.icon-thumb_down{
								color: rgb(183,187,191);
							}
						}
						ul{
							margin-left: 20px;
						}
						li{
							float: left;
							margin-right: 8px;
							margin-bottom: 2px;
							font-size: 9px;
							color: rgb(147,153,159);
							line-height: 16px;
							border: 1px solid rgba(7,17,27,.1);
							border-radius: 2px;
						}
					}
				}
				.rateTime{
					position: absolute;
					top: 18px;
					right: 0;
					font-size: 10px;
					font-weight: 200;
					color: rgb(147,153,159);
					line-height: 12px;
				}
			}
		}
	}
	.shopcar-wrapper{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
		
		
</style>