let instance:Scroll

class Scroll {
    scrolling: boolean = false
    ajusting:boolean = false // ajust scroll position when resize
    constructor(onScrollEnd?: Function) {
        document.querySelector('.fishUI-virtual-list-wrapper')!.addEventListener('scroll', (e) => {
            this.scrolling = true
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
    scrollEn() {
        this.scrolling = false
        this.ajusting = false
    }
    ajustScrollPosition(offset: number) {
        let container = document.querySelector('.fishUI-virtual-list-wrapper')!
        let currentScrollPosition = container.scrollTop

        this.ajusting = true
        if(offset) {
            this.ajustAction(currentScrollPosition + offset)
        }
    }
    ajustAction(position: number) {
        document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, position)
    }
}

export default Scroll.getInstance