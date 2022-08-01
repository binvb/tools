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
    let screenNum = initDataNum
    let topIndex = currentList[0].index!
    let bottomIndex = currentList[currentList.length - 1].index!
    let patchResult = patch(currentIndex, screenNum, topIndex, bottomIndex)

    // console.log(`查看调整, 调整的结果: ${JSON.stringify(patchResult)}, topIndex: ${topIndex}, bottomIndex: ${bottomIndex}, currentIndex: ${currentIndex}, data: ${JSON.stringify(currentList)}`)
    if(patchResult.before > 0) {
        let _start = topIndex - patchResult.before
        let _end = topIndex
        let _data = dataSource.slice(_start > 0 ? _start : 0, _end)

        if(_data.length > screenNum) {
            _data = _data.splice(_data.length - 2 * screenNum, _data.length)
        }
        currentList = _data.concat(currentList)
        addDatainitPosition('before', currentList)
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
        addDatainitPosition('after', currentList)
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

function addDatainitPosition(position: 'before' | 'after', currentList: ItemProps[]) {
    let len = currentList.length
    if(position === 'before') {
        for(let i = len - 2; i >=0; i -= 1) {
            currentList[i].transformY = currentList[i + 1].transformY - currentList[i].offsetHeight
        }
    } else {
        for(let i = 2; i < len; i += 1) {
            currentList[i].transformY = currentList[i - 1].transformY + currentList[i - 1].offsetHeight
        }   
    }
}

export default  {
    interAction,
    observeHandle
}