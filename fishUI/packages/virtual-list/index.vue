<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref, onMounted, nextTick } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'
import throttle from 'lodash/throttle'
import { SourceData, ReactiveData } from "./index.d"
import utils from './utils'
import resizeHandle from './resizeHandle'
import interSectionHandle from './interSectionHandle'

interface Props {
  sourceData: SourceData[]
  ScrollItemComponent: ComponentPublicInstance
  initDataNum: number
}

const props = defineProps<Props>()
const data = reactive<ReactiveData>({
  sourceData: props.sourceData,
  currentData: [],
  currentScrollTop: 0
})
const resizeThrottle = throttle((entry) => {
	resizeHandle(entry, data.currentData)
}, 100)
const intersectionThrottle = throttle((entry) => {
	data.currentData = interSectionHandle(entry, props.initDataNum, data.currentData, props.sourceData, {intersectionObserver, resizeObserver})
}, 100)
// dom resize observer
const resizeObserver = new ResizeObserver((entries, observer) => {
	for (const entry of entries) {
		resizeThrottle(entry)
	}
})
// inter section observer
let intersectionObserver = new IntersectionObserver((entries) => {
	for(const entry of entries) {
		if(!intersectionFlag.value) {
			return false
		}
		if(entry.intersectionRatio === 1) { // only consider visible situation 
			intersectionThrottle(entry)
		}
	}
}, {threshold: [0, 1]})
let intersectionFlag = ref(false) // avoid initail calculate

onMounted(() => {
	observe()
	// observer after window scroll
	window.onscroll = () => {
		intersectionFlag.value = true
	}
})

// init data
utils.dataAddIndex(data.sourceData)
data.currentData = utils.getInitData(data.sourceData, props.initDataNum)

// observe resizeObserver and insertSectionObserver
function observe() {
	document.querySelectorAll('.fishUI-virtual-list li').forEach(el => {
		resizeObserver.observe(el)
		intersectionObserver.observe(el)
	})
}
</script>
<template>
  <ul class="fishUI-virtual-list">
	<template v-for="item in data.currentData" :key="item.index">
      <li
        :data-index="item.index"
        :data-offsetHeight="item.offsetHeight"
        :style="{
          position: 'absolute',
          transform: `translateY(${item.transformY || 0}px)`,
        }"
      >
        <component :is="props.ScrollItemComponent" :itemData="item" />
      </li>
	</template>
  </ul>
</template>

<style>
	.fishUI-virtual-list li {
		list-style: none;
	}
</style>