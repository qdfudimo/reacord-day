"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    getApp();
    const category = [
      {
        icon: "icon-tiaochariji",
        name: "\u65E5\u8BB0\u672C",
        color: "#1CBBB4"
      },
      {
        icon: "icon-tubiaolunkuo-",
        name: "\u65E5\u5386",
        color: "#9C26B0"
      },
      {
        icon: "icon-icon_xinyong_xianxing_jijin-107",
        name: "\u540D\u53E5\u9274\u8D4F",
        color: "#32c312"
      },
      {
        icon: "icon-qiandaodaka",
        name: "\u6253\u5361",
        color: "#72c2f4"
      },
      {
        icon: "icon-gerenzhongxin",
        name: "\u4E2A\u4EBA\u4E2D\u5FC3",
        color: "#ed4e41"
      }
    ];
    const currentDate = utils_util.util.getCurrentDate();
    const defaultImg = "/static/image/background/rainbow.jpg";
    const currentBackground = common_vendor.ref("/static/image/background/rainbow.jpg");
    hooks_useGetTabBar.useGetTabBar(0);
    const goRecord = () => {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
    };
    const handelCheck = (e) => {
      switch (e.currentTarget.dataset.name) {
        case "\u65E5\u8BB0\u672C":
          common_vendor.index.navigateTo({
            url: `../create-record/create-record`
          });
          break;
        case "\u65E5\u5386":
          common_vendor.index.showToast({
            title: "\u6682\u672A\u5F00\u53D1",
            icon: "error",
            duration: 2e3
          });
          break;
        case "\u540D\u53E5\u9274\u8D4F":
          common_vendor.index.showToast({
            title: "\u6682\u672A\u5F00\u53D1",
            icon: "error",
            duration: 2e3
          });
          break;
        case "\u6253\u5361":
          common_vendor.index.showToast({
            title: "\u6682\u672A\u5F00\u53D1",
            icon: "error",
            duration: 2e3
          });
          break;
        case "\u4E2A\u4EBA\u4E2D\u5FC3":
          common_vendor.index.switchTab({
            url: "/pages/mine/index"
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: currentBackground.value || defaultImg,
        b: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[0]}`),
        c: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[1]}`),
        d: common_vendor.t(common_vendor.unref(currentDate).chinaDate),
        e: common_vendor.t(common_vendor.unref(currentDate).week),
        f: common_vendor.f(category, (item, k0, i0) => {
          return {
            a: common_vendor.n(`iconfont ${item.icon}`),
            b: common_vendor.s(`background-color:${item.color}`),
            c: common_vendor.t(item.name),
            d: item.icon,
            e: item.name,
            f: common_vendor.o(handelCheck, item.icon)
          };
        }),
        g: common_vendor.o(goRecord)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "F:/wx-uni/reacrd-day/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
