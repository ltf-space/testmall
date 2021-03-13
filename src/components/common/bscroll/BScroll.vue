<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import  BScroll from 'better-scroll'
export default {
  name:'BScroll',
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  data(){
    return {
      BScroll : null
    }
  },
  components:{},
  mounted(){
    //创建BScroll事件
    this.BScroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click:true,//能够点击图片
      // mouseWheel:true,//鼠标滚轮能够滚动
      // observeDOM:true,//鼠标按键能够滚动
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动位置
    this.BScroll.on('scroll',position => {
      this.$emit('back',position);//传出back事件，position为参数
    })
    //监听上拉加载
    this.BScroll.on('pullingUp',() => {
      this.$emit('pullingUp');
    })
    this.BScroll && this.BScroll.scrollTo(0,0)//返回顶部
  },
  methods:{
    refresh(){
      //没加载图片一次就来一次刷新
      this.BScroll.refresh()
    }
  }
}
</script>
<style scoped>

</style>