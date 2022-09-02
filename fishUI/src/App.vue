<script setup lang="ts">
import { ref, reactive, getCurrentInstance, ComponentInternalInstance, watch, computed,  onMounted, provide } from 'vue'
import ScrollItem from "./components/ScrollItem.vue";
import Loading from './components/loading.vue'
import { getMessage } from "./mock";

const data = reactive({
    userList: getMessage(100),
    userSet: new Set(),
    addNum: 0
})
const locate = ref(0)
const delNum = ref(0)
const updateNum = ref(0)
const virtualScroll = ref()
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance
const loadingOptions = reactive({
  loadingFn: loadData,
})
onMounted(async() => {
  virtualScroll.value.setSourceData(await loadData())
})

provide<Function>('add', add)

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
function add() {
  virtualScroll.value?.add(data.addNum, getMessage(1))
}
function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMessage(100000))
    },2000)
  })
}
async function updateAll() {
  virtualScroll.value.setSourceData(await loadData())
}
function change() {
  // setTimeout(() => {
  //   virtualScroll.value?.setSourceData(getMessage(200))
  // }, 10000)
}
change()
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
    <div>
      <input v-model="data.addNum" type="number" placeholder="输入增加位置" />
      <button @click="add">增加数据</button>
    </div>
    <div style="margin: 100px;width: 1000px; height: 900px;border: 1px solid #000;">
      <VirtualList
        :initDataNum="20"
        :ScrollItemComponent="ScrollItem"
        :retainHeightValue="100"
        :loadingOptions="loadingOptions"
        direction="up"
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
