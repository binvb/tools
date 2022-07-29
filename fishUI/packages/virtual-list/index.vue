<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref, onMounted, onUpdated, watch, defineExpose } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'
import throttle from 'lodash/throttle'
import { SourceData, ReactiveData } from "./index.d"
import utils from './utils'
import sizeHandle from './sizeHandle'
import interSectionHandle from './interSectionHandle'
import rowDataHandle from './rowDataHandle'
import scrollInstance from "./scrollInstance"

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
let listHeight = ref(0) // calculate list height real time

// throttle wrapper
const resizeThrottle = throttle((entry) => {
	sizeHandle.resizeHandle(entry, data.currentData, data.sourceData)
}, 100)
const intersectionThrottle = throttle((entry) => {
	const currentIndex = +entry.target.getAttribute('data-index')

	data.currentData = interSectionHandle.interAction(currentIndex, props.initDataNum, data.currentData, data.sourceData, {intersectionObserver, resizeObserver})
}, 100)
const onUpdatedThrottle = throttle(() => {
	sizeHandle.boundSize(data.currentData, data.sourceData)
	calculateTransFormY()
}, 100)

// resizeObserver & resizeObserver
const resizeObserver = new ResizeObserver((entries, observer) => {
	for (const entry of entries) {
		resizeThrottle(entry)
	}
})
const intersectionObserver = new IntersectionObserver((entries) => {
	for(const entry of entries) {
		if(entry.intersectionRatio === 1 && scrollInstance().scrolling) {
			intersectionThrottle(entry)
		}
	}
}, {threshold: [0, 1]})

// init data
data.sourceData = utils.dataAddIndex(props.sourceData)
data.currentData = utils.getInitData(data.sourceData, props.initDataNum)
listHeight.value = data.sourceData[data.sourceData.length - 1].transformY

// life cycle
onMounted(() => {
	sizeHandle.boundSize(data.currentData, data.sourceData)
	interSectionHandle.observeHandle('add', data.currentData, {resizeObserver, intersectionObserver})
})
onUpdated(() => {
	onUpdatedThrottle()
})

// expose
defineExpose({
	locate
})

function locate(index: number) {
	// ajust row data
	rowDataHandle.ajustRowData(data.sourceData, index)

	let item = data.sourceData[index]
	let locatePosition = item.transformY

	document.querySelector('.fishUI-virtual-list')?.parentElement?.scrollTo(0, locatePosition)
	// make sure after scroll
	setTimeout(() => {
		data.currentData = interSectionHandle.interAction(index, props.initDataNum, data.currentData, data.sourceData, {intersectionObserver, resizeObserver})
	}, 0)
}

function calculateTransFormY() {
	let lastItem = data.currentData[data.currentData.length - 1]
	let height = lastItem.offsetHeight + lastItem.transformY

	// only increases
	if(height > listHeight.value) {
		listHeight.value = height
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
.fishUI-virtual-list {
	position: relative;
}
.fishUI-virtual-list li {
	list-style: none;
}
</style>