<template>
	<div class="swiper-box" ref="swiperBox">
		<swiper class="box-container" :options="swiperOption" ref="mySwiper">
	    <swiper-slide v-for="good in goods">
	    	<div class="food-scroll" ref="foodScroll">
	    		<div>
		    		<marquee v-show="marqueeShow" @click="marqueeHide">{{remind}}</marquee>
						<ul>
							<li v-for="food in good.foods" class="food-item">
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
	    		</div>
	    	</div>
	    </swiper-slide>
	    <!-- <div class="swiper-pagination" slot="pagination" @click="testZindex">kk</div> -->
	    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
 		 	<!-- <div class="swiper-button-next" slot="button-next"></div> -->
  		<!-- <div class="swiper-scrollbar"  slot="scrollbar"></div> -->
	  </swiper>
		
	</div>

</template>

<script>
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import igoods from "../goods/goods.vue";
	import carcontrol from "../carcontrol/carcontrol.vue";
	import BScroll from "better-scroll";
	export default {
    name: 'carrousel',
    data() {
      return {
      	goods:[],
      	remind:'提醒！今天下单，明天送达!',
      	marqueeShow:true,
        swiperOption: {
        	notNextTick:true,
          // autoplay: 3500,
          // loop:true, //无缝滚动
          autoHeight: true,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          paginationType : 'bullets',
          mousewheelControl : true,
          observeParents:true
          // prevButton:'.swiper-button-prev',
          // nextButton:'.swiper-button-next',
          // scrollbar:'.swiper-scrollbar',
        },
        swiperSlides: ["diyi", "dierye","disan"]
      }
    },
    mounted() {

    },
    created(){
    	this.$http.get("api/goods").then((response)=>{
    		this.goods = response.body.data;
    		this.$nextTick(() => {
    			this._initScroll();
    		})
    	})
    },
    methods:{
    	_initScroll(){
    		this.foodScroll = new BScroll(this.$refs.swiperBox,{
    			scrollY:true,
    			click:true
    		});
    	},
    	marqueeHide(){
    		this.marqueeShow = !this.marqueeShow;
    	},
    	testZindex(){
    		alert("it is me");
    	}
    },
    components:{
    	swiper,
    	swiperSlide,
    	carcontrol
    }
  }
</script>

<style lang="scss" scoped>
	@import "../../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";
	@import "../../common/mixin.scss";
	.swiper-box{
		position:absolute;
		top:50px;
		bottom:0;
		overflow:hidden;
		width:100%;
		marquee{
			background: yellow;
			line-height:30px;
		}
		.swiper-pagination{
			position:fixed;
			top:0;
			height:20px;
			background: red;
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
				
	}
</style>