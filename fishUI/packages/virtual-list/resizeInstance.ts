import scrollInstance from './scrollInstance'
import { ItemProps } from "./index.d"

let instance:ResizeInstance
class ResizeInstance {
    resizeRenderStatus: boolean = false

    static getInstance() {
        if(!instance) {
            instance = new ResizeInstance()
        }
        return instance
    }
    resizeHandle(currentList: ItemProps[], sourceData: ItemProps[], locateIndex?: number) {
        const len = currentList.length
        
        for(let i = 0; i < len; i += 1) {
            const _pre = sourceData[currentList[i].index! - 1]
            const _elOffsetHeight = (document.querySelector(`.fishUI-virtual-list li[data-index="${currentList[i].index}"]`) as HTMLElement).offsetHeight
           
            if(currentList[i].offsetHeight !==  _elOffsetHeight) {
                if(locateIndex && locateIndex > currentList[i].index!) {
                    scrollInstance().ajustScrollPosition(_elOffsetHeight - currentList[i].offsetHeight)
                }
                this.setResizeStatus(true)
                currentList[i].offsetHeight = _elOffsetHeight
            }

            if(_pre) {
                let _elTransformY = _pre.offsetHeight! + _pre.transformY!

                if(currentList[i].transformY !== _elTransformY) {
                    currentList[i].transformY = _elTransformY
                }
            }
        }
    }
    setResizeStatus(status: boolean) {
        this.resizeRenderStatus = status
    }
}


export default ResizeInstance.getInstance()