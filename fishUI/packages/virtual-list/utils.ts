import { SourceData, ItemProps } from "./index.d"

function getInitData(dataList: SourceData[], initDataNum: number):ItemProps[]{
    let _data = dataList.slice(0, initDataNum * 2)

    return (_data as ItemProps[])
}

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

export default {
    getInitData,
    sleep,
    getCurrentTopIndex
}