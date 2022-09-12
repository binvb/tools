import {nextTick} from 'vue'
import utils from './utils'
import { ReactiveData } from "./index.d"

// onScrollEnd is a debounce function
export function scrollEvent(scrollDebounceFn: Function, data: ReactiveData) {
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.addEventListener('wheel', onScrolling.bind(null, data, scrollDebounceFn))
}

export function removeScrollEvent(data: ReactiveData) {
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.removeEventListener('wheel', onScrolling.bind(null, undefined, undefined))
}

function onScrolling(data:ReactiveData | undefined, scrollDebounceFn?: Function) {
    console.log(`滚动中`)
    if(data) {
        data.scrolling = true
        data.userScrolling = true
    }
    if(scrollDebounceFn) {
        scrollDebounceFn()
    }
}

export function locatePosition(position: number, data: ReactiveData) {
    ajustAction(position, data)
    data.ajusting = true
}

export function scrollToBottom(data: ReactiveData) {
    ajustAction(10000000000000000, data)
    data.locationPosition = 10000000000000000
}

export function ajustScrollPosition(offset: number, data: ReactiveData) {
    let currentScrollPosition = utils.getScrollTop(data)

    if(offset) {
        ajustAction(currentScrollPosition + offset, data)
    }
}

export function ajustAction(position: number, data: ReactiveData) {
    console.log(`滚动位置: ${position}, utils.getScrollTop(data): ${utils.getScrollTop(data)}, utils.getListHeight: ${utils.getListHeight(data)}, getViewPortOffsetHeight: ${utils.getViewPortOffsetHeight(data)}`)
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.scrollTo(0, position)
}