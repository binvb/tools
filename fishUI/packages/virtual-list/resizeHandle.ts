import { ItemProps } from "./index.d"

function resizeHandle(entry: ResizeObserverEntry, currentList: ItemProps[]) {
    const {width, height} = entry.contentRect
    const elIndex = +entry.target.getAttribute('data-index')!
    const len = currentList.length
    const lastIndex = currentList[len - 1].index!
    const isReverse = currentList[len - 1].transformY ? true : false

    if(!isReverse) {
        for(let i = elIndex; i < lastIndex; i += 1) {
            
        }
    }
	// document.querySelectorAll('.fishUI-virtual-list li').forEach((el, index) => {
    //     let _current = currentList[index]
    //     let _pre = index === 0 ? null : currentList[index - 1]

	// 	_current.offsetHeight = (el as HTMLElement).offsetHeight
    //     _current.offsetWidth = (el as HTMLElement).offsetWidth
    //     // 如果是初始化第一个为0
    //     if(index === 0) {
    //         _current.transformY = _current.transformY || 0
    //         _current.transformX = _current.transformX || 0
    //     } else {
    //         _current.transformY = _pre!.transformY! + _pre!.offsetHeight!
    //         _current.transformX = _pre!.transformX! + _pre!.offsetWidth!
    //     }
	// })
} 

export default resizeHandle