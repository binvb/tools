import { ajustAction } from './scrollInstance'
import { ReactiveData } from "./index.d"
import utils from './utils'

function resizeHandle(data:ReactiveData, props: any) {
    const { currentData, sourceData, componentID } = data
    const len = currentData.length

    if(!len) {
        return
    }
    const scrollTop = utils.getScrollTop(data)
    const correctLocateItem = data.currentData.find(item => item.transformY >= data.locationPosition) || data.currentData[data.currentData.length - 1]
    
    for(let i = 0; i < len; i += 1) {
        const _pre = sourceData[currentData[i].index! - 1]
        const _elOffsetHeight = (document.querySelector(`.fishUI-virtual-list_${componentID} li[data-index="${currentData[i].index}"]`) as HTMLElement).offsetHeight

        if(currentData[i].offsetHeight !==  _elOffsetHeight) {
            let _offset = _elOffsetHeight - currentData[i].offsetHeight
            // only above locate item resize need to be compenstion, exclude top position
            if (scrollTop !== 0 && correctLocateItem?.index! > currentData[i].index && !data.userScrolling) {
                data.locationPosition += _offset
                setTimeout(() => {
                    data.ajusting = true
                    ajustAction(data.locationPosition, data)
                }, 10)
            }
            data.listHeight += _offset
            currentData[i].offsetHeight = _elOffsetHeight
        }
        if(_pre) {
            let _elTransformY = _pre.offsetHeight! + _pre.transformY!

            if(currentData[i].transformY !== _elTransformY) {
                currentData[i].transformY = _elTransformY
            }
        }
    }
}


export default resizeHandle