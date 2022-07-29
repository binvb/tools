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
}

export default Scroll.getInstance