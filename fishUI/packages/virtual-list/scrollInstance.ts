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
        console.log(`scrollEn`)
        this.scrolling = false
        this.ajusting = false
    }
    ajustScrollPosition(offset: number) {
        let container = document.querySelector('.fishUI-virtual-list-wrapper')!
        let currentScrollPosition = container.scrollTop
        console.log(`ajustscroll, offset: ${offset}, this.scrolling: ${this.scrolling}, this.ajusting: ${this.ajusting}`)
        // above item resize  
        if(offset && !this.scrolling) {
            this.ajustAction(currentScrollPosition + offset)
        }
    }
    ajustAction(position: number) {
        console.log(`ajustAction: ${position}`)
        this.ajusting = true
        document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, position)
    }
}

export default Scroll.getInstance