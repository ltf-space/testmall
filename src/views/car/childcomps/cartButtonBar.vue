<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button :is-checked='isSelectAll' @click.native="checkClick" class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate">去计算:({{checkcount}})</div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'
export default {
  name:'cartButtonBar',
  components:{
    checkButton
  },
  data(){
    return {
    }
  },
  computed:{
    totalPrice(){
      return this.$store.state.addList.filter(item => {//过滤器,以数组的形式返回被选中的
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.Price * item.count;
      },0).toFixed(2)
    },
    checkcount(){//计算选中商品的数量
        return this.$store.state.addList.filter(item => {
          return item.checked
        }).length
    },
    isSelectAll(){//是否全选
      if(this.$store.state.addList.length == 0) return false

      // return !(this.$store.state.addList.filter(item =>  !item.checked ).length)
      return !this.$store.state.addList.find(item => !item.checked )
    }
   
  },
  methods:{
    checkClick(){//全选按钮
      if(this.isSelectAll){//如果全部选中，则全部取消
        this.$store.state.addList.forEach(item => item.checked = false);
      }else{
        this.$store.state.addList.forEach(item => item.checked = true);
      }
    }
  }
}
</script>
<style scoped>
.button-bar{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
}
.check-content{
  display: flex;
  margin-left: 10px;
  align-items: center;
}
.check-button{
  display: flex;
  margin-right: 5px;
}
.price{
  margin-left: 5px;
}
.calculate{
  width: 80px;
  background-color: rgba(196, 189, 197, 0.219);
  position: absolute;
  right: 0;
}
</style>