"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
const famous = () => "../../components/famous/famous.js";
const app = getApp();
const _sfc_main = {
  components: {
    famous
  },
  data() {
    return {
      statusBar: app.globalData.statusBar,
      customBar: app.globalData.customBar,
      custom: app.globalData.custom,
      imgList: [],
      showBackground: false,
      currentBackground: "/static/image/background/rainbow.jpg",
      hasUserInfo: false,
      ifCollect: false,
      defaultImg: "/static/image/background/rainbow.jpg",
      loadMore: false,
      scheduleLsits: [
        {
          short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
          author: "\u6069\u683C\u5C14",
          ifCollect: true,
          id: 1
        },
        {
          short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
          author: "\u6069\u683C\u5C14",
          ifCollect: false,
          id: 2
        }
      ],
      userInfo: {
        avatarUrl: "",
        nickName: ""
      },
      selected: 0
    };
  },
  onLoad: function() {
    const fs = common_vendor.index.getFileSystemManager();
    const pathName = "/static/image/background";
    fs.readdir({
      dirPath: pathName,
      success: (res) => {
        this.imgList = res.files.map((item) => `${pathName}/${item}`);
      },
      fail(res) {
        console.error(res);
      }
    });
    common_vendor.index.getStorage({
      key: "currentBackground",
      success: (res) => {
        this.currentBackground = res.data;
      },
      fail: (error) => {
        this.currentBackground = "/static/image/background/rainbow.jpg";
      }
    });
    common_vendor.index.getStorage({
      key: "userInfo",
      success: (res) => {
        this.userInfo = JSON.parse(res.data);
        this.hasUserInfo = true;
      },
      fail: (error) => {
        this.hasUserInfo = false;
      }
    });
  },
  onShareAppMessage(item) {
    const shareimg = ["/static/image/write.png", "/static/image/write1.png", "/static/image/write2.png", "/static/image/write3.png"];
    const randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];
    return {
      title: "\u5199\u4E0B\u4F60\u7684\u751F\u6D3B",
      path: "/page/mine/index",
      imageUrl: randomImg
    };
  },
  onReady: function() {
  },
  onShow: function() {
    if (typeof this.$scope.getTabBar === "function" && this.$scope.getTabBar()) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
  },
  onReachBottom: function() {
    if (this.loadMore)
      return;
    this.loadMore = true;
    setTimeout(() => {
      this.loadMore = false;
    }, 300);
  },
  methods: {
    showIfBackground() {
      this.showBackground = !this.showBackground;
    },
    selectImage(e) {
      this.currentBackground = e.target.dataset.url;
      common_vendor.index.setStorage({
        key: "currentBackground",
        data: e.target.dataset.url
      });
    },
    selectBackground() {
      utils_upload.chooseFile({
        accept: "img",
        maxCount: 1,
        multiple: false
      }).then((res) => {
        this.currentBackground = res[0].url;
      }).catch((error) => {
      });
    },
    getUserProfile(e) {
      if (this.hasUserInfo)
        return;
      common_vendor.index.getUserProfile({
        desc: "\u5C55\u793A\u7528\u6237\u4FE1\u606F",
        success: (res) => {
          this.userInfo = res.userInfo;
          this.hasUserInfo = true;
          common_vendor.index.setStorage({
            key: "userInfo",
            data: res.rawData
          });
        },
        fail: (error) => {
        }
      });
    },
    collectApplet() {
      this.ifCollect = true;
      setTimeout(() => {
        this.ifCollect = false;
      }, 3e3);
    },
    setApplet() {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u53D1",
        icon: "error",
        duration: 2e3
      });
    },
    shareApplet() {
    },
    collectShort(e) {
    }
  }
};
if (!Array) {
  const _easycom_famous2 = common_vendor.resolveComponent("famous");
  _easycom_famous2();
}
const _easycom_famous = () => "../../components/famous/famous.js";
if (!Math) {
  _easycom_famous();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    b: $data.currentBackground || $data.defaultImg
  } : {}, {
    c: common_vendor.s("height:" + $data.customBar + "px;padding-top:" + $data.statusBar + "px;background-color:" + ($data.hasUserInfo ? "transparent" : "#fff")),
    d: $data.userInfo.avatarUrl || "/static/image/vx.png",
    e: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    f: common_vendor.t($data.userInfo.nickName)
  } : {}, {
    g: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args)),
    h: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    i: common_vendor.o((...args) => $options.showIfBackground && $options.showIfBackground(...args))
  } : {}, {
    j: common_vendor.s("background-color:" + ($data.hasUserInfo ? "transparent" : "#fff") + ";"),
    k: common_vendor.t(0),
    l: common_vendor.t(0),
    m: common_vendor.o((...args) => $options.collectApplet && $options.collectApplet(...args)),
    n: common_vendor.o((...args) => $options.setApplet && $options.setApplet(...args)),
    o: !$data.scheduleLsits.length || !$data.hasUserInfo
  }, !$data.scheduleLsits.length || !$data.hasUserInfo ? {} : {}, {
    p: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: "0529b6ec-0-" + i0,
        b: common_vendor.p({
          homeShort: item
        }),
        c: index
      };
    }),
    q: common_vendor.o($options.collectShort),
    r: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: "0529b6ec-1-" + i0,
        b: common_vendor.p({
          homeShort: item
        }),
        c: index
      };
    }),
    s: common_vendor.o($options.collectShort),
    t: $data.showBackground
  }, $data.showBackground ? {
    v: common_vendor.o((...args) => $options.showIfBackground && $options.showIfBackground(...args)),
    w: $data.currentBackground || $data.defaultImg,
    x: common_vendor.o((...args) => $options.selectBackground && $options.selectBackground(...args)),
    y: common_vendor.f($data.imgList, (item, index, i0) => {
      return {
        a: item,
        b: item || $data.defaultImg,
        c: index
      };
    }),
    z: common_vendor.o((...args) => $options.selectImage && $options.selectImage(...args))
  } : {}, {
    A: $data.ifCollect
  }, $data.ifCollect ? {
    B: common_vendor.s("top:" + ($data.customBar + 20) + "px;left:" + ($data.custom.left - $data.custom.width / 2) + "px;")
  } : {}, {
    C: common_vendor.n("container " + ($data.hasUserInfo ? "" : "noColor"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/pages/mine/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
