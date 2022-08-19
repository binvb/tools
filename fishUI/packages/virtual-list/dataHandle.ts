import { nextTick } from 'vue'
import observeHandle from './observeHandle'
import { SourceData, ItemProps, Observer, ReactiveData } from './index.d'
import utils from './utils'
import scrollInstance from "./scrollInstance"

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
    const currentScrollTop = utils.getScrollTop()
    const wrapOffsetHeight = utils.getViewPortOffsetHeight()
    const offsetHeight = utils.getListHeight()

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
    // if in top/bottom, after data change, keep position
    if(currentScrollTop === 0 && offsetHeight) {
        nextTick(()=> {
            scrollInstance().ajustAction(0)
        })
    }
    if(currentScrollTop + wrapOffsetHeight >= offsetHeight && offsetHeight) {
        nextTick(() => {
            scrollInstance().ajustAction(1000000000)
        })  
    }
    return (data as ItemProps[])
}

function del(index: number | number[], data: ReactiveData, observer: Observer, props:any) {
    const {initDataNum, retainHeightValue} = props
    let {sourceData, currentData} = data

    if(index instanceof Array) {
        index.forEach(item => {
            sourceData.splice(item, 1)
        })
    } else {
        sourceData.splice(index, 1)
    }
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(data, observer, props)
}

function add(index: number, insertData: any[], data: ReactiveData, observer: Observer, props:any) {
    const {retainHeightValue} = props
    let {sourceData} = data

    sourceData.splice(index,0, ...insertData)
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(data, observer, props)
}

function update(index: number, data: any, sourceData: ItemProps[]) {
    Object.keys(data).forEach(key => {
        sourceData[index][key] = data[key]
    })
}

function setSourceData(newData: any[], data: ReactiveData, observer: Observer, props: any) {
    const {retainHeightValue} = props
    let {sourceData} = data

    sourceDataInitail(sourceData, retainHeightValue, newData)
    resetCurrentData(data, observer, props)
}

function resetCurrentData(data: ReactiveData, observer: Observer, props: any) {
    const { initDataNum } = props
    let {sourceData, currentData} = data
    // if current Data exist, still use current Data, only change position
    let startIndex = currentData[0] ? (currentData[0].index > sourceData[sourceData.length - 1].index ? 0 : currentData[0].index) : 0
    let len = sourceData.length > initDataNum * 2 ? initDataNum * 2 : sourceData.length
    const strollTop = utils.getScrollTop()

    // if in top position, need start in sourceData[0]
    if(strollTop === 0) {
        startIndex = 0
    }
    // unobserve
    observeHandle.unobserve(currentData, observer)
    for(let i = 0; i < len; i += 1) {
        let _data = sourceData[startIndex + i]

        if(_data) {
            currentData[i] = _data
        }
    }
    if(currentData.length > len) {
        currentData.splice(len, 10000)
    }
    // observe
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