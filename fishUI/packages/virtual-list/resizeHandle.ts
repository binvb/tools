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
            // only above scrollTop item resize need to be compenstion, exclude top position
            // 这里需要区分保持在底部的定位和定位，保持在底部 correctViewPortTopIndex 不正确的
            if (scrollTop !== 0 && correctLocateItem?.index! > currentData[i].index && !data.userScrolling) {
                console.log(`data.locationPosition: ${data.locationPosition}, index: ${currentData[i].index}, currentData[i].transformY: ${currentData[i].transformY}`)
                data.locationPosition += (_elOffsetHeight - currentData[i].offsetHeight)
                setTimeout(() => {
                    data.ajusting = true
                    ajustAction(data.locationPosition, data)
                }, 10)
            }
            data.listHeight += (_elOffsetHeight - currentData[i].offsetHeight)
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