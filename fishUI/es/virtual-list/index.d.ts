export interface SourceData {
  [key: string]: any
}
export interface ItemProps extends SourceData{
  index: number,
  transformY: number,
  offsetHeight: number,
  isVisible: boolean
}
export interface ReactiveData {
  sourceData:  Partial<ItemProps>[],
  currentData: ItemProps[],
  templateData: Partial<ItemProps>,
  currentScrollTop: number
}

export type Direction = 'init' | 'up' | 'down' 
}, {
    props: {
        sourceData: SourceData[];
        ScrollItemComponent: ComponentPublicInstance;
        initDataNum: number;
    };
    data: {
        sourceData: {
            [x: string]: any;
            index?: number | undefined;
            transformY?: number | undefined;
            offsetHeight?: number | undefined;
            isVisible?: boolean | undefined;
        }[];
        currentData: {
            [x: string]: any;
            index: number;
            transformY: number;
            offsetHeight: number;
            isVisible: boolean;
        }[];
        templateData: {
            [x: string]: any;
            index?: number | undefined;
            transformY?: number | undefined;
            offsetHeight?: number | undefined;
            isVisible?: boolean | undefined;
        };
        currentScrollTop: number;
    };
    itemTemplate: import("vue").Ref<any>;
    throttleWraper: import("lodash").DebouncedFunc<() => void>;
    initData: () => void;
    render: (start?: number, itemNum?: number, direction?: Direction) => Promise<any>;
    scrollHandler: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    sourceData: {
        type: ArrayConstructor;
        required: true;
    };
    ScrollItemComponent: {
        type: null;
        required: true;
    };
    initDataNum: {
        type: NumberConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
