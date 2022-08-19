import utils from './utils'

let instance:Scroll | null
class Scroll {
    scrolling: boolean = false
    ajusting:boolean = false // ajust scroll position when resize
    onScrollEndFn: Function = () => {}
    constructor(onScrollEnd?: Function) {
        if(onScrollEnd) {
            this.onScrollEndFn = onScrollEnd
            this.onScrollEndFn()
        }
        document.querySelector('.fishUI-virtual-list-wrapper')!.addEventListener('scroll', this.scrollEvent.bind(this))
    }
    static getInstance(onScrollEnd?: Function) {
        if(!instance) {
            instance = new Scroll(onScrollEnd)
        }
        return instance
    }
    destroy() {
        document.querySelector('.fishUI-virtual-list-wrapper')!.removeEventListener('scroll', this.scrollEvent)
        instance = null
    }
    scrollEvent() {
        this.scrolling = true
        this.onScrollEndFn()
    }
    scrollEn() {
        this.scrolling = false
        this.ajusting = false
    }
    locatePosition(position: number) {
        this.ajustAction(position)
        this.ajusting = true
    }
    ajustScrollPosition(offset: number) {
        let currentScrollPosition = utils.getScrollTop()

        if(offset) {
            this.ajustAction(currentScrollPosition + offset)
        }
    }
    ajustAction(position: number) {
        document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, position)
    }
}

export default Scroll.getInstance