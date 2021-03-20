<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="navBar"></detail-nav-bar> 
    <b-scroll class="detail-content" :pullUpLoad='true' ref="bscroll" @back='contentBScroll'>
      <detail-swiper :top-images='topDetail'></detail-swiper>
      <detail-base-info :goods='Goods'></detail-base-info>
      <detail-shop-info :shop='Shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramsInfo' ref="params"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods='recommend' ref="recommend"></goods-list>
    </b-scroll>
    <back-top @click.native="backtop" v-show="isShowbackTop"></back-top>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
  </div>
</template>

<script>
import detailNavBar from './childcomps/detailNavBar'
import { getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import detailSwiper from './childcomps/detailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import BScroll from 'components/common/bscroll/BScroll'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import { debounce } from 'components/common/utils/utils'
import DetailBottomBar from './childcomps//DetailBottomBar'
import BackTop from 'components/content/BackTop/BackTop'
export default {
  name:'Detail',
  data(){
    return {
      iid : null,
      topDetail : null,
      Goods:{},
      Shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[0,1000,2000,2800],//详情页导航控制栏各部分内容对应的高度
      getthemeTopYs:null,
      currentIndex:0,
      isShowbackTop : false,//默认值为false,不显示返回顶部图标
    }
  },
  components:{
    detailNavBar,//导航
    detailSwiper,//轮播图
    DetailBaseInfo,//商品信息
    DetailShopInfo,//店铺信息
    BScroll,//引入better-scroll
    DetailGoodsInfo,//商品详情
    DetailParamInfo,//商品参数
    DetailCommentInfo,//评论信息
    GoodsList,//商品列表
    DetailBottomBar,//底部工具栏
    BackTop//回到顶部
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid获取到数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //存放获取到的图片
      const data = res.result
      //获取轮播图
      this.topDetail = data.itemInfo.topImages
      //把数据存到一个类中
      this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //创建商铺信息
      this.Shop = new Shop(data.shopInfo)
      //添加商品详情
      this.detailInfo = data.detailInfo
      //商品参数
      this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //商品评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    //获取底部推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommend = res.data.list
    })
  },
  methods:{
    imageLoad(){//图片加载完成后刷新
      this.$refs.bscroll.refresh()
      this.getthemeTopYs = debounce(() => {//防抖，没生效
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      },500)
      this.getthemeTopYs()
      
    },
    titleClick(index){//点击标题跳转到内容部分
      this.$refs.bscroll.bscroll(0,-this.themeTopYs[index],200) 
    },
    contentBScroll(position){//
      // console.log(position.y)
      const length = this.themeTopYs.length // length = 4
      for(let i = 0;i<length;i++){
        //两种情况 1.i<3 , 2.i=3
        //this.currentIndex !== i 表示在范围内只输出一次，避免调用频繁


        // 第一种
        // if(this.currentIndex !== i && (i<length-1 && -position.y > this.themeTopYs[i] && -position.y < this.themeTopYs[i+1])|| (i === length-1 && -position.y > this.themeTopYs[i])){
        //   console.log(i)
        //   this.currentIndex = i
        //   this.$refs.navBar.currentIndex = this.currentIndex
        // }


        // 第二种，给themeTopYs数组多push一个最大值
        if(this.currentIndex !== i && -position.y > this.themeTopYs[i] && -position.y < this.themeTopYs[i+1]){
          console.log(i)
          this.currentIndex = i
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
      

      //返回顶部
      this.isShowbackTop = -position.y > 1000 //大于指定值，显示
    },
    backtop(){
      this.$refs.bscroll.bscroll(0,0,500)
    },
    addToCart(){//添加到购物车
    //获取加入购物车的商品数据
      const product = {}
      product.image = this.topDetail[0]
      product.desc = this.Goods.desc
      product.title = this.Goods.titles
      product.Price = this.Goods.realPrice
      product.iid = this.iid

      //将商品加到购物车
        //发出addCart事件,在store的actions中接收
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res)
      })

      //发出addCart事件,在store的mutations中接收
      // this.$store.commit('addCart',product).then(res => {
      //   console.log(res)
      // })
      
    }
  }
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .detail-content{
  overflow: hidden;
  height: calc(100%-44px);
} */
</style>