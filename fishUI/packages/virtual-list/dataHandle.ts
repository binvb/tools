import observeHandle from './observeHandle'
import { SourceData, ItemProps, Observer } from './index.d'

// when rendered, current data will update offsetHeight && transformY
// when current data updated, avoid complex calculation, do not update all data all the time
// only update in some case
function getSourceDataAfterResize(sourceData: SourceData[], endIndex:number) {
    for(let i = 0; i <= endIndex; i += 1) {
        if(!sourceData[i]) {
            return
        }
        if(i === 0) {
            sourceData[i].transformY = 0
        } else {
            sourceData[i].transformY = sourceData[i - 1].transformY! + sourceData[i - 1].offsetHeight!
        }
    }
}

function sourceDataInitail(data: SourceData[], retainHeightValue?: number, newVal?: SourceData[]){
    let _data = newVal?.length ? newVal : data

    _data.forEach((item, index) => {
        let pre = data[index - 1]

        Object.keys(item).forEach(key => {
            if(!data[index]) {
                data[index] = {}
            }
            data[index][key] = item[key]
        })
        data[index].index = index
        data[index].offsetHeight = item.offsetHeight || retainHeightValue || 10
        data[index].transformY = pre ? (pre.transformY! + pre.offsetHeight!) : (retainHeightValue || 10) * index
    })
    // splice rest item
    if(newVal) {
        data.splice(newVal.length, 1000000000)
    }
    return (data as ItemProps[])
}

function del(index: number | number[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer, initDataNum: number, retainHeightValue?: number) {
    if(index instanceof Array) {
        index.forEach(item => {
            sourceData.splice(item, 1)
        })
    } else {
        sourceData.splice(index, 1)
    }
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(sourceData, currentData, observer, initDataNum)
}

function add(index: number, insertData: any[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer, initDataNum: number, retainHeightValue?: number) {
    sourceData.splice(index,0, ...insertData)
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(sourceData, currentData, observer, initDataNum)
}

function update(index: number, data: any, sourceData: ItemProps[]) {
    Object.keys(data).forEach(key => {
        sourceData[index][key] = data[key]
    })
}

function setSourceData(data: any[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer,initDataNum: number, retainHeightValue?: number) {
    sourceDataInitail(sourceData, retainHeightValue, data)
    resetCurrentData(sourceData, currentData, observer, initDataNum)
}

function resetCurrentData(sourceData: ItemProps[], currentData: ItemProps[], observer: Observer, initDataNum: number) {
    let _startIndex = currentData[0] ? (currentData[0].index > sourceData[sourceData.length - 1].index ? 0 : currentData[0].index) : 0
    let _len = sourceData.length > initDataNum * 2 ? initDataNum * 2 : sourceData.length

    // unobserve
    observeHandle.unobserve(currentData, observer)
    for(let i = 0; i < _len; i += 1) {
        let _data = sourceData[_startIndex + i]

        if(_data) {
            currentData[i] = _data
        }
    }
    if(currentData.length > _len) {
        currentData.splice(_len, 10000)
    }
    if(_startIndex === 0) {
        document.querySelector('.fishUI-virtual-list-wrapper')!.scrollTo(0, 0)
    }
    observeHandle.observe(currentData, observer)
}


export default {
    getSourceDataAfterResize,
    sourceDataInitail,
    del,
    add,
    update,
    setSourceData
}