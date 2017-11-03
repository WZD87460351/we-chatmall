<template>
  <div class="goods">
  	<div class="manu-wrapper" ref="manuWrapper">
  		<ul>
  			<li v-for="(item,index) in goods" class="manu-item" :class="{'current':currentIndex === index}" @click="_clickManu(index,$event)">
  				<span class="text border1px">
  					<span class="icon decrease" v-if="item.type >0" :class="classMap[item.type]"></span>
  					{{item.name}}
  				</span>
  			</li>
  		</ul>
  	</div>
  	
		<div class="goods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="goods-item food-list-hook">
					<h2>{{item.name}}</h2>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="choiceFood(food,$event)">
							<div class="foodcontent">
								<img :src="food.icon" alt="">
								<div class="descri">
									<h3 class="foodname">{{food.name}}</h3>
									<div class="fooddescri">{{food.description}}</div>
									<div class="sale">月售{{food.sellCount}}份&nbsp;&nbsp;&nbsp;好评率{{food.rating}}%</div>
									<div class="price">￥{{food.price}}</div>
								</div>
								
								<div class="carcontrol-wrapper">
									<carcontrol :food="food"></carcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		
		<div class="shopcar-wrapper">
			<shopcar :delivery="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcar>
		</div>	
  
  	<div class="food-wrapper">
  		<food :food="chooseFood" ref="food"></food>
  	</div>
  </div>
			
</template>
		

<script>
	import BScroll from "better-scroll";
	import shopcar from "../shopcar/shopcar.vue";
	import carcontrol from "../carcontrol/carcontrol.vue";
	import food from "../food/food.vue";
	export default {
		props:{
			seller:{
				return:Object
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				chooseFood:{}
			}
		},
		created(){
			this.$http.get("api/goods").then((response) => {
				this.goods = response.body.data;
				this.$nextTick(() => {
					this._initScroll();
					this._calcHeight();
				})
			}),
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		methods:{
			_initScroll(){
				this.manuScroll = new BScroll(this.$refs.manuWrapper,{
					click:true
				});
				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType: 3
				});
				this.foodScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.floor(pos.y));
//					console.log(this.scrollY);
				})
				
			},
			_calcHeight(){
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let i =0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				console.log(this.listHeight);
			},
			
			_clickManu(index,event){
				if(!event._constructed){
					return
				}
				console.log(event);
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				this.foodScroll.scrollToElement(foodList[index],300);
			},
			
			choiceFood(food,event){
				if(!event._constructed){
					return
				}
				this.chooseFood = food;
				this.$refs.food.show();
			}
		},
		
		computed:{
			currentIndex(){
				for(let i =0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1 && this.scrollY <height2)){
						return i
					}
				}
				return 0;
			},
			selectFoods(){  //传到shopcar里面
				let foodList = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foodList.push(food);
						}
					})
				})
				return foodList;
			}
		},
		components:{
			shopcar,
			carcontrol,
			food
		}
		
	}
		
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/mixin.scss";
	.goods{
		// position: absolute;
		// top: 183px;
		// bottom: 48px;
		display: flex;
		width: 100%;
		overflow: hidden;
		.manu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.manu-item{
				padding: 0 12px;
				height: 58px;
				width: 56px;
				display: table;
				&.current{
/*					z-index: 10;*/
/*					margin-top: -1px;*/
					background: #fff;
					font-weight: 700;
				}
				.text{
					display: table-cell;
					vertical-align: middle;
					line-height: 14px;
					font-size: 12px;
					font-weight: 200;
					color: rgb(7,17,27);
					@include border1px(rgba(0,0,0,.1));
					&>.icon{
						display: inline-block;
						vertical-align: middle;
						width: 14px;
						height: 14px;
						background-size: cover;
						&.decrease{
						 	@include bgImage(decrease_3);
					 	}
					 	&.discount{
						 	@include bgImage(discount_3);
					 	}
					 	&.special{
						 	@include bgImage(special_3);
					 	}
					 	&.invoice{
						 	@include bgImage(invoice_3);
					 	}
					 	&.guarantee{
						 	@include bgImage(guarantee_3);
					 	}
					}
					
				}
			}
		}
		
		.goods-wrapper{
			flex: 1;
			.goods-item{
				h2{
					background-color: #f3f5f7;
					font-size: 12px;
					line-height: 26px;
					text-indent: 14px;
					color: rgb(147,153,159);
					@include border-left1px(#d9ddd1);
				}
					
				.food-item{
					padding: 0 18px;
					.foodcontent{
						position: relative;
						height: 100%;
						padding: 18px 0;
						font-size: 0;
						@include border1px(rgba(7,17,27,.1));
						.carcontrol-wrapper{
							position: absolute;
							right: 18px;
							bottom: 6px;
						}
						img{
							width: 57px;
							height: 57px;
							border-radius: 2px;
						}
						.descri{
							display: inline-block;
							vertical-align: top;
							margin: 2px auto auto 10px; 
							max-width: calc(100% - 80px);
							.foodname{
								font-size: 14px;
								color: rgb(7,17,27);
								line-height: 14px;
							}
							.fooddescri{
								font-size: 10px;
								line-height: 12px;
								color: rgb(147,153,159);
								margin-top: 8px;
							}
							.sale{
								font-size: 10px;
								line-height: 10px;
								color: rgb(147,153,159);
								margin-top: 8px;
							}
							.price{
								font-size: 14px;
								color: red;
								font-weight: 700;
								line-height: 24px;
							}
						}
					}
				}
				.food-item{
					&:last-child{
						.foodcontent{
							&:after{
								display: none;
							}
						}
					}
				}
						
			}
		}
		
		.shopcar-wrapper{
			position: fixed;
			bottom: 0;
			width: 100%;
		}
		
		.food-wrapper{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;

		}
	}
</style>