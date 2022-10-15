"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
var utils_upload = require("../../utils/upload.js");
var utils_index = require("../../utils/index.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
if (!Math) {
  common_vendor.unref(diaLog)();
}
const diaLog = () => "../../components/diaLog/diaLog.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    hooks_useGetTabBar.useGetTabBar(0);
    getApp();
    const currentDate = utils_util.util.getCurrentDate();
    const CDate = utils_util.util.getChineseDate();
    const backgroundImg = common_vendor.reactive({
      currentBackground: "",
      defaultBackground: "",
      temporaryImg: ""
    });
    common_vendor.onLoad(() => {
      const randomImgurl = utils_index.randomImg[Math.floor(Math.random() * utils_index.randomImg.length)];
      backgroundImg.defaultBackground = randomImgurl;
    });
    const showDialog = common_vendor.ref(false);
    const showClanderDialog = common_vendor.ref(false);
    const checkImgType = common_vendor.ref("default");
    const textareaValue = common_vendor.ref("");
    const inputVal = common_vendor.ref("");
    common_vendor.watch(() => textareaValue.value, (val, oldVal) => {
      if (!val && val == 0)
        inputVal.value = "";
    });
    const homeShort = common_vendor.reactive({
      short: "\u8981\u4F7F\u6574\u4E2A\u4EBA\u751F\u90FD\u8FC7\u5F97\u8212\u9002\u3001\u6109\u5FEB\uFF0C\u8FD9\u662F\u4E0D\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u4EBA\u7C7B\u5FC5\u987B\u5177\u5907\u4E00\u79CD\u80FD\u5E94\u4ED8\u9006\u5883\u7684\u6001\u5EA6",
      author: "\u6069\u683C\u5C14",
      ifCollect: false,
      isChangeImg: false
    });
    const goRecord = () => {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
    };
    const changeImg = () => {
      showDialog.value = true;
      textareaValue.value = homeShort.short;
      inputVal.value = homeShort.author;
      if (homeShort.isChangeImg) {
        checkImgType.value = "optional";
        backgroundImg.temporaryImg = backgroundImg.currentBackground;
      } else {
        checkImgType.value = "default";
        backgroundImg.temporaryImg = "";
      }
    };
    const radioChange = (e) => {
      changeBackIMG(e.detail.value);
    };
    const clickDialog = () => {
      showClanderDialog.value = false;
    };
    const showClander = () => {
      showClanderDialog.value = true;
    };
    const selectImg = (e) => {
      changeBackIMG(e.target.dataset.img);
    };
    const changeBackIMG = (value) => {
      checkImgType.value = value;
      if (value == "default")
        ;
      else if (value == "optional") {
        utils_upload.chooseFile({
          accept: "img",
          maxCount: 1,
          multiple: false
        }).then((res) => {
          backgroundImg.temporaryImg = res[0].url;
        }).catch((error) => {
          if (backgroundImg.temporaryImg)
            return;
          checkImgType.value = "default";
        });
      }
    };
    const confirm = () => {
      backgroundImg.currentBackground = checkImgType.value == "default" ? backgroundImg.defaultBackground : backgroundImg.temporaryImg;
      if (checkImgType.value == "optional") {
        homeShort.isChangeImg = true;
      }
      if (textareaValue.value) {
        homeShort.short = textareaValue.value;
        homeShort.author = inputVal.value;
        homeShort.homeShort = false;
      }
      showDialog.value = false;
    };
    const cancle = () => {
      showDialog.value = false;
    };
    const clearText = () => {
      inputVal.value = textareaValue.value = "";
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
            url: `../square/index`
          });
          break;
        case "\u65E5\u5386":
          common_vendor.index.navigateTo({
            url: `../clander/index`
          });
          break;
        case "\u540D\u53E5\u9274\u8D4F":
          common_vendor.index.navigateTo({
            url: `../famousSaying/index`
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
    common_vendor.onShareAppMessage(() => {
      return {
        title: "\u5199\u4E0B\u4F60\u7684\u751F\u6D3B",
        path: "/page/home/index"
      };
    });
    var myAtoi = function(s) {
      let numStr = "";
      let trueIndex = -1;
      for (var i = 0; i < s.length; i++) {
        if (s[i] === " ") {
          trueIndex = i + 1;
          continue;
        }
        if (!/[0-9]/.test(s[trueIndex + 1])) {
          console.log(/[0-9]/.test(s[trueIndex + 1]), s[trueIndex + 1]);
          console.log(s[i]);
          numStr = "";
          break;
        }
        if (/[a-zA-z]/.test(s[i])) {
          break;
        }
        numStr += s[i];
      }
      console.log(numStr, 11);
      return numStr ? Number(numStr) : 0;
    };
    myAtoi("   -12.88 ancnmskdjn 778".trim());
    return (_ctx, _cache) => {
      return {
        a: backgroundImg.currentBackground || backgroundImg.defaultBackground || common_vendor.unref(utils_index.defaultImg),
        b: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[0]}`),
        c: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[1]}`),
        d: common_vendor.t(common_vendor.unref(currentDate).chinaDate),
        e: common_vendor.t(common_vendor.unref(CDate).ncWeek),
        f: common_vendor.o(showClander),
        g: common_vendor.t(homeShort.short),
        h: common_vendor.t(homeShort.author.indexOf("-") != -1 ? homeShort.author : "-- " + homeShort.author),
        i: common_vendor.s(`color:${homeShort.ifCollect ? "#FBBD08" : "#fff"}`),
        j: common_vendor.o(collectShort),
        k: common_vendor.o(changeImg),
        l: common_vendor.f(common_vendor.unref(utils_index.category), (item, k0, i0) => {
          return {
            a: common_vendor.n(`iconfont ${item.icon}`),
            b: common_vendor.s(`background-color:${item.color}`),
            c: common_vendor.t(item.name),
            d: item.icon,
            e: item.name,
            f: common_vendor.o(handelCheck, item.icon)
          };
        }),
        m: common_vendor.o(goRecord),
        n: backgroundImg.defaultBackground || common_vendor.unref(utils_index.defaultImg),
        o: backgroundImg.temporaryImg || "/static/image/error.png",
        p: common_vendor.n(backgroundImg.currentBackground ? "" : "border"),
        q: common_vendor.o(selectImg),
        r: common_vendor.f(common_vendor.unref(utils_index.radioData), (item, k0, i0) => {
          return {
            a: item.value,
            b: checkImgType.value == item.value,
            c: common_vendor.t(item.name),
            d: item.value
          };
        }),
        s: common_vendor.o(radioChange),
        t: textareaValue.value,
        v: common_vendor.o(($event) => textareaValue.value = $event.detail.value),
        w: !textareaValue.value,
        x: common_vendor.o(clearText),
        y: !textareaValue.value,
        z: inputVal.value,
        A: common_vendor.o(($event) => inputVal.value = $event.detail.value),
        B: common_vendor.o(confirm),
        C: common_vendor.o(cancle),
        D: common_vendor.o(($event) => showDialog.value = $event),
        E: common_vendor.p({
          title: "\u8BBE\u7F6E\u80CC\u666F\u683C\u8A00",
          show: showDialog.value
        }),
        F: common_vendor.t(`${common_vendor.unref(CDate).cYear}/${common_vendor.unref(CDate).cMonth}/${common_vendor.unref(CDate).cDay}`),
        G: common_vendor.t(common_vendor.unref(CDate).ncWeek),
        H: common_vendor.t(common_vendor.unref(CDate).astro),
        I: common_vendor.t(common_vendor.unref(CDate).IMonthCn),
        J: common_vendor.t(common_vendor.unref(CDate).IDayCn),
        K: common_vendor.t(`${common_vendor.unref(CDate).gzYear}\u5E74${common_vendor.unref(CDate).gzMonth}\u6708${common_vendor.unref(CDate).gzDay}\u65E5`),
        L: common_vendor.n(`icon-${common_vendor.unref(CDate).icon}`),
        M: common_vendor.o(clickDialog),
        N: common_vendor.o(($event) => showClanderDialog.value = $event),
        O: common_vendor.p({
          showButton: false,
          width: "70%",
          show: showClanderDialog.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "E:/xiaocx/reacord-day/pages/home/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
