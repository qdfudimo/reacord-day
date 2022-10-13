"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
if (!Math) {
  common_vendor.unref(famous)();
}
const famous = () => "../../components/famous/famous.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    hooks_useGetTabBar.useGetTabBar(1);
    const app = getApp();
    const statusBar = app.globalData.statusBar;
    const customBar = app.globalData.customBar;
    const custom = app.globalData.custom;
    const defaultImg = "/static/image/background/rainbow.jpg";
    const imgList = common_vendor.ref([]);
    const scheduleLsits = common_vendor.ref([
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
    ]);
    const userInfo = common_vendor.reactive({
      avatarUrl: "/static/image/vx.png",
      nickName: "\u7528\u6237XXXX"
    });
    const showBackground = common_vendor.ref(false);
    const loadMore = common_vendor.ref(false);
    const ifCollect = common_vendor.ref(false);
    const currentBackground = common_vendor.ref("/static/image/background/rainbow.jpg");
    const showIfBackground = () => {
      showBackground.value = !showBackground.value;
    };
    const selectImage = (e) => {
      currentBackground.value = e.target.dataset.url;
      common_vendor.index.setStorage({
        key: "currentBackground",
        data: e.target.dataset.url
      });
    };
    const selectBackground = () => {
      utils_upload.chooseFile({
        accept: "img",
        maxCount: 1,
        multiple: false
      }).then((res) => {
        currentBackground.value = res[0].url;
      }).catch((error) => {
      });
    };
    const getUserProfile = () => {
      common_vendor.index.navigateTo({
        url: `../userInfo/index`,
        success: function(res) {
          res.eventChannel.emit("userData", {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName
          });
        }
      });
    };
    const collectApplet = () => {
      ifCollect.value = true;
      setTimeout(() => {
        ifCollect.value = false;
      }, 2e3);
    };
    const setApplet = () => {
      common_vendor.index.showToast({
        title: "\u6682\u672A\u5F00\u53D1",
        icon: "error",
        duration: 2e3
      });
    };
    const collectShort = () => {
    };
    common_vendor.onLoad(() => {
      const fs = common_vendor.index.getFileSystemManager();
      const pathName = "/static/image/background";
      fs.readdir({
        dirPath: pathName,
        success: (res) => {
          imgList.value = res.files.map((item) => `${pathName}/${item}`);
        },
        fail(res) {
          console.error(res);
        }
      });
      common_vendor.index.getStorage({
        key: "currentBackground",
        success: (res) => {
          currentBackground.value = res.data;
        },
        fail: (error) => {
          currentBackground.value = defaultImg;
        }
      });
    });
    common_vendor.onShareAppMessage(() => {
      const shareimg = ["/static/image/write.png", "/static/image/write1.png", "/static/image/write2.png", "/static/image/write3.png"];
      const randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];
      return {
        title: "\u5199\u4E0B\u4F60\u7684\u751F\u6D3B",
        path: "/page/mine/index",
        imageUrl: randomImg
      };
    });
    common_vendor.onReachBottom(() => {
      if (loadMore.value)
        return;
      loadMore.value = true;
      setTimeout(() => {
        loadMore.value = false;
      }, 300);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentBackground.value || defaultImg,
        b: common_vendor.s("height:" + common_vendor.unref(customBar) + "px;padding-top:" + common_vendor.unref(statusBar) + "px;"),
        c: userInfo.avatarUrl || "/static/image/vx.png",
        d: common_vendor.t(userInfo.nickName || "\u7528\u6237XXXX"),
        e: common_vendor.o(getUserProfile),
        f: common_vendor.o(showIfBackground),
        g: common_vendor.t(0),
        h: common_vendor.t(0),
        i: common_vendor.o(collectApplet),
        j: common_vendor.o(setApplet),
        k: !scheduleLsits.value.length
      }, !scheduleLsits.value.length ? {} : {}, {
        l: common_vendor.f(scheduleLsits.value, (item, index, i0) => {
          return {
            a: "2e3e0f84-0-" + i0,
            b: common_vendor.p({
              homeShort: item
            }),
            c: index
          };
        }),
        m: common_vendor.o(collectShort),
        n: showBackground.value
      }, showBackground.value ? {
        o: common_vendor.o(showIfBackground),
        p: currentBackground.value || defaultImg,
        q: common_vendor.o(selectBackground),
        r: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: item,
            b: item || defaultImg,
            c: index
          };
        }),
        s: common_vendor.o(selectImage)
      } : {}, {
        t: ifCollect.value
      }, ifCollect.value ? {
        v: common_vendor.s("top:" + (common_vendor.unref(customBar) + 20) + "px;left:" + (common_vendor.unref(custom).left - common_vendor.unref(custom).width / 2) + "px;")
      } : {}, {
        w: common_vendor.n("container noColor")
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/xiaocx/reacord-day/pages/mine/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
