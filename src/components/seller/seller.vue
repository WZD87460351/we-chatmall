<template>
	<div>
		<div class="seller_scroll" ref="seller_scroll">
			<div class="seller">
				<div class="seller_head">
					<div class="head_up clearfix">
						<div class="up_left">
							<h3 class="sellername">{{seller.name}}</h3>
							<div class="star_wrapper">
								<star :score="seller.score" :size="36"></star>
							</div>
							<span class="ratingCount">({{seller.ratingCount}})</span>
							<span class="sellCount">月售{{seller.sellCount}}单</span>
						</div>

						<div class="up_right" @click="collectHeart($event)">
							<i class="iconfont icon-favorite heart" :class="{'hadcollect':this.Collect}"></i>

							<p class="collect" v-show="!this.Collect">收藏</p>
							<p class="collect" v-show="this.Collect">已收藏</p>
						</div>	
					</div>

					<div class="head_down">
						<ul class="clearfix">
							<li>
								<p>起送价</p>
								<h3>{{seller.minPrice}}<span>元</span></h3>
							</li>
							<li>
								<p>商家配送</p>
								<h3>{{seller.deliveryPrice}}<span>元</span></h3>
							</li>
							<li>
								<p>平均配送时间</p>
								<h3>{{seller.deliveryTime}}<span>分钟</span></h3>
							</li>
						</ul>
					</div>
				</div>

				<div class="linebar"></div>

				<div class="announce">
					<div class="title">公告与活动</div>
					<div class="textContent">{{seller.bulletin}}</div>
					<div class="supports-wrapper">
						<supports v-if="seller.supports" :supports="seller.supports" :className="bigBlack"></supports>
					</div>
				</div>

				<div class="linebar"></div>

				<div class="realScene">
					<div class="title">商家实景</div>

					<div class="pictures" ref="pic_wrapper">
						<ul ref="wrapper">
							<li v-for="item in seller.pics" class="picitem">
								<img :src="item" alt="">
							</li>
						</ul>
					</div>

				</div>

				<div class="linebar"></div>

				<div class="seller_infor">
					<div class="title">商家信息</div>
					<ul>
						<li v-for="item in seller.infos">{{item}}</li>
					</ul>
				</div>

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
	import supports from "../supports/supports.vue";
	import shopcar from "../shopcar/shopcar.vue";
	import BScroll from "better-scroll";
export default {
	
	mounted(){
    this._initScroll();
		if(this.seller.pics){
			let picWidth = 120;
			let margin = 6;
			let width = (picWidth + margin) * this.seller.pics.length - margin +"px";
			this.$refs.wrapper.style.width = width + "px";
		}
  },
	data(){
		return{
			Collect: false,
			bigBlack: "bigBlack"
		}
	},
  props:{
		seller:{
			return:Object
		}
	},
	created(){
		
	},
	methods:{
		collectHeart(event){
			if(!event._constructed){
				return
			}
			this.Collect = !this.Collect;
			console.log(this.Collect);
		},
		_initScroll(){
			 this.sellerScroll = new BScroll(this.$refs.seller_scroll,{
				 scrollY: true,
				 click: true
			 });
			
       this.picsScroll = new BScroll(this.$refs.pic_wrapper,{
         scrollX: "true",
         click: true
//				 eventPassthrough: 'vertical' //指定横向还是竖向
       });
					
		}
		
	},
	components:{
		star,
		supports,
		shopcar
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/common.scss";
	.seller_scroll{
		position: absolute;
		top: 183px;
		bottom: 0;
		overflow: hidden;
	}
	.seller{
		.seller_head{
			padding: 0 18px;
			font-size: 0;
			.head_up{
/*				background: pink;*/
				padding: 18px 0;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.up_left{
					float: left;
					.sellername{
						font-size: 14px;
						line-height: 14px;
						color: rgb(7,17,27);
					}
					.star_wrapper{
						display: inline-block;
						margin-top: 8px;
/*						background: red;*/
					}
					.ratingCount,.sellCount{
						display: inline-block;
						vertical-align: top;
						margin-top: 7px;
						font-size: 10px;
						line-height: 18px;
						color: rgb(77,85,93);
					}
					.sellCount{
						margin-left: 12px;
					}
				}
				.up_right{
					float: right;
					text-align: center;
/*					background: green;*/
					min-width: 40px;
					.heart{
						font-size: 24px;
						color: #d4d6d9;
						line-height: 24px;
						&.hadcollect{
							color: rgb(240,20,20);
						}
					}
					.collect{
						font-size: 10px;
						line-height: 10px;
						color: rgb(77,85,93);
						margin-top: 4px;
					}
				}
				
			}
			
			.head_down{
				padding: 18px 0;
				li{
					float: left;
					text-align: center;
					width: 33.3%;
					border-right: 1px solid rgba(7,17,27,.1);
					box-sizing: border-box;
					&:last-child{
						border: none;
					}
					p{
						font-size: 10px;
						line-height: 10px;
						color: rgb(147,153,159);
					}
					h3{
						font-size: 24px;
						font-weight: 200;
						line-height: 24px;
						color: rgb(7,17,27);
						margin-top: 4px;
						span{
							font-size: 10px;
							line-height: 10px;
						}
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
		
		.announce{
			padding: 0 12px;
			.title{
				padding: 18px 0 8px 0;
				font-size: 16px;
				font-weight: 700;
			}
			.textContent{
				padding: 0 12px 16px;
				font-size: 12px;
				line-height: 24px;
				color: rgb(240,20,20);
			}
		}
		
		.realScene{
			padding: 18px;
			.title{
				margin-bottom: 12px;
				font-size: 16px;
				font-weight: 700;
			}
			.pictures{
				position: relative;
				width: 100%;
				height: 90px;
/*				background: red;*/
				white-space: nowrap;
				overflow: hidden;
				ul{
					position: absolute;
					left: 0;
					top: 0;
					font-size: 0;
					.picitem{
						display: inline-block;
						height: 90px;
						width: 120px;
						margin-right: 6px;
						&:last-child{
							margin: 0;
						}
						img{
							height: 100%;
							width: 100%;
						}
					}
				}
			}
		}
		
		.seller_infor{
			padding: 18px;
			.title{
				padding-bottom: 12px;
				font-size: 16px;
				font-weight: 700;
			}
			li{
				padding: 16px 12px;
				border-top: 1px solid rgba(7,17,27,0.1);
				font-size: 12px;
				line-height: 16px;
				font-weight: 200;
				color: rgb(7,17,27);
			}
		}
		
		
	}
	
	.shopcar-wrapper{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>