import { SourceData, ItemProps } from "./index.d"

interface PatchResult {
    before: number // need to fill scroll item number before
    after: number // need to fill scroll item number after
}

interface Observer {
    intersectionObserver: IntersectionObserver
    resizeObserver: ResizeObserver
}

function interSectionHandle(entity:IntersectionObserverEntry, initDataNum: number, currentList:ItemProps[], dataSource: SourceData[], observer: Observer) {
    // get index
    let screenNum = Math.ceil(initDataNum/2)
    let currentIndex = +entity.target.getAttribute('data-index')!
    let topIndex = currentList[0].index!
    let bottomIndex = currentList[currentList.length - 1].index!
    let patchResult = patch(currentIndex, screenNum, topIndex, bottomIndex)

    // make sure before has more than full screens
    if(patchResult.before > 0) {
        let _start = topIndex - patchResult.before
        let _end = topIndex
        let _data = dataSource.slice(_start, _end)

        currentList = _data.concat(currentList)
        dataHandle('add', _data, observer)
    } else {
        dataHandle('remove', currentList.splice(0, Math.abs(patchResult.before)), observer)
    }
    // make sure after has more than full screens
    if(patchResult.after > 0) {
        let _start = bottomIndex
        let _end = bottomIndex + patchResult.after
        let _data = dataSource.slice(_start + 1, _end + 1)
    
        currentList = currentList.concat(_data) 
        dataHandle('add', _data, observer)
    } else {
        dataHandle('remove', currentList.splice(bottomIndex, Math.abs(patchResult.after)), observer)
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

function dataHandle(type: 'add' | 'remove', data: any[], observer: Observer) {
    // 这里需要获取数据操作的类型，增/减， 需要增减的数据
    // 若增，需要将订阅加上; 若减，需要unobserve
    if(!data.length) {
        return false
    }
    if(type === 'add') {
        setTimeout(() => {
            data.forEach(item => {
                let _el = document.querySelector(`.fishUI-virtual-list li[data-index="${item.index}"]`)!

                observer.resizeObserver.observe(_el)
                observer.intersectionObserver.observe(_el)
            })
        }, 0)
    } else {
        data.forEach(() => {
            data.forEach(item => {
                let _el = document.querySelector(`.fishUI-virtual-list li[data-index="${item.index}"]`)!

                observer.resizeObserver.unobserve(_el)
                observer.intersectionObserver.unobserve(_el)
            })          
        })
    }
}

export default  interSectionHandle