export interface ItemProps{
  index: number,
  transformY: number,
  offsetHeight: number,
}
export type SourceData = Partial<ItemProps>
export interface ReactiveData {
  sourceData:  ItemProps[],
  currentData: ItemProps[],
  currentScrollTop: number
}

export interface Observer {
  intersectionObserver: IntersectionObserver
  resizeObserver: ResizeObserver
}

export interface VirtualScrollExpose {
  locate: (index: number) => void 
}

export type Direction = 'init' | 'up' | 'down' 