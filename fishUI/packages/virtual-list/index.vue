<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref, onMounted, onUpdated, defineExpose, watch } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import { SourceData, ReactiveData, VirtualScrollExpose } from "./index.d"
import utils from './utils'
import resizeInstance from './resizeInstance'
import interSectionHandle from './interSectionHandle'
import dataHandle from './dataHandle'
import observeHandle from './observeHandle'
import scrollInstance from "./scrollInstance"

interface Props {
  sourceData: SourceData[]
  ScrollItemComponent: ComponentPublicInstance
  initDataNum: number
  retainHeightValue?: number
}

const props = defineProps<Props>()
const data = reactive<ReactiveData>({
  sourceData: [],
  currentData: [],
  currentScrollTop: 0
})
let listHeight = ref(0) // calculate list height real time
let locateIndex = ref(0)

// throttle wrapper
const onUpdatedThrottle = throttle(() => {
	calculateTransFormY()
}, 100)
const intersectionThrottle = throttle((entry: IntersectionObserverEntry) => {
	data.currentData = interSectionHandle.interAction(+entry.target.getAttribute('data-index')!, props.initDataNum, data.currentData, data.sourceData, {intersectionObserver, resizeObserver})
}, 100)

// scroll end by debounce
const onScrollEnd = debounce(() => {
	// quick scroll compensation
	let currrentScrollTop = document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTop
	let correctIndex = utils.getCurrentTopIndex(data.sourceData, currrentScrollTop)!
	let scope = data.currentData.slice(2, data.currentData.length - 2)

	scrollInstance().scrollEn()
	// exclude top && bottom
	if(correctIndex <= 2 || correctIndex >= data.sourceData.length - 2) {
		return false
	}
	if(!scope.find(item => item.index === correctIndex)) {
		locate(correctIndex)
	}
}, 50)

// resizeObserver & resizeObserver
const resizeObserver = new ResizeObserver((entries, observer) => {
	for (const entry of entries) {
		let {height} = entry.contentRect

		// when remove item, height resize 0
		if(!height) {
			return false
		}
		// console.log(`执行resize的index: ${entry.target.getAttribute('data-index')}`)
		resizeInstance.resizeHandle(data.currentData, data.sourceData, locateIndex.value)
	}
})
const intersectionObserver = new IntersectionObserver((entries) => {
	for(const entry of entries) {
		if(entry.intersectionRatio === 1 &&  scrollInstance().scrolling && !scrollInstance().ajusting && !resizeInstance.resizeRenderStatus) {
			intersectionThrottle(entry)
		}
	}
}, {threshold: [0, 1]})

// init data
data.sourceData = dataHandle.sourceDataInitail(JSON.parse(JSON.stringify(props.sourceData)), props.retainHeightValue)
data.currentData = utils.getInitData(data.sourceData, props.initDataNum)
listHeight.value = data.sourceData[data.sourceData.length - 1]?.transformY || 0

// life cycle
onMounted(() => {
	observeHandle.observe(data.currentData, {resizeObserver, intersectionObserver})
	scrollInstance(onScrollEnd)
	resizeInstance.resizeHandle(data.currentData, data.sourceData)
})
onUpdated(() => {
	onUpdatedThrottle()
	setTimeout(() => {
		resizeInstance.setResizeStatus(false)
	},0)
})
watch(() => props.sourceData, (currentValue, preValue) => {
	if(preValue.length) {
		console.warn(`do not change prop sourceData direct, use component expose funciton, e.g. del/update/add/reassignment`)
	}
}, {deep: true})

// expose
defineExpose<VirtualScrollExpose>({
	locate,
	del: (index) => {
		dataHandle.del(index, data.sourceData, data.currentData, {resizeObserver, intersectionObserver}, props.initDataNum, props.retainHeightValue)
		calculateTransFormY()
	},
	add: (index, insertData) => {
		dataHandle.add(index, insertData, data.sourceData, data.currentData, {resizeObserver, intersectionObserver}, props.initDataNum, props.retainHeightValue)
		calculateTransFormY()
	},
	update: (index, _data) => {
		dataHandle.update(index, _data, data.sourceData)
	},
	reassignment: (_data) => {
		dataHandle.reassignment(_data, data.sourceData, data.currentData, {resizeObserver, intersectionObserver}, props.initDataNum, props.retainHeightValue)
		calculateTransFormY()
	}
})

function locate(index: number) {
	// ajust row data
	dataHandle.getSourceDataAfterResize(data.sourceData, index)

	let item = data.sourceData[index]
	let locatePosition = item.transformY

	locateIndex.value = item.index!
	scrollInstance().ajustAction(locatePosition) 
	data.currentData = interSectionHandle.interAction(index, props.initDataNum, data.currentData, data.sourceData, {intersectionObserver, resizeObserver})
}

function calculateTransFormY() {
	let lastItem = data.currentData[data.currentData.length - 1]

	if(lastItem) {
		let height = lastItem.offsetHeight + lastItem.transformY

		// only increases
		if(height > listHeight.value) {
			listHeight.value = height
		}
	}
}
</script>
<template>
	<div class="fishUI-virtual-list-wrapper">
		<ul class="fishUI-virtual-list" :style="{height: `${listHeight}px`}">
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
	</div>
</template>

<style scoped>
.fishUI-virtual-list-wrapper {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
}
.fishUI-virtual-list li {
	width: 100%;
	list-style: none;
}
</style>