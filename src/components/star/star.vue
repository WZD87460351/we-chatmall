<template>
	<div class="star" :class="[typeSize]">
		<li v-for="item in classItem" class="star-item" :class="item"></li>
	
	</div>	
</template>


<script>
	const LENGTH = 5; //定义星星的数量
	export default{
		props:{
			score:{
				return:Number
			},
			size:{
				return:Number
			}
		},
		computed:{
			classItem() {
				let result = [];
				let score = Math.floor(this.score*2)/2;
				let inter = Math.floor(score);
				let hasDecimal = score % 1 !==0;
				for(let i =0;i<inter;i++){
					result.push('on');
				};
				if(hasDecimal){
					result.push('half');
				}
				while(result.length < LENGTH){
					result.push('off');
				}
				return result;
			},
			typeSize() {
				return 'type' + this.size;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/mixin.scss";
	
	.star{
		font-size: 0;
		text-align: center;
		.star-item{
			display: inline-block;
			margin-right: 24px;
			height: 24px;
			width: 24px;
			background-size: cover;
			&:last-child{
				margin-right: 0;
			}
		}
			
		
		&.type24{
			.star-item{
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}
		
		&.type36{
			.star-item{
				margin-right: 5px;
				width: 16px;
				height: 16px;
				&.on{
					@include bgImage(star36_on);
				}
				&.half{
					@include bgImage(star36_half);
				}
				&.off{
					@include bgImage(star36_off);
				}
			}
		}
		
		
		&.type48{
			.star-item{
				margin-right: 5px;
				width: 10px;
				height: 10px;
				&.on{
					@include bgImage(star48_on);
				}
				&.half{
					@include bgImage(star48_half);
				}
				&.off{
					@include bgImage(star48_off);
				}
			}
		}
	}
</style>