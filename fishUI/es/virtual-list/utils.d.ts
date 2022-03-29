import { ItemProps, Direction } from './index.d';
/**
 * sleep function
 * @param period 中断时间，单位ms
 * @returns
 */
export declare function sleep(period?: number): Promise<Boolean>;
/**
 * 获取元素高度
 * @param el HTMLElement
 * @returns
 */
export declare function getOffsetHeight(el: HTMLElement): number;
/**
 * 获取需要展示的item,
 * @param sourceData
 * @param list
 * @param direction
 * @param index
 * @param height
 */
export declare function getShowData(sourceData: ItemProps[], list: ItemProps[], direction: Direction | undefined, index: number, offsetHeight: number, initDataNum: number, scrollTop: number): void;
/**
 * 滚动事件监听，获取滚动距离的 item 数量
 * @param list
 * @param distance
 * @param direction
 * @returns
 */
export declare function getScrollItemNum(list: ItemProps[], distance: number, direction?: Direction): number;
/**
 * 获取距离当前scrollTop item的前后item数量，保证在回收数据时候不会影响后续顺滑滚动
 * @param list
 * @param scrollTop
 * @param direction
 */
export declare function getReserveItemNum(list: ItemProps[], scrollTop: number): {
    beforeItemNum: number;
    afterItemNum: number;
};
