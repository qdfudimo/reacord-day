"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "famous",
  props: {
    homeShort: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["collectShort"],
  setup(__props, { emit }) {
    const props = __props;
    const collectShort = (e) => {
      emit("collectShort", props.homeShort);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.homeShort.short),
        b: common_vendor.s(`color:${props.homeShort.ifCollect ? "#FBBD08" : "#ccc"}`),
        c: common_vendor.o(collectShort),
        d: common_vendor.t(props.homeShort.author.indexOf("-") != -1 ? props.homeShort.author : "-- " + props.homeShort.author)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c71bfe4"], ["__file", "F:/wx-uni/reacrd-day/components/famous/famous.vue"]]);
wx.createComponent(Component);
