"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(famous)();
}
const famous = () => "../../components/famous/famous.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const homeShort = common_vendor.reactive({
      data: [
        {
          short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
          author: "\u6069\u683C\u5C14",
          ifCollect: false,
          id: 1
        },
        {
          short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
          author: "\u6069\u683C\u5C14",
          ifCollect: false,
          id: 2
        }
      ]
    });
    const loadMore = common_vendor.ref(false);
    const ifMoreData = common_vendor.ref(false);
    const collectShort = (e) => {
      console.log(e);
    };
    let id = 12;
    common_vendor.onReachBottom(() => {
      if (loadMore.value || ifMoreData.value)
        return;
      loadMore.value = true;
      setTimeout(() => {
        id++;
        homeShort.data.push({
          short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6" + id,
          author: "\u6069\u683C\u5C14",
          ifCollect: true,
          id
        });
        loadMore.value = false;
        if (id == 14) {
          ifMoreData.value = true;
        }
      }, 300);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: homeShort.data.length
      }, homeShort.data.length ? common_vendor.e({
        b: common_vendor.f(homeShort.data, (item, k0, i0) => {
          return {
            a: "29987d2e-0-" + i0,
            b: common_vendor.p({
              homeShort: item
            }),
            c: item.id
          };
        }),
        c: common_vendor.o(collectShort),
        d: ifMoreData.value
      }, ifMoreData.value ? {} : {}) : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29987d2e"], ["__file", "E:/xiaocx/reacord-day/pages/famousSaying/index.vue"]]);
wx.createPage(MiniProgramPage);
