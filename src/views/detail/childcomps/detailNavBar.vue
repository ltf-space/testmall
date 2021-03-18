<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" 
          :key="index" class="titles-item" 
          :class="{avtive:currentIndex === index}" 
          @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'detailNavBar',
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex : 0
    }
  },
  components:{
    NavBar
  },
  methods:{
    titleClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){//监听返回
      this.$router.back()//返回上一步 go(-1)相等于back()
    }
  }
}
</script>
<style scoped>
.titles{
  display: flex;
  font-size: 14px;
  justify-content: space-evenly;
}
.avtive{
  color: var(--color-high-text);
}
.back img{
  margin-top: 10px;
}
</style>