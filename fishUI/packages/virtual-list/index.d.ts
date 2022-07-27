export interface ItemProps{
  index?: number,
  transformY: number,
  transformX: number,
  offsetHeight: number,
  offsetWidth: number
}
export type SourceData = Partial<ItemProps>
export interface ReactiveData {
  sourceData:  ItemProps[],
  currentData: ItemProps[],
  currentScrollTop: number
}

export type Direction = 'init' | 'up' | 'down' 