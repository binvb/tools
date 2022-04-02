<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
import VirtualList from "./../packages/virtual-list/index.vue";
// import VirtualList from './../es/virtual-list/index.js'
// import './../es/virtual-list/style.css'
import ScrollItem from "./components/ScrollItem.vue";
import { getMessage } from "./mock";

let sourceData = getMessage(50000);
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance
function toast() {
  // (proxy as ComponentPublicInstance<{$toast: (message: string, duration?: number) => {}}>).$toast('test in setup')
  proxy?.$toast('test', 10000)
}
</script>
<template>
  <button @click="toast">测试</button>
  <div>
    <VirtualList
      :sourceData="sourceData"
      :initDataNum="20"
      :ScrollItemComponent="ScrollItem"
    ></VirtualList>
  </div>
</template>
<style lang="less" scoped>
.myTest {
  display: inline-block;
}
</style>
