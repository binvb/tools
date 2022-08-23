import utils from './utils'
import { ReactiveData } from "./index.d"

// onScrollEnd is a debounce function
export function scrollEvent(scrollDebounceFn: Function, data: ReactiveData) {
    document.querySelector('.fishUI-virtual-list-wrapper')!.addEventListener('scroll', onScrolling.bind(null, data, scrollDebounceFn))
}

export function removeScrollEvent() {
    document.querySelector('.fishUI-virtual-list-wrapper')!.removeEventListener('scroll', onScrolling.bind(null, undefined, undefined))
}

function onScrolling(data:ReactiveData | undefined, scrollDebounceFn?: Function) {
    if(data) {
        data.scrolling = true
    }
    if(scrollDebounceFn) {
        scrollDebounceFn()
    }
}

export function locatePosition(position: number, data: ReactiveData) {
    ajustAction(position)
    data.ajusting = true
}

export function ajustScrollPosition(offset: number) {
    let currentScrollPosition = utils.getScrollTop()

    if(offset) {
        ajustAction(currentScrollPosition + offset)
    }
}

export function ajustAction(position: number) {
    document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, position)
}