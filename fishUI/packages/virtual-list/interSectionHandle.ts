import { ItemProps } from "./index.d"

interface PatchResult {
    before: number // need to fill scroll item number before
    after: number // need to fill scroll item number after
}

interface Observer {
    intersectionObserver: IntersectionObserver
    resizeObserver: ResizeObserver
}


function interAction(currentIndex: number, initDataNum: number, currentList:ItemProps[], dataSource: ItemProps[], observer: Observer) {
    let screenNum = Math.ceil(initDataNum/2)
    let topIndex = currentList[0].index!
    let bottomIndex = currentList[currentList.length - 1].index!
    let patchResult = patch(currentIndex, screenNum, topIndex, bottomIndex)

    console.log(`看下数据, patchResult: ${JSON.stringify(patchResult)}, currentIndex: ${currentIndex}, topIndex: ${topIndex}, bottomIndex: ${bottomIndex}`)
    if(patchResult.before > 0) {
        let _start = topIndex - patchResult.before
        let _end = topIndex
        let _data = dataSource.slice(_start > 0 ? _start : 0, _end)

        if(_data.length > screenNum) {
            _data = _data.splice(_data.length - 2 * screenNum, _data.length)
        }
        currentList = _data.concat(currentList)
        observeHandle('add', _data, observer)
    } else {
        observeHandle('remove', currentList.splice(0, Math.abs(patchResult.before)), observer)
    }
    // make sure after has more than full screens
    if(patchResult.after > 0) {
        let _start = bottomIndex
        let _end = bottomIndex + patchResult.after
        let _data = dataSource.slice(_start + 1, _end + 1)

        if(_data.length > screenNum) {
            _data = _data.splice(_data.length - 2 * screenNum, _data.length)
        }
        currentList = currentList.concat(_data) 
        observeHandle('add', _data, observer)
    } else {
        observeHandle('remove', currentList.splice(currentList.length + patchResult.after, Math.abs(patchResult.before)), observer)
    }

    return currentList
}

function patch(currentIndex: number, screenNum: number, topIndex: number, bottomIndex: number) {
    let result: PatchResult = {
        before: 0,
        after: 0
    }

    result.before = screenNum - (currentIndex - topIndex)
    result.after = screenNum - (bottomIndex - currentIndex)

    return result
}

function observeHandle(type: 'add' | 'remove', data: any[], observer: Observer) {
    if(!data.length) {
        return false
    }
    // observe after render
    setTimeout(() => {
        for(let i = 0, len = data.length; i < len; i += 1) {
            let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${data[i].index}"]`)
    
            if(!_el) {
                continue 
            }
            if(type === 'add') {
                observer.resizeObserver.observe(_el)
                observer.intersectionObserver.observe(_el)
            } else {
                observer.resizeObserver.unobserve(_el)
                observer.intersectionObserver.unobserve(_el)
            }
        }
    }, 0)
}

export default  {
    interAction,
    observeHandle
}