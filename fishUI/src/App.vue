<script setup lang="ts">
// import MyComponent from "./../packages/virtual-list/index.vue";
import MyComponent from './../dist/virtual-list/index.es.js'
// import MyComponent from './../dist/vue-virtual-scroll.es'
// import MyComponent from './../dist/packages/virtual-list/index.js'
import ScrollItem from "./components/ScrollItem.vue";
import { getMessage } from "./mock";

let sourceData = getMessage(50000);
</script>
<template>
  <MyComponent
    :sourceData="sourceData"
    :initDataNum="20"
    :ScrollItemComponent="ScrollItem"
  ></MyComponent>
</template>
<style lang="less" scoped>
.myTest {
  display: inline-block;
}
</style>
