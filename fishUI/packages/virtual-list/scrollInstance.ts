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
        console.log(`transformY: ${transformY}, currentScrollPosition: ${currentScrollPosition}, offset: ${offset}, this.scrolling: ${this.scrolling}`)
        // only if resize above scrollTop
        if(transformY < currentScrollPosition && offset && !this.scrolling) {
            document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, currentScrollPosition + offset)
        }
    }
}

export default Scroll.getInstance