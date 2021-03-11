<template>
    <div class="tap-control">
        <div v-for="(item,index) in title" :key="index" class="tap-control-item" :class="{active:index === currentIndex}"  @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TapControl',
    props:{
        title:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        itemclick(index){
            this.currentIndex = index;
            this.$emit('tapclick',index);//向外传出tapclick事件
        }
    }
}
</script>
<style scoped>
.tap-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
}
.tap-control-item{
    flex: 1;
}
.active{
    color: var(--color-high-text);
}
span{
    padding: 2px;
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>