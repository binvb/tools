import utils from './utils'
import { SourceData } from './index.d'

async function transFormIncreases(startIndex: number, sourceData: SourceData[]) {
    const len = sourceData.length
    const sliceNum = 5000 // task slice, avoid block render process
    let count = startIndex + sliceNum

    for(let i = startIndex; i < len; i += 1) {
        if(i >= count) {
            count += sliceNum
            await utils.sleep(0)
        }
        sourceData[i].transformY = sourceData[i - 1].offsetHeight! + sourceData[i - 1].offsetHeight!
    }
}

function ajustRowData(sourceData: SourceData[], endIndex:number) {
    for(let i = 0; i <= endIndex; i += 1) {
        if(i === 0) {
            sourceData[i].transformY = 0
        } else {
            sourceData[i].transformY = sourceData[i - 1].transformY! + sourceData[i - 1].offsetHeight!
        }
    }
}


export default {
    transFormIncreases,
    ajustRowData
}