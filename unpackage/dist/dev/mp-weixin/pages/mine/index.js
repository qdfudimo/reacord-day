"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var utils_index = require("../../utils/index.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
var utils_request = require("../../utils/request.js");
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
    const scheduleLsits = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      avatarUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/da5f56fe-c939-4168-9c49-ae76ed29d0d0.png",
      nickName: "\u7528\u6237XXXX"
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
        userId: "1",
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
    const collectShort = (item, index) => {
      utils_util.util.collectFamous(item, () => scheduleLsits.value.splice(index, 1));
    };
    const getFamousSaying = async (type) => {
      let data = {
        userId: "1",
        type,
        pageSize: 10,
        currentPage: currentPage.value
      };
      try {
        let { result = {} } = await utils_request.request("getFamousSaying", data);
        if (result.affectedDocs) {
          scheduleLsits.value.push(...result.data);
          if (!result.data.length || result.data.length < 10) {
            ifMoreData.value = true;
          }
        }
      } catch (error) {
        utils_util.util.tip("\u8BF7\u6C42\u5931\u8D25", "error");
      }
    };
    const requsetImg = () => {
      let data = {
        userId: "1",
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
    common_vendor.onLoad(() => {
      imgList.value = utils_index.randomImg;
      getFamousSaying("mySearch");
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
    common_vendor.onReachBottom(async () => {
      if (loadMore.value || ifMoreData.value)
        return;
      loadMore.value = true;
      currentPage.value++;
      await getFamousSaying("mySearch");
      loadMore.value = false;
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
            a: common_vendor.o(($event) => collectShort(item, index)),
            b: "2e3e0f84-0-" + i0,
            c: common_vendor.p({
              homeShort: item
            }),
            d: item._id
          };
        }),
        l: loadMore.value || ifMoreData.value
      }, loadMore.value || ifMoreData.value ? common_vendor.e({
        m: loadMore.value
      }, loadMore.value ? {} : ifMoreData.value ? {} : {}, {
        n: ifMoreData.value
      }) : {}, {
        o: showBackground.value
      }, showBackground.value ? {
        p: common_vendor.o(showIfBackground),
        q: currentBackground.value,
        r: common_vendor.o(selectBackground),
        s: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: item,
            b: item,
            c: index
          };
        }),
        t: common_vendor.o(selectImage)
      } : {}, {
        v: ifCollect.value
      }, ifCollect.value ? {
        w: common_vendor.s("top:" + (common_vendor.unref(customBar) + 20) + "px;left:" + (common_vendor.unref(custom).left - common_vendor.unref(custom).width / 2) + "px;")
      } : {}, {
        x: common_vendor.n("container noColor")
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/xiaocx/reacord-day/pages/mine/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
