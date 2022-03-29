import { defineComponent, reactive, ref, onMounted, onUnmounted, openBlock, createElementBlock, Fragment, createElementVNode, renderList, unref, normalizeStyle, createBlock, resolveDynamicComponent } from 'vue';
import { sleep, getOffsetHeight, getShowData, getScrollItemNum } from './utils.js';
import addQueue from './queue.js';
import throttle_1 from '../node_modules/lodash/throttle.js';
import './index.vue_vue_type_style_index_0_scoped_true_lang.js';
import _export_sfc from '../_virtual/plugin-vue_export-helper.js';

const _hoisted_1 = {
  class: "scroll-wrapper",
  "data-testid": "scroll-wrapper"
};
const _hoisted_2 = ["data-scrollId", "data-offsetHeight"];
const _hoisted_3 = {
  class: "scroll-wrapper",
  style: { "visibility": "hidden", "position": "absolute", "transform": "translateY(-1000px)" }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    sourceData: null,
    ScrollItemComponent: null,
    initDataNum: null
  },
  setup(__props) {
    const props = __props;
    const data = reactive({
      sourceData: props.sourceData,
      currentData: [],
      templateData: {},
      currentScrollTop: 0
    });
    const itemTemplate = ref();
    let throttleWraper = throttle_1(() => {
      scrollHandler();
    }, 200);
    initData();
    onMounted(() => {
      let _scrollEl = document.querySelector(".scroll-wrapper");
      _scrollEl?.addEventListener("scroll", throttleWraper, false);
    });
    onUnmounted(() => {
      let _scrollEl = document.querySelector(".scroll-wrapper");
      _scrollEl?.removeEventListener("scroll", throttleWraper, false);
    });
    function initData() {
      data.sourceData = data.sourceData.map((item, index) => {
        return {
          ...item,
          index,
          transformY: 0,
          offsetHeight: 0
        };
      });
      render(0, props.initDataNum * 2, "init");
    }
    async function render(start = 0, itemNum = props.initDataNum * 2, direction = "down") {
      let _offsetHeight;
      let _index;
      let _maxLen = data.sourceData.length;
      let _scrollTop = document.querySelector(".scroll-wrapper")?.scrollTop || 0;
      for (let i = 0, len = itemNum; i < len; i++) {
        _index = direction === "up" ? start - i : start + i;
        if (_index >= 0 && _index < _maxLen) {
          data.templateData = data.sourceData[_index];
          await sleep(0);
          _offsetHeight = itemTemplate.value ? getOffsetHeight(itemTemplate.value) : 0;
          getShowData(data.sourceData, data.currentData, direction, _index, _offsetHeight, props.initDataNum, _scrollTop);
        }
      }
    }
    function scrollHandler() {
      let _scrollTop = document.querySelector(".scroll-wrapper")?.scrollTop || 0;
      let _distance = _scrollTop - data.currentScrollTop;
      let _direction = _distance > 0 ? "down" : "up";
      let _scrollItemNum = getScrollItemNum(data.currentData, _distance, _direction);
      if (_scrollItemNum > 0) {
        data.currentScrollTop += _distance;
        addQueue(() => {
          return render(_direction === "down" ? data.currentData[data.currentData.length - 1].index + 1 : data.currentData[0].index - 1, _scrollItemNum, _direction);
        });
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("ul", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(data).currentData, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.index,
              "data-scrollId": item.index,
              "data-offsetHeight": item.offsetHeight,
              style: normalizeStyle({
                position: "absolute",
                transform: `translateY(${item.transformY || 0}px)`
              })
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(props.ScrollItemComponent), { itemData: item }, null, 8, ["itemData"]))
            ], 12, _hoisted_2);
          }), 128))
        ]),
        createElementVNode("ul", _hoisted_3, [
          createElementVNode("li", {
            ref_key: "itemTemplate",
            ref: itemTemplate
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(props.ScrollItemComponent), {
              itemData: unref(data).templateData
            }, null, 8, ["itemData"]))
          ], 512)
        ])
      ], 64);
    };
  }
});
var VirtualList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1be167a7"]]);

export { VirtualList as default };
