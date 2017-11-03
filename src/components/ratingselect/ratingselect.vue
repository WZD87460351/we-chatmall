<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active': selectType === 2}" @click="select(2,$event)">
				{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive" :class="{'active': selectType === 0}" @click="select(0,$event)">
				{{desc.positive}}
				<span class="count">{{positive.length}}</span>
			</span>
			<span class="block negative" :class="{'active': selectType === 1}" @click="select(1,$event)">
				{{desc.negative}}
				<span class="count">{{negative.length}}</span>
			</span>
		</div>
		
		<div class="switch" :class="{'on': onlyContent}" @click="toggleContent($event)">
      <span class="iconfont icon-check_circle icon"></span>
      <span class="text">只看有内容的评价</span>
    </div>
	</div>
</template>


<script>
	export default{
		props:{
			desc:{
				type:Object,
				default(){
					return{
						all: "全部",
						positive:"推荐",
						negative:"吐槽"
					}
				}
			},
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default(){
					return 2;
				}
			},
			onlyContent:{
				type: Boolean,
        default: false
			}
		},
		computed:{
			positive(){
				return this.ratings.filter((rating) => {
					return rating.rateType === 0;
				})
			},
			negative(){
				return this.ratings.filter((rating) => {
					return rating.rateType === 1;
				})
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return
				}
				this.$parent.selectType = type //对父组件的selectType进行修改
			},
			toggleContent(event){
				if(!event._constructed){
					return
				}
				this.$parent.onlyContent = !this.onlyContent
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/mixin.scss";
	.ratingselect{
		.rating-type{
      padding: 18px 0;
      margin: 0 18px;
      @include border1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
			.block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
/*
				&.active{
          color: #fff;
				}
*/
				&.positive{
          background-color: rgba(0,160,220,.2);
          &.active{
            color:#fff;
            background-color: rgb(0,160,220);
          }
        }
        &.negative{
          background-color: rgba(77,85,93,.2);
          &.active{
            color:#fff;
            background-color: rgb(77,85,93);
          }
        }
				.count{
          margin-left: 2px;
          font-size: 8px;
				}
			}
		}
		
		.switch{
      padding:12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,.1);
      color:rgb(147, 153, 159);
      font-size: 0;
      span{
        display:inline-block;
        vertical-align:top;
      }
      .icon{
        margin-right:4px;
        font-size:24px;
      }
      .text{
        font-size: 12px;
      }
      &.on{
        .icon{
          color:#00c850;
        }
      }
    }
	}
</style>