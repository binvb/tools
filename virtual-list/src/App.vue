<script setup lang="ts">
// import MyComponent from './../packages/index'
import MyComponent from './../dist/my-kit.es'
import ScrollItem from './components/ScrollItem.vue'
import { getMessage } from './mock'


let sourceData = getMessage(50000)
</script>
<template>
  <MyComponent.VirtualList :sourceData="sourceData" :initDataNum="20" :ScrollItemComponent="ScrollItem"></MyComponent.VirtualList>
</template>
<style lang="less" scoped>
.myTest {
  display: inline-block;
}
</style>