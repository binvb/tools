<script setup lang='ts'>
import { defineProps } from 'vue'

interface Item {
  index: number,
  avatar: string,
  content: string,
  time: Date
}

defineProps<{itemData: Item}>()

function getPicUrl() {
  const imgList = [
    'https://cdn.pixabay.com/photo/2022/06/29/10/38/job-7291427__340.png',
    'https://cdn.pixabay.com/photo/2020/08/07/11/57/raindrops-5470467__480.jpg',
    'https://cdn.pixabay.com/photo/2022/07/26/00/01/rain-7344787__240.png',
    'https://cdn.pixabay.com/photo/2022/02/15/13/00/building-7014904__340.jpg',
    'https://cdn.pixabay.com/photo/2022/07/24/01/57/whistling-kite-7340817__340.jpg',
    'https://cdn.pixabay.com/photo/2022/06/23/17/13/ball-7280265__340.jpg',
    'https://cdn.pixabay.com/photo/2021/05/04/20/57/woman-6229693__340.jpg'
  ]

  return imgList[Math.ceil(Math.random()*6)]
}
</script>
  
<template>
<div class="chat-item">
    <img class="avatar" :src="itemData.avatar" />
    <div class="bubble">
        <p v-if="itemData.content">{{itemData.content}}</p>
        <img  v-else :src=getPicUrl() />
        <div class="meta">
            <time class="posted-date">{{itemData.time}},第{{itemData.index}}条</time>
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