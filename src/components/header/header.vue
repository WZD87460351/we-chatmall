<template>
  <div class="header">
    <!-- search part -->
    <div class="search-total">
    	<div class="search">
	    	<i class="iconfont icon-remove_circle_outline" :class="{'moveleft':this.searchMove}"></i>
				<input type="text" id="" :placeholder="holder" @focus="focus" @blur="blur">
    	</div>

    </div>
    <!-- personal avatar -->
    <div class="content-wrapper"  @click="showDetail">
    	<div class="counter" v-if="seller.supports">
    		<i class="iconfont icon-keyboard_arrow_right"></i>
    	</div>
    		
    </div>
    
    
    
    
    <!-- personal information part -->
    <transition name="fade">
			<div class="detail-wrapper" v-show="detailShow" >
				<div class="detail">
					<div class="personcenter">
						<div class="back" @click="closeDetail">
							<i class="iconfont icon-arrow_lift"></i>
							<span>返回</span>
						</div>

						<div class="title">个人中心</div>
					</div>
					<div class="partscro" ref="partscro">
						<div class="info">
							<div class="Myavatar">
								<img :src="seller.avatar" alt="">
								<div class="Myname">hhhh</div>
							</div>
							<div class="My-threepar clearfix">

								<div class="part partone">
									<i class="iconfont icon-shopping_cart"></i>
									<span>0</span>
								</div>
								<div class="part parttwo">
									<i class="iconfont icon-shopping_cart"></i>
									<span>0</span>
								</div>
								<div class="part partthree">
									<i class="iconfont icon-shopping_cart"></i>
									<span>0</span>
								</div>

							</div>
							<ul class="someLi">
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
								<li class="border1px">
									<i class="faver iconfont icon-favorite"></i>
									<span>账户充值</span>
									<i class="arrowRight iconfont icon-keyboard_arrow_right"></i>
								</li>
							</ul>
						</div>
						
					</div>

				</div>
			</div>
    </transition>
					
			
					
					
					
    	
  </div>
</template>

<script>
	import BScroll from "better-scroll";
	export default {
  	props:{
			seller:{
				return:Object
			}
		},
		data(){
			return{
				detailShow:false,
				big: "big",
				holder: "输入你的产品",
				searchMove:false
			}
		},
		created(){
			this.$nextTick(() => {
				this._personalScroll();
			})
		},
		methods:{
			showDetail(){
				this.detailShow = true;
			},
			closeDetail(){
				this.detailShow = false;
			},
			focus(){
				this.holder = "";
				this.searchMove = true;
			},
			blur(){
				this.holder = "输入你的产品";
				this.searchMove = false;
			},
			_personalScroll(){
				this.personalScroll = new BScroll(this.$refs.partscro,{
					click:true,
					scrollY:true
				});
			}
		},
		components:{

		}
	}
		
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/common.scss";
	.header{
		position: relative;
    height: 50px;
    background: rgba(255,17,27,.5);
    .search-total{
    	position: absolute;
    	width: 85%;
    	height: 40px;
    	border-radius: 10px;
    	background: lightgray;
    	margin: 5px auto auto 10px;
    	.search{
    		// background: green;
    		margin-top: 5px;
    		input{
    			height: 30px;
    			width: 100px;
    			border: none;
    			outline:none;
    			background: lightgray;
    		}
    		i{
    			font-size: 20px;
					margin-left:80px;
					&.moveleft{
						margin-left: 10px;
					}
    		}
    	}
    }
		

		.content-wrapper{
			position: absolute;
			right: 5px;
			bottom: 10px;
			.counter{
				height: 24px;
				padding: 7px;
				box-sizing: border-box;
				border-radius: 12px;
				line-height: 10px;
				font-weight: 200;
				font-size: 10px;
				color: #fff;
				background-color: rgba(0,0,0,.2);
				i{
					margin-left: 0;
					font-size: 10px;
					line-height: 10px;
				}
			}
		}
		
		
		
		
		.detail-wrapper{
			z-index: 10;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(7,17,27,.7);
			overflow: auto;
			.detail{
				position: relative;
				min-height: 100%;
				color: #fff;
/*				filter: blur(10px);*/
				backdrop-filter: blur(10px);//仅仅模糊背景，但不模糊文字
				padding-bottom: 60px;
				box-sizing: border-box;
				.personcenter{
					position:fixed;
					width: 100%;
					background: #000;
					.back{
						// background: green;
						position:absolute;
						left:10px;
						top:10px;
					}
					.title{
						font-size: 20px;
						text-align: center;
						line-height: 40px;
					}

				}
				.partscro{
					position:absolute;
					width:100%;
					top:40px;
					bottom:0;
					z-index:-1;
					overflow:hidden;
					background: rgba(255,17,27,.5);
					.info{
						.Myavatar{
							padding: 20px;
							background: rgba(255,17,27,.5);
							text-align: center;
							img{
								height:100px;
								border-radius:50px;
							}
							.Myname{
								padding-top:20px;
							}
						}
						.My-threepar{
							background: lightgray;
		
							.part{
								float:left;
								width:33%;
								font-size:20px;
								line-height:40px;
								i{
									color:rgba(255,17,27,.5);
									margin-left:10px;
								}
								span{
									color:#333;
									font-weight:700;
									margin-left:20px;
								}
								&.partone{
									@include border-right1px(gray);
								}
								&.parttwo{
									@include border-right1px(gray);
								}
								&.partthree{
								}
							}
						}
						.someLi{
							li{
								line-height:50px;
								background: #fff;
								@include border1px(gray);
								span{
									color:#333;
								}
								i{
									font-size:20px;
									&.faver{
										color:rgba(255,17,27,.5);
									}
									&.arrowRight{
										float:right;
										font-size:20px;
										line-height:50px;
										color:gray;
									}
								}
							}
						}

					}
				}
				
			}
			
		}

		.swiper-wrapper{
			z-index:-1;
			position:absolute;
			bottom:0;
		}
		
		.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  		opacity: 0
		}
  }
	
</style>
