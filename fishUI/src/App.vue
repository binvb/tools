<script setup lang="ts">
import { ref, reactive, getCurrentInstance, ComponentInternalInstance, watch, computed,  onMounted, shallowRef } from 'vue'
import ScrollItem from "./components/ScrollItem.vue";
import Hello from './components/Hello.vue'
import { getMessage } from "./mock";
import {useCounterStore} from './store/index'

const data = reactive({
    userList: getMessage(100),
    userSet: new Set(),
})
const locate = ref(0)
const delNum = ref(0)
const updateNum = ref(0)
const virtualScroll = ref()
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance
onMounted(() => {
  virtualScroll.value.setSourceData(getMessage(20))
})

function toast() {
  // (proxy as ComponentPublicInstance<{$toast: (message: string, duration?: number) => {}}>).$toast('test in setup')
  proxy?.$toast('test', 50000)
}

function submit() {
  virtualScroll.value?.locate(locate.value)
}
function del() {
  virtualScroll.value?.del(delNum.value)
}
function update() {
  virtualScroll.value?.update(updateNum.value, getMessage(1)[0])
}
</script>
<template>
  <div class="myModule">
    <div>
      <input v-model="locate" type="number" placeholder="输入滚动元素索引值" />
      <button @click="submit">跳转到</button>
    </div>
    <div>
      <input v-model="delNum" type="number" placeholder="输入滚动元素索引值" />
      <button @click="del">删除</button>
    </div>
    <div>
      <input v-model="updateNum" type="number" placeholder="输入滚动元素索引值" />
      <button @click="update">更新</button>
    </div>
    <div style="margin: 100px;width: 1000px; height: 900px;border: 1px solid #000;">
      <VirtualList
        :initDataNum="20"
        :ScrollItemComponent="ScrollItem"
        :retainHeightValue="100"
        ref="virtualScroll"
      ></VirtualList>
    </div>
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
.myModule {
  padding: 20px;
}
.myTest {
  display: inline-block;
}
input {
  width: 80px;
  border: 1px solid #eee;
}
button {
  padding: 5px; 
  border: 1px solid #333;
  border-radius: 4px;
}
</style>
