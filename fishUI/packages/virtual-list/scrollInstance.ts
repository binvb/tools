import {nextTick} from 'vue'
import utils from './utils'
import { ReactiveData } from "./index.d"

// onScrollEnd is a debounce function
export function scrollEvent(scrollDebounceFn: Function, data: ReactiveData) {
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.addEventListener('wheel', onUserScrolling.bind(null, data, scrollDebounceFn))
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.addEventListener('scroll', onScroll.bind(null, data, scrollDebounceFn))
}

export function removeScrollEvent(data: ReactiveData) {
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.removeEventListener('wheel', onUserScrolling.bind(null, undefined, undefined))
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.removeEventListener('scroll', onScroll.bind(null, undefined, undefined))
}

function onUserScrolling(data:ReactiveData | undefined, scrollDebounceFn?: Function) {
    if(data) {
        data.userScrolling = true
    }
}
function onScroll(data:ReactiveData | undefined, scrollDebounceFn?: Function) {
    if(data) {
        data.scrolling = true
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
    document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.scrollTo(0, position)
}