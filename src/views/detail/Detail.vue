<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <b-scroll class="detail-content" :pullUpLoad='true' ref="bscroll">
      <detail-swiper :top-images='topDetail'></detail-swiper>
      <detail-base-info :goods='Goods'></detail-base-info>
      <detail-shop-info :shop='Shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramsInfo'></detail-param-info>
      <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
      <goods-list :goods='recommend'></goods-list>
    </b-scroll>
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
      recommend:[]
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
    GoodsList//商品列表
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid获取到数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      //存放获取到的图片
      const data = res.result
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
      console.log(res)
      this.recommend = res.data.list
    })
  },
  methods:{
    imageLoad(){//图片加载完成后刷新
      this.$refs.bscroll.BScroll.refresh()
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
  bottom: 0;
  left: 0;
  right: 0;
}
/* .detail-content{
  overflow: hidden;
  height: calc(100%-44px);
} */
</style>