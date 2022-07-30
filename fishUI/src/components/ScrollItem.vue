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
    'https://i0.hippopx.com/photos/683/318/324/wolf-wolves-snow-wolf-landscape-thumb.jpg',
    'https://i0.hippopx.com/photos/242/966/413/dawn-sun-mountain-landscape-thumb.jpg',
    'https://i0.hippopx.com/photos/146/950/505/legs-window-car-dirt-road-thumb.jpg',
    'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
    'https://i0.hippopx.com/photos/20/987/594/woman-young-rain-pond-thumb.jpg',
    'https://i0.hippopx.com/photos/249/978/424/meditation-buddhism-monk-temple-thumb.jpg',
    'https://i0.hippopx.com/photos/799/203/747/trees-avenue-autumn-away-thumb.jpg'
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