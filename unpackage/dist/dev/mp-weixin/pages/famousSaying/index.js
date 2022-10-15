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
    const loadMore = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const ifMoreData = common_vendor.ref(false);
    const collectShort = (e) => {
      console.log(e._id);
      let data = {
        userId: "1",
        type: e.ifCollect ? "noCollect" : "collect",
        id: e._id
      };
      common_vendor.index.showModal({
        content: e.ifCollect ? "\u662F\u5426\u53D6\u6D88\u6536\u85CF" : "\u662F\u5426\u6DFB\u52A0\u6536\u85CF",
        success: function(res) {
          if (res.confirm) {
            utils_request.request("getFamousSaying", data).then(({ result = {} }) => {
              if (result.updated != 1) {
                utils_util.util.tip("\u64CD\u4F5C\u5931\u8D25", "error");
              } else {
                e.ifCollect = !e.ifCollect;
              }
            });
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    };
    const requests = async (e) => {
      getFamousSaying("search");
    };
    const requests1 = async (e) => {
      getFamousSaying("mySearch");
    };
    const getFamousSaying = async (type) => {
      let data = {
        userId: "1",
        type
      };
      if (type == "search" || type == "mySearch") {
        data.pageSize = 10;
        data.currentPage = currentPage.value;
      }
      let { result } = await utils_request.request("getFamousSaying", data);
      console.log(result);
      if (result.code === 0) {
        if (type == "search") {
          homeShort.data.push(...result.data);
          if (!result.data.length || result.data.length < 10) {
            ifMoreData.value = true;
          }
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
      }) : {}) : {}, {
        g: common_vendor.o(requests),
        h: common_vendor.o(requests1)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29987d2e"], ["__file", "E:/xiaocx/reacord-day/pages/famousSaying/index.vue"]]);
wx.createPage(MiniProgramPage);
