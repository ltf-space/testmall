<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>
<script>
import navBar from 'components/common/navbar/NavBar'
import cartList from './childcomps/cartList'
import cartButtonBar from './childcomps/cartButtonBar'
import { mapGetters} from 'vuex'
export default {
    name:'shopcar',
    components:{
      navBar,//导航
      cartList,//商品列表
      cartButtonBar//底部工具栏
    },
    computed:{
      // cartLength(){
      //   return this.$store.state.addList.length
      // }

      // ...mapGetters 可以将store getters中的函数传到computed计算属性里
      ...mapGetters([
        'cartLength'
      ])
    }
}
</script>
<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  
}
</style>