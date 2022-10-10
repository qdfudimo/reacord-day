"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
const reacordList = () => "../../components/reacordList/reacordList.js";
const app = getApp();
const _sfc_main = {
  components: {
    reacordList
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
          scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
          scheduleTime: "2022-01-12 03:30",
          likeCount: 1,
          ifMyLike: 1,
          commentCount: 0,
          scheduleContent: "\u65B0\u5E74\u5F00\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
          userAvatrImage: "",
          userName: "\u65FA\u4ED4\u679C\u51BB",
          userId: "11321313"
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
    setTimeout(() => {
      this.scheduleLsits.push({
        scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
        scheduleTime: "2022-01-14 07:30",
        likeCount: 4,
        ifMyLike: 1,
        commentCount: 1,
        scheduleContent: "\u65B0\u5E74\u5F00xx\u5B50\u554A\u8FD9\u8DEFi\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
        userAvatrImage: "",
        userName: "\u65FA\u4ED4\u5C0F\u9992\u5934",
        userId: "888"
      });
      this.loadMore = true;
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
    changeLike(e) {
      let ifMyLike = this.scheduleLsits[e.detail].ifMyLike;
      let likeCount = this.scheduleLsits[e.detail].likeCount;
      let Count = !ifMyLike ? likeCount + 1 : ifMyLike == 0 ? 0 : likeCount - 1;
      this.scheduleLsits[e.detail].likeCount = Count;
      this.scheduleLsits[e.detail].ifMyLike = !this.scheduleLsits[e.detail].ifMyLike;
    }
  }
};
if (!Array) {
  const _component_reacord_list = common_vendor.resolveComponent("reacord-list");
  _component_reacord_list();
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
          reacordList: item,
          onlyIndex: index
        }),
        c: index
      };
    }),
    q: common_vendor.o($options.changeLike),
    r: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: "0529b6ec-1-" + i0,
        b: common_vendor.p({
          reacordList: item,
          onlyIndex: index
        }),
        c: index
      };
    }),
    s: common_vendor.o($options.changeLike),
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
