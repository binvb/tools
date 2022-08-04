import observeHandle from './observeHandle'
import { SourceData, ItemProps, Observer } from './index.d'

// when rendered, current data will update offsetHeight && transformY
// when current data updated, avoid complex calculation, do not update all data all the time
// only update in some case
function getSourceDataAfterResize(sourceData: SourceData[], endIndex:number) {
    for(let i = 0; i <= endIndex; i += 1) {
        if(i === 0) {
            sourceData[i].transformY = 0
        } else {
            sourceData[i].transformY = sourceData[i - 1].transformY! + sourceData[i - 1].offsetHeight!
        }
    }
}

function sourceDataInitail(data: SourceData[], retainHeightValue?: number){
    data.forEach((item, index) => {
        let pre = data[index - 1]

        data[index] = {
            ...item,
            index,
            transformY: pre ? (pre.transformY! + pre.offsetHeight!) : (retainHeightValue || 10) * index,
            offsetHeight: item.offsetHeight || retainHeightValue || 10,
        }
    })
}

function del(index: number | number[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer, retainHeightValue?: number) {
    if(index instanceof Array) {
        index.forEach(item => {
            sourceData.splice(item, 1)
        })
    } else {
        sourceData.splice(index, 1)
    }
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(sourceData, currentData, observer)
}

function add(index: number, insertData: any[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer, retainHeightValue?: number) {
    sourceData.splice(index,0, ...insertData)
    sourceDataInitail(sourceData, retainHeightValue)
    resetCurrentData(sourceData, currentData, observer)
}

function update(index: number, data: any, sourceData: ItemProps[]) {
    sourceData[index] = {...sourceData[index], ...data}
}

function reassignment(data: any[], sourceData: ItemProps[], currentData: ItemProps[], observer: Observer,) {
    sourceDataInitail(data)
    sourceData = data
    resetCurrentData(sourceData, currentData, observer)
}

function resetCurrentData(sourceData: ItemProps[], currentData: ItemProps[], observer: Observer) {
    // unobserve
    observeHandle.unobserve(currentData, observer)
    for(let i = 0, len = currentData.length; i < len; i += 1) {
        currentData[i] = sourceData[currentData[i].index]
    }
    observeHandle.observe(currentData, observer)
}

export default {
    getSourceDataAfterResize,
    sourceDataInitail,
    del,
    add,
    update,
    reassignment
}