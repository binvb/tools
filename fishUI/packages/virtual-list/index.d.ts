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
  loading: boolean,
  scrolling: boolean,
  ajusting: boolen,
  componentID: String
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
  setSourceData: (data: any[]) => void
  getData: () => any[]
}

export type Direction = 'up' | 'down' 

export type LoadingFn = () => Promise<SourceData[]>