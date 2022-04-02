<script setup lang='ts'>
import './index.css'
import "tailwindcss/tailwind.css"

interface Props {
  message: string
}

const props = defineProps<Props>()
</script>
  
<template>
  <div class="text-xl font-medium text-black text-1000">{{props.message}}</div>
</template>