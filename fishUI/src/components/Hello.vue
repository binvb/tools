<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollItem from './ScrollItem.vue'
import { getMessage } from "./../mock";
interface User{
  name: string
}
const props = defineProps<User>()
const emit = defineEmits(['update:name', 'update:locate'])
const virtualScroll = ref()

onMounted(() => {
  virtualScroll.value.setSourceData(getMessage(40))
})

function itemClick() {
  // emit('update:name', 'fish')
  emit('update:locate', 10)
}
</script>
<template>
  <div>
    <h1>name: {{name}}</h1>
    <button @click="itemClick">button</button>
          <VirtualList
        :initDataNum="20"
        :ScrollItemComponent="ScrollItem"
        :retainHeightValue="100"
        ref="virtualScroll"
      ></VirtualList>
  </div>  
</template>