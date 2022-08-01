<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import VirtualList from "./../packages/virtual-list/index.vue";
// import VirtualList from './../es/virtual-list/index.js'
// import './../es/virtual-list/style.css'
import ScrollItem from "./components/ScrollItem.vue";
import { getMessage } from "./mock";

export interface VirtualScrollExpose {
  locate: (index: number) => void 
}

let sourceData = getMessage(50000);
const locate = ref(0)
const virtualScroll = ref<VirtualScrollExpose>()
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance
function toast() {
  // (proxy as ComponentPublicInstance<{$toast: (message: string, duration?: number) => {}}>).$toast('test in setup')
  proxy?.$toast('test', 10000)
}

function submit() {
  virtualScroll.value?.locate(locate.value)
}
</script>
<template>
  <div>
    <input v-model="locate" type="number" placeholder="输入滚动元素索引值" />
    <button @click="submit">确定</button>
  </div>
  <div style="margin: 100px;width: 1000px; height: 900px;border: 1px solid #000;">
    <VirtualList
      :sourceData="sourceData"
      :initDataNum="20"
      :ScrollItemComponent="ScrollItem"
      ref="virtualScroll"
    ></VirtualList>
  </div>
</template>
<!-- <template>
  <div style="margin: 100px;width: 800px; height: 900px;overflow-y: scroll;border: 1px solid #000;">
    <ul v-for="item in sourceData" :key="item.index">
      <li>
        <ScrollItem :itemData="item"></ScrollItem>
      </li>
    </ul>
  </div>
</template> -->
<style lang="less" scoped>
.myTest {
  display: inline-block;
}
</style>
