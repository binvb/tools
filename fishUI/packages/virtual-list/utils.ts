import { SourceData, ReactiveData } from "./index.d"

function sleep(period: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        },period)
    })
}

// get closed top item
function getCurrentTopIndex(dataList: SourceData[], top: number) {
    let afterDataList = dataList.filter(item => item.transformY! > top)

    if(afterDataList.length) {
        return afterDataList[0].index
    }
    return 0
}

function indexExist(index: any) {
    if(typeof(index) === 'number') {
        return true
    }
    return  false
}

function getRandom() {
    return parseInt((Math.random() *10).toString())
}

function getScrollTop(data: ReactiveData) {
    return document.querySelector(`.fishUI-virtual-list_${data.componentID}`)!.scrollTop
}

function getViewPortOffsetHeight(data: ReactiveData) {
    return (document.querySelector(`.fishUI-virtual-list_${data.componentID}`) as HTMLElement).offsetHeight
}

function getListHeight(data: ReactiveData) {
    return (document.querySelector(`.fishUI-virtual-list_${data.componentID} .fishUI-virtual-list__inner`) as HTMLElement).offsetHeight
}

function ifScrollBottom(data: ReactiveData) {
    const scrollTop = getScrollTop(data)
    const viewPortOffsetHeight = getViewPortOffsetHeight(data)
    const listHeight = getListHeight(data)

    if(scrollTop + viewPortOffsetHeight >= listHeight) {
        return true
    }

    return false
}

export default {
    indexExist,
    sleep,
    getRandom,
    getCurrentTopIndex,
    getScrollTop,
    getViewPortOffsetHeight,
    getListHeight,
    ifScrollBottom
}