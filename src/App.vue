<template>
  <div id="app">
    <router-view/>
   <min-tab-bar/>
  </div>
</template>

<script>
import MinTabBar from './components/content/mintabbar/MinTabBar'
export default {
  name: 'App',
  components: {
     MinTabBar
 }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
