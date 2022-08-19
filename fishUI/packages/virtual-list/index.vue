<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref, onMounted, onUpdated, onBeforeUnmount ,defineExpose, withDefaults, nextTick } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import 'intersection-observer'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import Loading from './loading.vue'
import { ReactiveData, VirtualScrollExpose, Direction, LoadingFn } from "./index.d"
import utils from './utils'
import resizeInstance from './resizeInstance'
import interSectionHandle from './interSectionHandle'
import dataHandle from './dataHandle'
import observeHandle from './observeHandle'
import scrollInstance from "./scrollInstance"

interface Props {
  ScrollItemComponent: ComponentPublicInstance
  initDataNum: number
  retainHeightValue?: number
  direction?: Direction
  loadingFn?: LoadingFn
}

const props = withDefaults(defineProps<Props>(), {
	initDataNum: 20,
	direction: 'down'
})
const data = reactive<ReactiveData>({
  sourceData: [],
  currentData: [],
  loading: false
})
let listHeight = ref(0) // calculate list height real time

// throttle wrapper
const onUpdatedThrottle = throttle(() => {
	calculateTransFormY()
}, 100)

// quick scroll compensation
const checkIfCorrectPosition = debounce(() => {
	let currrentScrollTop = utils.getScrollTop()
	let correctIndex = utils.getCurrentTopIndex(data.sourceData, currrentScrollTop)!
	let scope = data.currentData.slice(0, data.currentData.length)

	scrollInstance().scrollEn()
	if(!scope.find(item => item.index === correctIndex)) {
		locate(correctIndex)
	}
}, 10)

// resizeObserver
const resizeObserver = new ResizeObserver((entries, observer) => {
	for (const entry of entries) {
		let {height} = entry.contentRect

		if(!height) {
			return false
		}
		resizeInstance.resizeHandle(data.currentData, data.sourceData)
	}
})
// intersectionObserver
const intersectionObserver = new IntersectionObserver((entries) => {
	for(const entry of entries) {
		let currentIndex = entry.target.getAttribute('data-index')
		let lastIndex = props.direction === 'up' ? 0 : data.sourceData[data.sourceData.length - 1].index

		if(entry.intersectionRatio === 1 &&  scrollInstance().scrolling && !scrollInstance().ajusting) {
			data.currentData = interSectionHandle.interAction(+entry.target.getAttribute('data-index')!, props.initDataNum, data, {intersectionObserver, resizeObserver})
		}
		// if it's last item and loading mode, should trigger loadingFn
		if(entry.intersectionRatio > 0 && lastIndex === +currentIndex! && props.loadingFn && !data.loading && scrollInstance().scrolling && !scrollInstance().ajusting) {
			data.loading = true
			props.loadingFn().then((res) => {
				data.loading = false
				if(props.direction === 'up') {
					dataHandle.add(0, res, data, {resizeObserver, intersectionObserver}, props)
					locate(data.currentData[0].index)
				} else {
					dataHandle.add(data.sourceData[data.sourceData.length - 1].index, res, data, {resizeObserver, intersectionObserver}, props)
				}
			})
		}
	}
}, {threshold: [0, 1]})

// life cycle
onMounted(() => {
	observeHandle.observe(data.currentData, {resizeObserver, intersectionObserver})
	scrollInstance(checkIfCorrectPosition)
	resizeInstance.resizeHandle(data.currentData, data.sourceData)
})
onUpdated(() => {
	onUpdatedThrottle()
	setTimeout(() => {
		resizeInstance.setResizeStatus(false)
	},0)
})
onBeforeUnmount(() => {
	scrollInstance().destroy()
})

// expose
defineExpose<VirtualScrollExpose>({
	locate,
	del: (index) => {
		dataHandle.del(index, data, {resizeObserver, intersectionObserver}, props)
		calculateTransFormY()
	},
	add: (index, insertData) => {
		dataHandle.add(index, insertData, data, {resizeObserver, intersectionObserver}, props)
		calculateTransFormY()
	},
	update: (index, _data) => {
		dataHandle.update(index, _data, data.sourceData)
	},
	setSourceData: (_data) => {
		//if data.source.length === 0, initail render 
		if(!data.sourceData.length) {
			nextTick(() => {
				// if direction === 'up', then scroll to bottom
				if(props.direction === 'up' && props.loadingFn) {
					locate(data.sourceData[data.sourceData.length - 1].index)
				}
			})
		}
		dataHandle.setSourceData(_data, data, {resizeObserver, intersectionObserver}, props)
		calculateTransFormY()
	},
	getData() {
		return data.sourceData
	}
})

function locate(index: number) {
	if(!data.sourceData.length) {
		return
	}
	// ajust row data
	dataHandle.getSourceDataAfterResize(data.sourceData, index)

	let item = data.sourceData[index]
	let locatePosition = item.transformY

	scrollInstance().locatePosition(locatePosition) 
	data.currentData = interSectionHandle.interAction(index, props.initDataNum, data, {intersectionObserver, resizeObserver})
}

function calculateTransFormY() {
	let lastItem = data.sourceData[data.sourceData.length - 1]

	if(lastItem) {
		let height = lastItem.offsetHeight + lastItem.transformY

		listHeight.value = height
	}
}
</script>
<template>
	<div class="fishUI-virtual-list-wrapper">
		<Loading v-if="props.loadingFn && props.direction === 'up' && data.loading"></Loading>
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
		<Loading v-if="props.loadingFn && direction === 'down' && data.loading"></Loading>
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
.fishUI-virtual-list>li {
	width: 100%;
	list-style: none;
}
</style>