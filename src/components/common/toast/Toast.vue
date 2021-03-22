<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  components:{},
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
      show(message,duration){
        this.message = message;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        },duration)
      }
  }
}
</script>
<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.6);
  box-shadow: 1px 3px 2px rgba(0,0,0,.8);
  z-index: 99;
}
</style>