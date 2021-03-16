<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot ='center'>购物街</div>
        </nav-bar>
        <tap-control class="tap-control" :title="['流行','新款','精选']" @tapclick='tapclick' ref="tapControl1" v-show="isTabFixed"></tap-control>
        <b-scroll class="content" ref="backclick" :probe-type='3' @back='click' :pullUpLoad='true' @pullingUp='loadMore'>
          <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
          <recommend-views :recommends='recommends'></recommend-views>
          <feature/>
          <tap-control class="tap-control" :title="['流行','新款','精选']" @tapclick='tapclick' ref="tapControl2"></tap-control>
          <goods-list :goods="showTap"></goods-list>
        </b-scroll>

        <back-top @click.native="backtop" v-show="isShowbackTop"></back-top>

    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TapControl from 'components/content/TapControl/TapControl'
import GoodsList from 'components/content/goods/GoodsList'
import BScroll from 'components/common/bscroll/BScroll'
import BackTop from 'components/content/BackTop/BackTop'

import HomeSwiper from './childcomps/HomeSwiper'
import RecommendViews from './childcomps/RecommendViews'
import Feature from './childcomps/Feature'

import { getHomeMultidata , getHomeGoods } from 'network/home'//请求封装函数
import { debounce } from 'components/common/utils/utils'
export default {
    name:'home',
    components:{
        NavBar,//顶部布局
        HomeSwiper,//轮播图
        RecommendViews,//轮播图下方推荐
        Feature,//本周流行
        TapControl,//移动控制
        GoodsList,//商品列表
        BScroll, //移动滚动条
        BackTop//回到顶部箭头
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},//流行
                'new':{page:0,list:[]},//新款
                'sell':{page:0,list:[]}//精选
            },
            currentType : 'pop',//默认类型为pop
            isShowbackTop : false,//默认值为false,不显示返回顶部图标
            tapOffetTop:0,//tapcontrol距离顶部高度，默认值为0,
            isTabFixed:false,
            saveY:0
        }
    },
    created(){
        this.getMultidata();//请求轮播图数据

        this.getGoods('pop');//请求商品信息数据
        this.getGoods('new');
        this.getGoods('sell');   
    },
    destroyed(){//销毁时调用
      console.log('1234');
    },
    activated(){//活跃时调用
      this.$refs.backclick.bscroll(0,this.saveY)//活跃时，立刻回到离开时所在位置
      this.$refs.backclick.refresh()
    },
    deactivated(){//不活跃时调用
      this.saveY = this.$refs.backclick.BScroll.y//获取离开时滑动区域位置
    },
    mounted(){
       //监听图片加载
       const refresh = debounce(this.$refs.backclick.refresh,200)
        this.$bus.$on('itemImageLoad',() => {//接受(BScroll.vue)发出的事件
          // this.$refs.backclick.BScroll.refresh()//每当加载一张图片就执行一次刷新，refresh() 刷新
          refresh();
        })
    },
    computed:{
        showTap(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        //方法
        tapclick(index){
            switch(index){//根据case值获取数据
                case 0:
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;
            }
            this.$refs.tapControl1.currentIndex = index
            this.$refs.tapControl2.currentIndex = index
        },
        backtop(){//回到顶部
          // console.log('backtop')
          this.$refs.backclick.bscroll(0,0,500)//前两个是坐标，第三个时间500ms
        },
        click(position){//接受传出的事件
        //判断backTop是否显示
          this.isShowbackTop = (-position.y) > 1000

          //判断tapcontrol是否吸顶（position:fixed）
          this.isTabFixed = (-position.y) > this.tapOffetTop;
        },
        loadMore(){//请求加载更多数据
          this.getGoods(this.currentType);
          this.$refs.backclick.BScroll.finishPullUp();
        },
        swiperImageLoad(){
          // console.log(this.$refs.tapControl.$el.offsetTop);
          this.tapOffetTop = this.$refs.tapControl2.$el.offsetTop;
        },
        


        //网络相关请求
        getMultidata(){
            getHomeMultidata().then(res => {
                // console.log(res);
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        getGoods(type){
            const page  = this.goods[type].page + 1;//获取page
            getHomeGoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list)// ... : 把res.data.list这个数组数据解析到this.goods[type].list数组里
                this.goods[type].page += 1;
            })
        }
    }
}
</script>
<style scoped>
#home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
}
.tap-control{
  position: relative;
  z-index: 9;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>