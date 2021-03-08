<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'TabBar'
}
</script>
<style scoped>
    #tab-bar{
        display: flex;
        justify-content:space-around;
        background: #f6f6f6;
        height: 49px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .1);
   }
  
</style>