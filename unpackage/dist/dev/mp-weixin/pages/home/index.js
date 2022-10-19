"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useGetTabBar = require("../../hooks/useGetTabBar.js");
var utils_util = require("../../utils/util.js");
var utils_upload = require("../../utils/upload.js");
var utils_request = require("../../utils/request.js");
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
      temporaryImg: "",
      imgId: ""
    });
    const showDialog = common_vendor.ref(false);
    const isOriginal = common_vendor.ref(false);
    const confirmDisabled = common_vendor.ref(false);
    const showClanderDialog = common_vendor.ref(false);
    const checkImgType = common_vendor.ref("default");
    const textareaValue = common_vendor.ref("");
    const inputVal = common_vendor.ref("");
    let ifchangeBackGroud = false;
    const homeShort = common_vendor.reactive({
      data: {
        famousContent: "",
        creator: "",
        _id: "",
        ifCollect: false
      }
    });
    common_vendor.watch(() => textareaValue.value, (val, oldVal) => {
      if (!val)
        inputVal.value = "";
    });
    common_vendor.onLoad(async () => {
      await utils_request.login();
      requsetImg();
      requsetFamous();
    });
    const requsetImg = () => {
      let data = {
        type: "read",
        imgType: 0
      };
      utils_request.request("backgroundUrl", data).then(({ result = {} }) => {
        if (result.affectedDocs != 0) {
          backgroundImg.currentBackground = result.data[0].imgUrl || "";
          backgroundImg.imgId = result.data[0]._id || "";
        }
        if (backgroundImg.defaultBackground)
          return;
        const randomImgurl = utils_index.randomImg[Math.floor(Math.random() * utils_index.randomImg.length)];
        backgroundImg.defaultBackground = randomImgurl;
      }).finally((e) => {
        common_vendor.index.stopPullDownRefresh();
      });
    };
    const requsetFamous = () => {
      let data = {
        type: "read"
      };
      utils_request.request("signatureHistory", data).then(({ result = {} }) => {
        if (result.affectedDocs == 1) {
          let { famousContent, creator, ifCollect = false, _id = "" } = result.data[0];
          homeShort.data.famousContent = famousContent;
          homeShort.data.creator = creator;
          homeShort.data.ifCollect = ifCollect;
          homeShort.data._id = _id;
          isOriginal.value = result.isOriginal;
        } else {
          isOriginal.value = false;
        }
      }).finally((e) => {
        common_vendor.index.stopPullDownRefresh();
      });
    };
    const goRecord = () => {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
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
          ifchangeBackGroud = true;
          backgroundImg.temporaryImg = res[0].url;
        }).catch((error) => {
          console.log(error, "error");
          if (backgroundImg.temporaryImg)
            return;
          checkImgType.value = "default";
        });
      }
    };
    const confirm = async () => {
      confirmDisabled.value = true;
      let oldImgUrl = backgroundImg.currentBackground;
      backgroundImg.currentBackground = checkImgType.value == "default" ? backgroundImg.defaultBackground : backgroundImg.temporaryImg;
      let data = {
        type: "add",
        imgType: 0,
        oldImgUrl,
        id: backgroundImg.imgId
      };
      if (checkImgType.value == "optional") {
        if (ifchangeBackGroud) {
          let res = await utils_upload.uplodFile(backgroundImg.currentBackground);
          if (res.success) {
            data.url = res.fileID;
            let { result = {} } = await utils_request.request("backgroundUrl", data);
            result.success && (backgroundImg.imgId = result.id);
          }
        }
      } else {
        if (backgroundImg.imgId) {
          data.type = "delete";
          await utils_request.request("backgroundUrl", data);
          backgroundImg.imgId = "";
        }
      }
      if (textareaValue.value != homeShort.data.famousContent || homeShort.data.creator != inputVal.value) {
        let text = {
          famousContent: textareaValue.value,
          creator: inputVal.value,
          type: "add"
        };
        isOriginal.value && (text.id = homeShort.data._id);
        await utils_request.request("signatureHistory", text);
      }
      requsetFamous();
      showDialog.value = false;
    };
    const cancle = () => {
      showDialog.value = false;
    };
    const clearText = () => {
      inputVal.value = textareaValue.value = "";
    };
    const collectShort = (e) => {
      utils_util.util.collectFamous(homeShort.data);
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
        case "\u8BED\u97F3\u8BC6\u522B\u6587\u5B57":
          common_vendor.index.navigateTo({
            url: `../yuyin/index`
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
    common_vendor.onPullDownRefresh(() => {
      requsetImg();
      requsetFamous();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[0]}`),
        b: common_vendor.n(`iconfont icon-shuzi${common_vendor.unref(currentDate).currentDay[1]}`),
        c: common_vendor.t(common_vendor.unref(currentDate).chinaDate),
        d: common_vendor.t(common_vendor.unref(CDate).ncWeek),
        e: common_vendor.o(showClander),
        f: common_vendor.t(homeShort.data.famousContent),
        g: common_vendor.t("-- " + (homeShort.data.creator || "\u533F\u540D")),
        h: !isOriginal.value
      }, !isOriginal.value ? {
        i: common_vendor.s(`color:${homeShort.data.ifCollect ? "#FBBD08" : "#fff"}`),
        j: common_vendor.o(collectShort)
      } : {}, {
        k: common_vendor.n(homeShort.data.famousContent ? "visable" : "hidden"),
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
        n: backgroundImg.defaultBackground,
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
          confirmDisabled: confirmDisabled.value,
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
        }),
        P: common_vendor.s(`background-image:url(${backgroundImg.currentBackground || backgroundImg.defaultBackground});`)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "E:/xiaocx/reacord-day/pages/home/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
