import debounce from 'lodash/debounce'
let instance:Scroll

class Scroll {
    scrolling:boolean = false
    debounceWrap: Function = debounce(() => {
        this.scrolling = false
    }, 10)
    constructor() {
        document.querySelector('.fishUI-virtual-list-wrapper')!.addEventListener('scroll', () => {
            this.scrolling = true
            this.debounceWrap()
        })
    }
    static getInstance() {
        if(!instance) {
            instance = new Scroll()
        }
        return instance
    }
    ajustScrollPosition(transformY: number, offset: number) {
        let container = document.querySelector('.fishUI-virtual-list-wrapper')!
        let currentScrollPosition = container.scrollTop
        
        // 第几个index: 437, height: 73.5, _currentitem.offsetHeight: 10
        // transformY: 8919, currentScrollPosition: 9109, offset: 0, this.scrolling: false
        // 为什么 offset 是 0
        // only if resize above scrollTop
        if(transformY < currentScrollPosition && offset && !this.scrolling) {
            console.log(`transformY: ${transformY}, currentScrollPosition: ${currentScrollPosition}, offset: ${offset}`)
            document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, currentScrollPosition + offset)
        }
    }
}

export default Scroll.getInstance