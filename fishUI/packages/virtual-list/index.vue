<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref, onMounted, onUpdated } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'
import throttle from 'lodash/throttle'
import { SourceData, ReactiveData } from "./index.d"
import utils from './utils'
import sizeHandle from './sizeHandle'
import interSectionHandle from './interSectionHandle'

interface Props {
  sourceData: SourceData[]
  ScrollItemComponent: ComponentPublicInstance
  initDataNum: number
}

const props = defineProps<Props>()
const data = reactive<ReactiveData>({
  sourceData: [],
  currentData: [],
  currentScrollTop: 0
})
let intersectionFlag = ref(false) // flag to avoid intersectionObserver initail calculate

// throttle wrapper
const resizeThrottle = throttle((entry) => {
	sizeHandle.resizeHandle(entry, data.currentData, data.sourceData)
}, 100)
const intersectionThrottle = throttle((entry) => {
	data.currentData = interSectionHandle(entry, props.initDataNum, data.currentData, data.sourceData, {intersectionObserver, resizeObserver})
}, 100)
const onUpdatedThrottle = throttle(() => {
	sizeHandle.boundSize(data.currentData, data.sourceData)
}, 100)

// resizeObserver & resizeObserver
const resizeObserver = new ResizeObserver((entries, observer) => {
	for (const entry of entries) {
		resizeThrottle(entry)
	}
})
const intersectionObserver = new IntersectionObserver((entries) => {
	for(const entry of entries) {
		if(!intersectionFlag.value) {
			return false
		}
		if(entry.intersectionRatio === 1) {
			intersectionThrottle(entry)
		}
	}
}, {threshold: [0, 1]})

// init data
data.sourceData = utils.dataAddIndex(props.sourceData)
data.currentData = utils.getInitData(data.sourceData, props.initDataNum)

// life cycle
onMounted(() => {
	sizeHandle.boundSize(data.currentData, data.sourceData)
	observe()
	window.onscroll = () => {
		intersectionFlag.value = true
	}
})
onUpdated(() => {
	onUpdatedThrottle()
})

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

<style scoped>
.fishUI-virtual-list li {
	list-style: none;
}
</style>