"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
if (!Math) {
  common_vendor.unref(diaLog)();
}
const diaLog = () => "../../components/diaLog/diaLog.js";
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
    const showDialog = common_vendor.ref(false);
    const homeShort = common_vendor.reactive({
      short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
      author: "--\u6069\u683C\u5C14",
      ifCollect: false
    });
    hooks_useGetTabBar.useGetTabBar(0);
    const goRecord = () => {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
    };
    const changeImg = () => {
      showDialog.value = true;
    };
    const confirm = () => {
      showDialog.value = false;
    };
    const cancle = () => {
      showDialog.value = false;
    };
    const collectShort = (e) => {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: !homeShort.ifCollect ? "\u662F\u5426\u6DFB\u52A0\u5230\u6211\u7684\u6536\u85CF" : "\u662F\u5426\u53D6\u6D88\u6536\u85CF",
        success: function(res) {
          if (res.confirm) {
            homeShort.ifCollect = !homeShort.ifCollect;
          } else if (res.cancel)
            ;
        }
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
        f: common_vendor.t(homeShort.short),
        g: common_vendor.t(homeShort.author),
        h: common_vendor.s(`color:${homeShort.ifCollect ? "#FBBD08" : "#fff"}`),
        i: common_vendor.o(collectShort),
        j: common_vendor.o(changeImg),
        k: common_vendor.f(category, (item, k0, i0) => {
          return {
            a: common_vendor.n(`iconfont ${item.icon}`),
            b: common_vendor.s(`background-color:${item.color}`),
            c: common_vendor.t(item.name),
            d: item.icon,
            e: item.name,
            f: common_vendor.o(handelCheck, item.icon)
          };
        }),
        l: common_vendor.o(goRecord),
        m: common_vendor.o(confirm),
        n: common_vendor.o(cancle),
        o: common_vendor.o(($event) => showDialog.value = $event),
        p: common_vendor.p({
          title: "\u8BBE\u7F6E\u80CC\u666F\u683C\u8A00",
          show: showDialog.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "F:/wx-uni/reacrd-day/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
