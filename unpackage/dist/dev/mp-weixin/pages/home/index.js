"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    getApp();
    const currentDate = utils_util.util.getCurrentDate();
    const defaultImg = "/static/image/background/rainbow.jpg";
    const currentBackground = common_vendor.ref("/static/image/background/rainbow.jpg");
    hooks_useGetTabBar.useGetTabBar(0);
    return (_ctx, _cache) => {
      return {
        a: currentBackground.value || defaultImg,
        b: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[0]}`),
        c: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[1]}`),
        d: common_vendor.t(common_vendor.unref(currentDate).chinaDate),
        e: common_vendor.t(common_vendor.unref(currentDate).week)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "F:/wx-uni/reacrd-day/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
