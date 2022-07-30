import scrollInstance from "./scrollInstance"
import { ItemProps } from "./index.d"

// only on resize, not initail render
function resizeHandle(entry: ResizeObserverEntry, currentList: ItemProps[], sourceData: ItemProps[]) {
    const {width, height} = entry.contentRect
    const len = currentList.length
    const elIndex = +entry.target.getAttribute('data-index')!

    for(let i = 0; i < len; i += 1) {
        // if current el, set offsetHeight
        if(currentList[i].index === elIndex) {
            currentList[i].offsetHeight = height
        }
        // reset transofrmY after current el
        if(currentList[i].index! > elIndex) {
            const _pre = sourceData[currentList[i].index! - 1]

            currentList[i].transformY = _pre.offsetHeight! + _pre.transformY!
        }
    }
} 

// onmounted后重新计算 currentlist 所有滚动元素的位置
function boundSize(currentList: ItemProps[], SourceData: ItemProps[]) {
    let len = currentList.length

    for(let i = 0; i < len; i += 1) {
        let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${currentList[i].index}"]`) as HTMLElement
        let _height = _el.offsetHeight
        let _index = +_el.getAttribute('data-index')!
        let _preRowData = SourceData[currentList[i].index! - 1]

        currentList[i].offsetHeight = _height
        if(_index === 0) {
            currentList[i].transformY = 0
        } else {
            currentList[i].transformY = _preRowData.offsetHeight + _preRowData.transformY
        }
        _el = null
    }
}


export default {
    resizeHandle,
    boundSize
}