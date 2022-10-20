"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_request = require("./utils/request.js");
require("./utils/util.js");
require("./utils/index.js");
require("./uni_modules/uni-calendar/components/uni-calendar/calendar.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/mine/index.js";
  "./pages/famousSaying/index.js";
  "./pages/clander/index.js";
  "./pages/userInfo/index.js";
  "./pages/Privacy/index.js";
  "./pages/yuyin/index.js";
  "./pages/daka/index.js";
  "./pages/playColck/index.js";
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
          that.statusBar = e.statusBarHeight;
          let custom = common_vendor.index.getMenuButtonBoundingClientRect();
          that.custom = custom;
          that.customBar = custom.bottom + custom.top - e.statusBarHeight;
        }
      });
    },
    statusBar: "",
    custom: "",
    customBar: "",
    arrImg: [],
    colorArr: [],
    randomImg: []
  },
  onLaunch() {
    this.globalData.checkIsIPhoneX();
    utils_request.request("requestImgUrl").then(({ result = {} }) => {
      if (result.code === 0) {
        this.globalData.arrImg = result.data;
        this.globalData.colorArr = result.colorArr;
        this.globalData.randomImg = result.randomImg;
      }
    }).catch((error) => {
      console.log(error);
    });
    if (common_vendor.index.canIUse("getUpdateManager")) {
      const updateManager = common_vendor.index.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            common_vendor.index.showModal({
              title: "\u66F4\u65B0\u63D0\u793A",
              content: "\u65B0\u7248\u672C\u5DF2\u7ECF\u51C6\u5907\u597D\uFF0C\u8BF7\u91CD\u542F\u5E94\u7528",
              showCancel: false,
              success: function(res2) {
                if (res2.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function() {
            common_vendor.index.showModal({
              title: "\u5DF2\u7ECF\u6709\u65B0\u7248\u672C\u4E86\u54DF~",
              content: "\u65B0\u7248\u672C\u5DF2\u7ECF\u4E0A\u7EBF\u5566~\uFF0C\u8BF7\u60A8\u5220\u9664\u5F53\u524D\u5C0F\u7A0B\u5E8F\uFF0C\u91CD\u65B0\u641C\u7D22\u6253\u5F00\u54DF~",
              showCancel: false
            });
          });
        }
      });
    } else {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u5F53\u524D\u5FAE\u4FE1\u7248\u672C\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u4F7F\u7528\u8BE5\u529F\u80FD\uFF0C\u8BF7\u5347\u7EA7\u5230\u6700\u65B0\u5FAE\u4FE1\u7248\u672C\u540E\u91CD\u8BD5",
        showCancel: false
      });
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/xiaocx/reacord-day/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
