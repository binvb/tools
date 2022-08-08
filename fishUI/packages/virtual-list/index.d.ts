export interface ItemProps{
  [key: string]: any,
  index: number,
  transformY: number,
  offsetHeight: number,
}
export type SourceData = Partial<ItemProps> & {
  [key: string]: any
}
export interface ReactiveData {
  sourceData:  ItemProps[],
  currentData: ItemProps[],
  currentScrollTop: number
}

export interface Observer {
  intersectionObserver: IntersectionObserver
  resizeObserver: ResizeObserver
}

export type VirtualScrollExpose =  {
  locate: (index: number) => void
  del: (index: number | number[]) => void
  add: (index: number, insertData: any[]) => void
  update: (index: number, data: any) => void
  reassignment: (data: any[]) => void
}

export type Direction = 'init' | 'up' | 'down' 