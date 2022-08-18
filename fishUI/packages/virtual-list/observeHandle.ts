import { Observer } from './index.d'

function observe(data: any[], observer: Observer) {
    if(!data.length) {
        return false
    }
    setTimeout(() => {
        for(let i = 0, len = data.length; i < len; i += 1) {
            if(!data[i] || !data[i].index) {
                continue
            }
            let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${data[i].index}"]`)

            if(!_el) {
                continue 
            }
            observer.resizeObserver.observe(_el)
            observer.intersectionObserver.observe(_el)
            _el = null
        }
    }, 0)
}

function unobserve(data: any[], observer: Observer) {
    if(!data.length) {
        return false
    }
    for(let i = 0, len = data.length; i < len; i += 1) {
        if(!data[i] || !data[i].index) {
            continue
        }
        let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${data[i].index}"]`)

        if(!_el) {
            continue 
        }
        observer.resizeObserver.unobserve(_el)
        observer.intersectionObserver.unobserve(_el)
        _el = null
    }
}

export default {
    observe,
    unobserve
}