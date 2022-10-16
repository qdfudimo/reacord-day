"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_util = require("../../utils/util.js");
var utils_request = require("../../utils/request.js");
require("../../utils/index.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
if (!Math) {
  common_vendor.unref(famous)();
}
const famous = () => "../../components/famous/famous.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const homeShort = common_vendor.reactive({
      data: []
    });
    common_vendor.onLoad(() => {
      getFamousSaying("search");
    });
    const loadMore = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const ifMoreData = common_vendor.ref(false);
    const collectShort = (e) => {
      utils_util.util.collectFamous(e);
    };
    const getFamousSaying = async (type) => {
      let data = {
        userId: "1",
        type
      };
      data.pageSize = 10;
      data.currentPage = currentPage.value;
      let { result } = await utils_request.request("getFamousSaying", data);
      if (result.code === 0) {
        homeShort.data.push(...result.data);
        if (!result.data.length || result.data.length < 10) {
          ifMoreData.value = true;
        }
      } else {
        utils_util.util.tip("\u8BF7\u6C42\u5931\u8D25", "error");
      }
    };
    common_vendor.onReachBottom(async () => {
      if (loadMore.value || ifMoreData.value)
        return;
      loadMore.value = true;
      currentPage.value++;
      await getFamousSaying("search");
      loadMore.value = false;
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
            c: item._id
          };
        }),
        c: common_vendor.o(collectShort),
        d: loadMore.value || ifMoreData.value
      }, loadMore.value || ifMoreData.value ? common_vendor.e({
        e: loadMore.value
      }, loadMore.value ? {} : ifMoreData.value ? {} : {}, {
        f: ifMoreData.value
      }) : {}) : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29987d2e"], ["__file", "E:/xiaocx/reacord-day/pages/famousSaying/index.vue"]]);
wx.createPage(MiniProgramPage);
