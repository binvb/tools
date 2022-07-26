<script setup lang='ts'>
import { defineProps } from 'vue'
interface Item {
  avatar: string,
  content: string,
  time: string
}

defineProps<{itemData: Item}>()

function getPicUrl() {
  const imgList = [
    'https://cdn.pixabay.com/photo/2022/06/29/10/38/job-7291427__340.png',
    'https://cdn.pixabay.com/photo/2022/06/21/23/11/asian-7276658__340.jpg',
    'https://cdn.pixabay.com/photo/2022/07/16/15/34/kid-7325370__340.jpg',
    'https://cdn.pixabay.com/photo/2022/07/12/15/36/tree-7317683__340.jpg',
    'https://cdn.pixabay.com/photo/2022/02/08/15/48/frog-7001629__340.png',
    'https://cdn.pixabay.com/photo/2022/07/06/07/46/lavender-7304564__340.jpg'
  ]

  return imgList[Math.ceil(Math.random()*6)]
}
</script>
  
<template>
<div class="chat-item">
    <img class="avatar" :src="itemData.avatar" />
    <div class="bubble">
        <p v-if="itemData.content">{{itemData.content}}</p>
        <img v-else :src=getPicUrl() />
        <div class="meta">
            <time class="posted-date">{{itemData.time}}</time>
        </div>
    </div>
</div>
</template>
<style lang="less" scoped>
.chat-item {
  display: flex;
  padding: 10px 0;
  width: 100%;
  contain: layout;
  will-change: transform;
  p {
      margin: 0;
      word-wrap: break-word;
      font-size: 13px;
  }
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 500px;
  margin-left: 20px;
  margin-right: 6px;
  min-width: 48px;
}
.bubble {
  padding: 7px 10px;
  color: #333;
  background: #fff;
  box-shadow: 0 3px 2px rgba(0,0,0,0.1);
  position: relative;
  margin: 0 5px;
}
.meta {
  font-size: 0.8rem;
  color: #999;
  margin-top: 3px;
}
</style>