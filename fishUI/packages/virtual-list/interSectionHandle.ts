import { ItemProps } from "./index.d"

interface PatchResult {
    before: number // need to fill scroll item number before
    after: number // need to fill scroll item number after
}

interface Observer {
    intersectionObserver: IntersectionObserver
    resizeObserver: ResizeObserver
}

function interSectionHandle(entity:IntersectionObserverEntry, initDataNum: number, currentList:ItemProps[], dataSource: ItemProps[], observer: Observer) {
    let screenNum = Math.ceil(initDataNum/2)
    let currentIndex = +entity.target.getAttribute('data-index')!
    let topIndex = currentList[0].index!
    let bottomIndex = currentList[currentList.length - 1].index!
    let patchResult = patch(currentIndex, screenNum, topIndex, bottomIndex)
    console.log(patchResult, currentIndex, topIndex, bottomIndex, 'check, check')
    // 这里是不是可以换个思路，从前面减数据的话，后面加数据，从后面减数据的话，从前面加？ # TODO
    // {before: -3, after: 0} 49 26 69 'check, check' 65直接到69，中间不见了4个
    // make sure before has more than full screens
    if(patchResult.before > 0) {
        let _start = topIndex - patchResult.before
        let _end = topIndex
        let _data = dataSource.slice(_start, _end)

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
    
        currentList = currentList.concat(_data) 
        observeHandle('add', _data, observer)
    } else {
        observeHandle('remove', currentList.splice(screenNum * 2, Math.abs(patchResult.after)), observer)
    }
    if(currentList.length > 41) {
        debugger
    }
    if(currentList.length < 40) {
        debugger
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
    if(type === 'add') {
        // after render
        setTimeout(() => {
            data.forEach(item => {
                let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${item.index}"]`)!

                observer.resizeObserver.observe(_el)
                observer.intersectionObserver.observe(_el)
                _el = null
            })
        }, 0)
    } else {
        data.forEach(() => {
            data.forEach(item => {
                let _el: HTMLElement | null = document.querySelector(`.fishUI-virtual-list li[data-index="${item.index}"]`)!

                observer.resizeObserver.unobserve(_el)
                observer.intersectionObserver.unobserve(_el)
                _el = null
            })          
        })
    }
}

export default  interSectionHandle