<template>
  <div class="check-button">
    <!-- <img src="~assets/images/cart/tick.svg" alt="" @click="checkBtnClick"> -->
    <img src="~assets/images/cart/tick.svg" alt="" :class="{check:isChecked}">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  components:{},
  data(){
    return {
    }
  },
  // methods(){
  //   this.$emit('checkBtnClick')
  // }
}
</script>
<style scoped>
.check-button{
  border: 1px solid rgba(15, 56, 102, 0.9);
  border-radius: 50%;
}
.check-button img{
  border-radius: 50%;
}
.check{
  border:1px solid rgba(160, 11, 11, 0.911);
  background-color: rgba(160, 11, 11, 0.911);
}
</style>