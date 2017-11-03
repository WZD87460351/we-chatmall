<template>
	<div>
	<div class="shopcar">
		<div class="content">
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount>0}">
						<i class="iconfont icon-shopping_cart"></i>
					</div>
					<div class="purchaseamount" v-show="totalCount">{{totalCount}}</div>
				</div>
				
				<span class="totalmoney">
					￥{{totalPrice}}
				</span>
				
				<span class="shortmoney">另需配送费￥{{delivery}}元</span>
			</div>
			<div class="content-right" :class="{'enough': this.totalPrice>=this.minPrice}">
				{{pay}}
			</div>
		</div>
		
		<transition name="fold">
		<div class="shopcar-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li v-for="food in selectFoods" class="food">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>{{food.price * food.count}}</span>
						</div>
						<div class="carcontrol-wrapper">
							<carcontrol :food="food"></carcontrol>
						</div>
					</li>
				</ul>
			</div>
				
			
			
		</div>
		</transition>
		
	</div>
		<transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>  
    </transition>
	</div>
</template>


<script>
	import carcontrol from "../carcontrol/carcontrol.vue";
	import BScroll from "better-scroll";
	export default{
		props:{
			delivery:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
			selectFoods:{ //
				type:Array,
				default(){
					return[
						{
						price:10,
						count:2
					}]
						
				}
			}
		},
		computed:{
			totalPrice(){
				let price = 0;
				this.selectFoods.forEach((goods) => {
					price += goods.price * goods.count
				})
				return price
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((goods) => {
					count += goods.count
				})
				return count
			},
			pay(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}起送`
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元`
				}else{
					return '去结算'
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				return show
			}
		},
		data(){
			return{
				fold:true
				
			}
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return
				}
				this.fold = !this.fold;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				})
			},
			empty(){
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideList(){
				this.fold = true;
			}
		},
		components:{
			carcontrol
		}
	}

</script>

<style lang="scss" scoped>
	@import "../../common/mixin.scss";
	.shopcar{
		height: 48px;
		background-color: #141d27;
		font-size: 20px;
		color: #fff;
		position: relative;
		z-index: 100;
		.content{
			display: flex;
			.content-left{
				flex: 1;
/*				position: relative;*/
				font-size: 0;
				background-color: #141d27;
				.logo-wrapper{
					display: inline-block;
					height: 56px;
					width: 56px;
					border-radius: 50%;
					position: relative;
					left: 12px;
					top: -10px;
					background-color: #141d27;
					.purchaseamount{
						position: absolute;
						top: 0;
						left: 32px;
						width: 24px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						line-height: 16px;
						background: red;
						text-align: center;
						border-radius: 8px;
					}
					.logo{
						width: 44px;
						height: 44px;
						border-radius: 50%;
						background-color: #2b333b;
						text-align: center;
						line-height: 44px;
						margin: 6px;
						font-size: 24px;
						color: rgba(255,255,255,.4);
						&.highlight{
							background-color: #00a0dc;
							color: #fff;
						}
					}
				}
				
				.totalmoney{
					display: inline-block;
					vertical-align: top;
					font-size: 16px;
					line-height: 24px;
					margin: 12px 12px auto 12px;
					padding-right: 12px;
					border-right: 1px solid rgba(255,255,255,.1);
					
/*					background-color: red;*/
				}
				
				.shortmoney{
					display:inline-block;
					vertical-align: top;
					font-size: 12px;
					font-weight: 100;
					line-height: 48px;
					color: rgba(255,255,255,.4);

/*					background-color: green;*/
				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				text-align: center;
				line-height: 48px;
				font-size: 12px;
				font-weight: 700;
				color: rgba(255,255,255,.4);
				background: #2b333b;
				&.enough{
					color: #fff;
					background-color: #00b43c;
				}
			}
		}
		
		.shopcar-list{
      position: absolute;
      bottom: 48px;
      left: 0;
      z-index: -10;
      width:100%;
    }
    
    .fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
    .list-header{
      padding: 0 18px;
      height: 40px;
      line-height:40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,.1);
      .title{
        float:left;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color:rgb(0, 160, 220);
      }
    }
    .list-content{
      padding: 0 18px;
      max-height:217px;
      overflow: hidden;
      background:#fff;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        // @include border-1px(rgba(7, 17, 27,.1));
        .name{
          line-height:24px;
          font-size:14px;
          color:rgb(7,17,27);
        }
        .price{
          position: absolute;
          right:90px;
          bottom:12px;
          line-height: 24px;
          font-size:14px;
          font-weight:700;
          color:rgb(240,20,20);
        }
        .carcontrol-wrapper{
          position: absolute;
          right:0;
          bottom: 6px;
        }
      }
    }
		
	}
		
	.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background:rgba(7,17,27,.6);
    background-filter: blur(10px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity:0;
  }

</style>