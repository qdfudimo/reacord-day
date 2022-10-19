"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var utils_index = require("../../utils/index.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
var utils_request = require("../../utils/request.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
if (!Math) {
  (common_vendor.unref(famous) + common_vendor.unref(noData))();
}
const famous = () => "../../components/famous/famous.js";
const noData = () => "../../components/noData/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    hooks_useGetTabBar.useGetTabBar(1);
    const app = getApp();
    const statusBar = app.globalData.statusBar;
    const customBar = app.globalData.customBar;
    const custom = app.globalData.custom;
    const imgList = common_vendor.ref([]);
    const scheduleLsits = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      avatarUrl: "",
      nickName: "",
      id: "",
      diaryCount: 0,
      collectCount: 0
    });
    const showBackground = common_vendor.ref(false);
    const loadMore = common_vendor.ref(false);
    const ifMoreData = common_vendor.ref(false);
    const ifCollect = common_vendor.ref(false);
    const currentBackground = common_vendor.ref("");
    const currentBackgroundId = common_vendor.ref("");
    const currentPage = common_vendor.ref(1);
    const showIfBackground = () => {
      showBackground.value = !showBackground.value;
    };
    const selectImage = (e) => {
      let url = e.target.dataset.url;
      if (url == currentBackground.value)
        return;
      changeFile(url);
    };
    const changeFile = (url) => {
      let data = {
        type: "update",
        url,
        id: currentBackgroundId.value,
        oldImgUrl: currentBackground.value
      };
      data.isDel = !utils_index.randomImg.includes(currentBackground.value);
      utils_request.request("backgroundUrl", data).then(({ result = {} }) => {
        if (result.updated) {
          currentBackground.value = url;
          common_vendor.index.setStorage({
            key: "currentBackground",
            data: url
          });
        }
      });
    };
    const selectBackground = () => {
      utils_upload.chooseFile({
        accept: "img",
        maxCount: 1,
        multiple: false
      }).then((res) => {
        let ext = res[0].url.split(".").pop();
        common_vendor.pn.uploadFile({
          filePath: res[0].url,
          cloudPath: Date.now() + "." + ext,
          success(res2) {
            changeFile(res2.fileID);
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
    const goPrivacy = () => {
      common_vendor.index.navigateTo({
        url: "../Privacy/index"
      });
    };
    const collectShort = (item, index) => {
      utils_util.util.collectFamous(item, () => {
        scheduleLsits.value.splice(index, 1);
        userInfo.collectCount--;
      });
    };
    const getFamousSaying = async (type) => {
      let data = {
        type: "mySearch",
        pageSize: 10,
        currentPage: currentPage.value
      };
      try {
        let { result = {} } = await utils_request.request("getFamousSaying", data);
        if (result.affectedDocs) {
          type == "refersh" && (scheduleLsits.value = []);
          scheduleLsits.value.push(...result.data);
          if (!result.data.length || result.data.length < 10) {
            ifMoreData.value = true;
          }
          common_vendor.index.stopPullDownRefresh();
          return;
        }
        ifMoreData.value = true;
      } catch (error) {
        common_vendor.index.stopPullDownRefresh();
        utils_util.util.tip("\u8BF7\u6C42\u5931\u8D25", "error");
      }
    };
    const requsetImg = () => {
      let data = {
        type: "read",
        imgType: 1
      };
      utils_request.request("backgroundUrl", data).then(({ result = {} }) => {
        if (result.affectedDocs) {
          currentBackground.value = result.data[0].imgUrl || "";
          currentBackgroundId.value = result.data[0]._id || "";
          common_vendor.index.setStorage({
            key: "currentBackground",
            data: currentBackground.value
          });
        }
      });
    };
    const getUserInfo = () => {
      let data = {
        type: "read"
      };
      utils_request.request("getUserInfo", data).then(({ result = {} }) => {
        if (result.affectedDocs) {
          userInfo.avatarUrl = result.data[0].avatarUrl || "";
          userInfo.nickName = result.data[0].nickName;
          userInfo.id = result.data[0]._id;
          userInfo.diaryCount = result.data[0].diaryCount;
          userInfo.collectCount = result.data[0].collectCount;
          common_vendor.index.stopPullDownRefresh();
        }
      });
    };
    common_vendor.watch(userInfo, (newVal, oldVal) => {
      common_vendor.index.setStorage({
        key: "userInfo",
        data: {
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName
        }
      });
    });
    common_vendor.onLoad(() => {
      common_vendor.index.$on("updateInfo", function(data) {
        userInfo.avatarUrl = data.avatarUrl;
        userInfo.nickName = data.nickName;
      });
      imgList.value = utils_index.randomImg;
      requsetImg();
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
    let oldTime = new Date().getTime();
    let oneShow = true;
    common_vendor.onShow(() => {
      let nowTime = new Date().getTime();
      if (nowTime - oldTime > 6e4 || oneShow) {
        oneShow = false;
        oldTime = nowTime;
        common_vendor.index.startPullDownRefresh();
      }
      console.log("\u663E\u793A\u4E86");
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("updateInfo");
    });
    common_vendor.onPullDownRefresh(() => {
      currentPage.value = 1;
      ifMoreData.value = false;
      loadMore.value = false;
      getUserInfo();
      getFamousSaying("refersh");
    });
    common_vendor.onReachBottom(async () => {
      if (loadMore.value || ifMoreData.value)
        return;
      loadMore.value = true;
      currentPage.value++;
      await getFamousSaying();
      loadMore.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + common_vendor.unref(customBar) + "px;padding-top:" + common_vendor.unref(statusBar) + "px;"),
        b: userInfo.avatarUrl || "/static/image/vx.png",
        c: common_vendor.t(userInfo.nickName || "\u6682\u65E0\u7528\u6237\u540D"),
        d: common_vendor.o(getUserProfile),
        e: common_vendor.o(showIfBackground),
        f: common_vendor.t(userInfo.diaryCount),
        g: common_vendor.t(userInfo.collectCount),
        h: common_vendor.o(collectApplet),
        i: common_vendor.o(getUserProfile),
        j: common_vendor.o(goPrivacy),
        k: !scheduleLsits.value.length
      }, !scheduleLsits.value.length ? {} : {}, {
        l: common_vendor.f(scheduleLsits.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => collectShort(item, index)),
            b: "2e3e0f84-0-" + i0,
            c: common_vendor.p({
              homeShort: item
            }),
            d: item._id
          };
        }),
        m: common_vendor.p({
          loadMore: loadMore.value,
          ifMoreData: ifMoreData.value
        }),
        n: showBackground.value
      }, showBackground.value ? {
        o: common_vendor.o(showIfBackground),
        p: currentBackground.value,
        q: common_vendor.o(selectBackground),
        r: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: item,
            b: item,
            c: index
          };
        }),
        s: common_vendor.o(selectImage)
      } : {}, {
        t: ifCollect.value
      }, ifCollect.value ? {
        v: common_vendor.s("top:" + (common_vendor.unref(customBar) + 20) + "px;left:" + (common_vendor.unref(custom).left - common_vendor.unref(custom).width / 2) + "px;")
      } : {}, {
        w: common_vendor.s(`background-image:url(${currentBackground.value});`)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/xiaocx/reacord-day/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);
