<template>
    <div class="wrapper">
        <ul class="content">
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
    mounted(){//组件创建后，模板已挂载
        this.scroll = new BScroll(".wrapper",{})//第一个参数为最外层父元素，且里面只有一个子元素 。比如wrapper下只有一个content
        console.log(document.querySelector('.wrapper'))
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