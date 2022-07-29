import { SourceData, ItemProps } from "./index.d"

function dataAddIndex(data: SourceData[]): ItemProps[] {
    data.forEach((item, index) => {
        data[index] = {
            ...item,
            index,
            transformY: 10 * index,
            offsetHeight: 10,
        }
    })
    return (data as ItemProps[])
}

function getInitData(dataList: SourceData[], initDataNum: number):ItemProps[]{
    let _data = dataList.slice(0, initDataNum)

    return (_data as ItemProps[])
}

function sleep(period: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        },period)
    })
}

export default {
    dataAddIndex,
    getInitData,
    sleep
}