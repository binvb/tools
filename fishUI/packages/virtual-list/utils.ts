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

function getCurrentTopIndex(dataList: SourceData[], top: number) {
    let afterDataList = dataList.filter(item => item.transformY! > top)

    return afterDataList[0].index
}

export default {
    getInitData,
    sleep,
    getCurrentTopIndex
}