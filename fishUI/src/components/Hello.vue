<script setup lang="ts">
interface User{
  name: string
}
const props = defineProps<User>()
const emit = defineEmits(['update:name', 'update:locate'])

function itemClick() {
  // emit('update:name', 'fish')
  emit('update:locate', 10)
}
</script>
<template>
  <div>
    <h1>name: {{name}}</h1>
    <button @click="itemClick">button</button>
  </div>  
</template>