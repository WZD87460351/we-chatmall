<template>
	<div class="supports" :class="[className]">
		<ul>
			<li v-for="(item,index) in supports">
				<span class="icon" :class="classMap[item.type]"></span>
				<span class="content">
					{{item.description}}
				</span>
					
			</li>
		</ul>

	</div>
</template>


<script>
	export default{
		props:{
			supports:{
				return: Array
			},
			className:{
				return:String
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		}
 }
</script>

<style lang="scss" scoped>
	@import "../../common/mixin.scss";
	 .supports{
     color: #fff;
     font-size: 10px;
		 font-weight: 200;
		 line-height: 12px;
		 li{
			 font-size: 0;
			 span{
				 display: inline-block;
				 font-size: 10px;
				 &.content{
					 vertical-align: top;
					 margin-left: 4px;
					 font-size: 10px;
					 font-weight: 200;
					 line-height: 12px;
					 color: #fff;
				 }
				 &.icon{
					 display: inline-block;
					 height: 12px;
					 width: 12px;
					 background-size: cover;
					 &.decrease{
						 @include bgImage(decrease_1);
					 }
					 &.discount{
						 @include bgImage(discount_1);
					 }
					 &.special{
						 @include bgImage(special_1);
					 }
					 &.invoice{
						 @include bgImage(invoice_1);
					 }
					 &.guarantee{
						 @include bgImage(guarantee_1);
					 }
				 }
			 }
		 }
		 
		 &.big{
			 	padding: 24px 12px;
				li{
			 		font-size: 0;
					margin-bottom: 20px;
					&:last-child{
						margin-bottom: 0;
					}
			 		span{
				 		display: inline-block;
				 		font-size: 10px;
				 		&.content{
					 		vertical-align: top;
					 		margin-left: 4px;
							margin-top: 2px;
					 		font-size: 10px;
					 		font-weight: 200;
					 		line-height: 12px;
					 		color: #fff;
				 		}
				 		&.icon{
					 		display: inline-block;
					 		height: 16px;
					 		width: 16px;
					 		background-size: cover;
					 		&.decrease{
						 		@include bgImage(decrease_2);
					 		}
					 		&.discount{
						 		@include bgImage(discount_2);
					 		}
					 		&.special{
						 		@include bgImage(special_2);
					 		}
					 		&.invoice{
						 		@include bgImage(invoice_2);
					 		}
					 		&.guarantee{
						 		@include bgImage(guarantee_2);
					 		}
				 		}
			 		}
		 		}
		 }
		 
		 &.bigBlack{
				li{
			 		font-size: 0;
					padding: 16px 12px;
					border-top: 1px solid rgba(7,17,27,.1);
			 		span{
				 		display: inline-block;
				 		font-size: 10px;
				 		&.content{
					 		vertical-align: top;
					 		margin-left: 4px;
							margin-top: 2px;
					 		font-size: 10px;
					 		font-weight: 200;
					 		line-height: 12px;
					 		color: #000;
				 		}
				 		&.icon{
					 		display: inline-block;
					 		height: 16px;
					 		width: 16px;
					 		background-size: cover;
					 		&.decrease{
						 		@include bgImage(decrease_2);
					 		}
					 		&.discount{
						 		@include bgImage(discount_2);
					 		}
					 		&.special{
						 		@include bgImage(special_2);
					 		}
					 		&.invoice{
						 		@include bgImage(invoice_2);
					 		}
					 		&.guarantee{
						 		@include bgImage(guarantee_2);
					 		}
				 		}
			 		}
		 		}
		 } 
  }
</style>