import { ajustAction, ajustScrollPosition } from './scrollInstance'
import { ItemProps } from "./index.d"
import utils from './utils'

function resizeHandle(currentList: ItemProps[], sourceData: ItemProps[]) {
    const len = currentList.length
    if(!len) {
        return
    }
    const scrollTop = utils.getScrollTop()
    const currentViewPortTopIndex = utils.getCurrentTopIndex(currentList, scrollTop)
    const viewPortOffsetHeight = utils.getViewPortOffsetHeight()
    
    for(let i = 0; i < len; i += 1) {
        const _pre = sourceData[currentList[i].index! - 1]
        const _elOffsetHeight = (document.querySelector(`.fishUI-virtual-list li[data-index="${currentList[i].index}"]`) as HTMLElement).offsetHeight
       
        if(currentList[i].offsetHeight !==  _elOffsetHeight) {
            // 3 situation
            // 1、in top position, need to keep in top position
            // 2、resize item above current scrollTop
            // 3、if bottom position, need scroll to bottom(but here's allready render, it's hard to get before status, here use last item transformY to compare)
            if (scrollTop !== 0 && currentViewPortTopIndex! > currentList[i].index) {
                ajustScrollPosition(_elOffsetHeight - currentList[i].offsetHeight)
            }
            // if bottom
            if(scrollTop + viewPortOffsetHeight === sourceData[sourceData.length - 1].transformY || scrollTop + viewPortOffsetHeight === sourceData[sourceData.length - 1].transformY + sourceData[sourceData.length - 1].offsetHeight) {
                ajustAction(1000000000)
            }
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


export default resizeHandle