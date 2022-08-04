import observeHandle from './observeHandle'
import { ItemProps, Observer } from "./index.d"

interface PatchResult {
    before: number // need to fill scroll item number before
    after: number // need to fill scroll item number after
}


function interAction(currentIndex: number, initDataNum: number, currentList:ItemProps[], dataSource: ItemProps[], observer: Observer) {
    let screenNum = initDataNum
    let topIndex = currentList[0].index!
    let bottomIndex = currentList[currentList.length - 1].index!
    let patchResult = patch(currentIndex, screenNum, topIndex, bottomIndex)

    if(patchResult.before > 0) {
        let _start = topIndex - patchResult.before
        let _end = topIndex
        let _data = dataSource.slice(_start > 0 ? _start : 0, _end)

        if(_data.length > 2 * screenNum) {
            _data.splice(0, 2 * screenNum)
        }
        currentList = _data.concat(currentList)
        addDatainitPosition('before', currentList)
        observeHandle.observe(_data, observer)
    } else {
        observeHandle.unobserve(currentList.splice(0, Math.abs(patchResult.before)), observer)
    }
    // make sure after has more than full screens
    if(patchResult.after > 0) {
        let _start = bottomIndex
        let _end = bottomIndex + patchResult.after
        let _data = dataSource.slice(_start + 1, _end + 1)

        if(_data.length > screenNum) {
            _data = _data.slice(_data.length - 2 * screenNum, _data.length)
        }
        currentList = currentList.concat(_data) 
        addDatainitPosition('after', currentList)
        observeHandle.observe(_data, observer)
    } else {
        observeHandle.unobserve(currentList.splice(2 * screenNum, 100000000000), observer)
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