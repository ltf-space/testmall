<template>
  <div class="cart-list">
    <b-scroll class="content" :pullUpLoad='true' ref="scroll">
      <cart-list-item v-for="(item,index) in addList" :key="index" :item-info='item'></cart-list-item>
    </b-scroll>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import BScroll from 'components/common/bscroll/BScroll'
import cartListItem from './cartListItem'
export default {
  name:'cartList',
  components:{
    BScroll,
    cartListItem
  },
  data(){
    return {
    }
  },
  actived(){
    this.$refs.scroll.refresh()
  },
  computed:{
    ...mapGetters(['addList'])
  },
  methods:{
  }
}
</script>
<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>