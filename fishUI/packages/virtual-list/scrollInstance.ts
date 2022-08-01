
import utils from './utils'
import { SourceData, ItemProps } from './index.d'

let instance:Scroll

class Scroll {
    ajusting:boolean = false // ajust scroll position when resize
    constructor(onScrollEnd?: Function) {
        document.querySelector('.fishUI-virtual-list-wrapper')!.addEventListener('scroll', (e) => {
            // scrolling
            if(onScrollEnd) {
                onScrollEnd()
            }
        })
    }
    static getInstance(onScrollEnd?: Function) {
        if(!instance) {
            instance = new Scroll(onScrollEnd)
        }
        return instance
    }
    ajustScrollPosition(offset: number) {
        let container = document.querySelector('.fishUI-virtual-list-wrapper')!
        let currentScrollPosition = container.scrollTop
        console.log(`看下调整的距离: ${offset}`)
        // above item resize  
        if(offset) {
            this.ajustAction(currentScrollPosition + offset)
        }
    }
    ajustAction(position: number) {
        this.ajusting = true
        document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, position)
        setTimeout(() => {
            this.ajusting = false
        })
    }
}

export default Scroll.getInstance