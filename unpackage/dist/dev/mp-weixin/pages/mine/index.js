"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var utils_index = require("../../utils/index.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
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
      avatarUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/da5f56fe-c939-4168-9c49-ae76ed29d0d0.png",
      nickName: "\u7528\u6237XXXX"
    });
    const showBackground = common_vendor.ref(false);
    const loadMore = common_vendor.ref(false);
    const ifCollect = common_vendor.ref(false);
    const currentBackground = common_vendor.ref("");
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
        console.log(res);
        currentBackground.value = res[0].url;
        let ext = res[0].url.split(".").pop();
        common_vendor.pn.uploadFile({
          filePath: res[0].url,
          cloudPath: Date.now() + "." + ext,
          success(res2) {
            console.log(res2);
          },
          fail(error) {
            console.log(error);
            utils_util.util.tip("\u4E0A\u4F20\u5931\u8D25", "error");
          }
        });
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
    const collectShort = (item) => {
    };
    common_vendor.onLoad(() => {
      imgList.value = utils_index.randomImg;
      common_vendor.index.getStorage({
        key: "currentBackground",
        success: (res) => {
          currentBackground.value = res.data;
        },
        fail: (error) => {
          const randomImgurl = imgList.value[Math.floor(Math.random() * imgList.value.length)];
          currentBackground.value = randomImgurl;
          common_vendor.index.setStorage({
            key: "currentBackground",
            data: randomImgurl
          });
        }
      });
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
        a: currentBackground.value,
        b: common_vendor.s("height:" + common_vendor.unref(customBar) + "px;padding-top:" + common_vendor.unref(statusBar) + "px;"),
        c: userInfo.avatarUrl || "/static/image/vx.png",
        d: common_vendor.t(userInfo.nickName || "\u7528\u6237XXXX"),
        e: common_vendor.o(getUserProfile),
        f: common_vendor.o(showIfBackground),
        g: common_vendor.t(0),
        h: common_vendor.t(0),
        i: common_vendor.o(collectApplet),
        j: !scheduleLsits.value.length
      }, !scheduleLsits.value.length ? {} : {}, {
        k: common_vendor.f(scheduleLsits.value, (item, index, i0) => {
          return {
            a: "2e3e0f84-0-" + i0,
            b: common_vendor.p({
              homeShort: item
            }),
            c: index
          };
        }),
        l: common_vendor.o(collectShort),
        m: showBackground.value
      }, showBackground.value ? {
        n: common_vendor.o(showIfBackground),
        o: currentBackground.value,
        p: common_vendor.o(selectBackground),
        q: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: item,
            b: item,
            c: index
          };
        }),
        r: common_vendor.o(selectImage)
      } : {}, {
        s: ifCollect.value
      }, ifCollect.value ? {
        t: common_vendor.s("top:" + (common_vendor.unref(customBar) + 20) + "px;left:" + (common_vendor.unref(custom).left - common_vendor.unref(custom).width / 2) + "px;")
      } : {}, {
        v: common_vendor.n("container noColor")
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/xiaocx/reacord-day/pages/mine/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
