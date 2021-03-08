<template>
        <div id="tab-bar-item" @click="itemclick">
            <div v-if="!isActive"><slot name="item-icon"></slot></div>
            <!-- <slot v-if="!isActive" name="item-icon"></slot> -->
            <div v-else><slot name="item-icon-active"></slot></div>
            <!-- <slot v-else name="item-icon-active"></slot> -->
            <div :style="activeStyle"><slot name="item-text"></slot></div>
        </div>
</template>
<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            //默认颜色
            default:'blue'
        }
    },
    data(){
        return{
            // isActive:false
        }
    },
    computed:{
        isActive(){
            // /home->item1(/home) = true
            // /home->item1(/category) = false
            // 哪个路由活跃哪个就是$route，不等于-1说明this.$route.path包含this.path为true
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor}:{}
        }
    },
    methods:{
        itemclick(){
            this.$router.push(this.path)
        }
    }
}
</script>
<style scoped>
    #tab-bar-item{
        font-size: 14px;
        text-align: center;
        flex: 1;
    }
    #tab-bar-item img{
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
</style>