<template>
	<div class="carcontrol">
		<transition name="move">
			<div class="decrease" v-show="food.count" @click.stop.prevent="decrease($event)">
				<i class="iconfont icon-remove_circle_outline"></i>
			</div>
		</transition>
		
		<transition name="fade">
			<div class="count" v-show="food.count">{{food.count}}</div>
		</transition>
		
		<div class="add" @click.stop.prevent="add($event)">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
</template>


<script>
	import Vue from "vue";
	export default{
		props:{
			food:{
				return:Object
			}
		},
		methods:{
			add(event){
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);  //给food对象添加count属性
				
				}else{
					this.food.count++
				}
			},
			decrease(event){
				if(!event._constructed){
					return
				}
				this.food.count--
				
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../common/mixin.scss";
	.carcontrol{
		.decrease,.count,.add{
			display: inline-block;
			vertical-align: top;
			font-size: 24px;
			color: rgba(255,17,27,.5);
		}
		.count{
			margin: 0 12px;
		}
		
/*
		.move-enter-active {
  		transition: all .3s ease;
		}
		.move-leave-active {
  		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.move-enter,.move-leave-to{
 			transform: translateX(10px);
  		opacity: 0;
		}
*/
		.move-enter-active, .move-leave-active{
      transition: all 0.5s linear;
      transform: translate3D(0,0,0) rotate(0deg);
    }
    .move-enter,.move-leave-active{
      transform: translate3D(24px,0,0) rotate(180deg);
      opacity:0;
    }
		
		.fade-enter-active {
  		transition: all .3s ease;
		}
		.fade-leave-active {
  		transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.fade-enter,.fade-leave-to{
 			transform: translateX(10px);
  		opacity: 0;
		}

	}
</style>