<template>
  <div class="topback">
    <img src="~assets/images/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  components:{},
  data(){
    return {
    }
  },
}
</script>
<style scoped>
.topback{
  position: fixed;
  right: 8px;
  bottom: 50px;
}
.topback img{
  width: 43px;
  height: 43px;
}
</style>