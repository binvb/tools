import { SourceData, ItemProps } from "./index.d"

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

function getScrollTop() {
    return document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTop
}

function getViewPortOffsetHeight() {
    return (document.querySelector('.fishUI-virtual-list-wrapper') as HTMLElement).offsetHeight
}

function getListHeight() {
    return (document.querySelector('.fishUI-virtual-list') as HTMLElement).offsetHeight
}

export default {
    indexExist,
    sleep,
    getCurrentTopIndex,
    getScrollTop,
    getViewPortOffsetHeight,
    getListHeight
}