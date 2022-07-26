import { SourceData, ItemProps } from "./index.d"

function dataAddIndex(data: SourceData[]) {
    data.forEach((item, index) => {
        item.index = index
    })
}

function getInitData(dataList: SourceData[], initDataNum: number){
    let _data: ItemProps[] = []

    dataList.slice(0, initDataNum).forEach((item, index) => {
        _data.push({
            ...item
        })
    })

    return _data
}

export default {
    dataAddIndex,
    getInitData
}