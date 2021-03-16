<template>
    <div class="goods-item" @click="itemclick">
        <img :src="showImage" alt="" @load="itemImageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      itemImageLoad(){//监听图片加载完成
        //向外(home.vue)发出事件总线
          this.$bus.$emit('itemImageLoad')
      },
      itemclick(){//点击商品跳转详情页
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
}
</script>
<style scoped>
.goods-item{
    /* padding-bottom: 40px; */
    position: relative;
    width: 50%;
    padding: 0 10px 40px;
}
.goods-item img{
    width: 100%;
    border-radius: 5px;
}
.goods-info{
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    text-align: center;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url('~assets/images/common/collect.svg') 0 0/14px 14px;
}
</style>