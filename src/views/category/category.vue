<template>
    <div class="wrapper">
        <ul class="content">
            <button  @click="btn">点击</button>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
            <li>分类列表</li>
        </ul>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'category',
    data(){
        return{
            scroll : null
        }
    },
    mounted(){// mounted :组件创建后，模板已挂载

        //默认情况下BScroll是不可以实时监听滚动位置的、
        //probe 监测
        // 0 1 都是不监听实时位置
        // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动过程不检测
        // 3 在手指滚动及手指离开后的惯性滚动过程都实时检测
        this.scroll = new BScroll(".wrapper",{
            probeType:3,
            click:false,
            pullUpLoad:true
        })//第一个参数为最外层父元素，且里面只放一个亲子元素 。比如wrapper下只有一个content
        this.scroll.on('scroll',position => {
            // console.log(position)
        })
        this.scroll.on('pullingUp',() => {
            console.log("上拉加载更多");
            //发送网络请求，请求更多页数据
            //当数据请求完成后，并且将新的数据展示出来后，再调用下边函数
            setTimeout(() => {
                this.scroll.finishPullUp();//当调用这个函数时，说明上拉加载更多已经完成,才能加载下一次上拉加载更多
            },2000)
            
        })
    },
    methods:{
        btn(){
            console.log('........');
        }
    }
}
</script>
<style scoped>
.wrapper{
    height: 200px;
    background: brown;
    overflow: hidden;
}
</style>