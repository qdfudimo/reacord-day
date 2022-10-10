"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/square/index.js";
  "./pages/mine/index.js";
  "./pages/famousSaying/index.js";
  "./pages/create-record/create-record.js";
  "./pages/clander/index.js";
}
const _sfc_main = {
  data() {
    return {};
  },
  globalData: {
    userInfo: null,
    isIPX: false,
    checkIsIPhoneX: function() {
      const that = this;
      common_vendor.index.getSystemInfo({
        success: (e) => {
          console.log(e);
          that.statusBar = e.statusBarHeight;
          let custom = common_vendor.index.getMenuButtonBoundingClientRect();
          that.custom = custom;
          console.log(custom);
          that.customBar = custom.bottom + custom.top - e.statusBarHeight;
        }
      });
    },
    statusBar: "",
    custom: "",
    customBar: ""
  },
  onLaunch() {
    this.globalData.checkIsIPhoneX();
    const logs = common_vendor.index.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    common_vendor.index.setStorageSync("logs", logs);
    common_vendor.index.login({
      success: (res) => {
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/wx-uni/reacrd-day/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
