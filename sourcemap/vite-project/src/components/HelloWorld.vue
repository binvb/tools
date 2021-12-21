<script setup lang="ts">
import { ref, reactive } from 'vue'

interface User {
  name: string
  age: number | undefined
}

defineProps<{ msg: string }>()

const count = ref(0)
const user = reactive<User>({
  name: 'vb',
  age: undefined
})
sleep()

function test() {
  console.log((user.age as number).toFixed(2))
}
async function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // @ts-ignore
        console.log(a)
      } catch(e) {
        if (e instanceof TypeError) {
          console.log(e.stack)
          // statements to handle TypeError exceptions
        } else if (e instanceof RangeError) {
          console.log(e.stack)
          // statements to handle RangeError exceptions
        } else if (e instanceof EvalError) {
          console.log(e.stack)
          // statements to handle EvalError exceptions
        } else if(e instanceof ReferenceError) {
          console.log(e.stack)
        } else if( e instanceof Error) {
          console.log(e.stack)
        } else {
          console.log(e)
        }
      }
    },1000)
  })
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++, test()">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
