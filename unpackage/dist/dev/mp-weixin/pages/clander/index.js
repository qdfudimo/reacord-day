"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(uniCalendar)();
}
const uniCalendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const change = (e) => {
      console.log(e);
    };
    const info = common_vendor.reactive({
      selected: []
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(change),
        b: common_vendor.p({
          selected: info.selected,
          insert: true,
          lunar: true
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee5ce5d6"], ["__file", "F:/wx-uni/reacrd-day/pages/clander/index.vue"]]);
wx.createPage(MiniProgramPage);
