import { SourceData, ItemProps } from "./index.d"

function dataAddIndex(data: SourceData[]): ItemProps[] {
    data.forEach((item, index) => {
        data[index] = {
            ...item,
            index,
            transformY: 0,
            transformX: 0,
            offsetHeight: 0,
            offsetWidth: 0
        }
    })
    return (data as ItemProps[])
}

function getInitData(dataList: SourceData[], initDataNum: number):ItemProps[]{
    let _data = dataList.slice(0, initDataNum)

    return (_data as ItemProps[])
}

export default {
    dataAddIndex,
    getInitData
}