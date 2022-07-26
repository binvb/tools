export interface SourceData {
    index?: number
    [key: string]: any
  }
  export interface ItemProps extends SourceData{
    transformY?: number,
    transformX?: number,
    offsetHeight?: number,
    offsetWidth?: number
  }
  export interface ReactiveData {
    sourceData:  Partial<ItemProps>[],
    currentData: ItemProps[],
    currentScrollTop: number
  }
  
  export type Direction = 'init' | 'up' | 'down' 