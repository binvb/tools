<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import ScrollItem from './ScrollItem.vue'
import { getMessage } from "./../mock";
interface User{
  name: string
}
const props = defineProps<User>()
const emit = defineEmits(['update:name', 'update:locate'])
const virtualScroll = ref()
const parent = ref()
const myFn = inject<Function>('add', () => {})

onMounted(() => {
  virtualScroll.value.setSourceData(getMessage(2))
  let children = parent.value.querySelector('li')
  console.log(children, 'check')
})
</script>
<template>
  <div ref="parent" style="display: flex; flex-direction: column;max-height: 300px;border: 1px solid #000;">
      <VirtualList
        :initDataNum="20"
        :ScrollItemComponent="ScrollItem"
        :retainHeightValue="100"
        ref="virtualScroll"
      ></VirtualList>
  </div>  
</template>