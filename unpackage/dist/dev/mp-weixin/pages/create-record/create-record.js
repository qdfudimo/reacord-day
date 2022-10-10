"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var utils_authorPre = require("../../utils/authorPre.js");
const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
const _sfc_main = {
  data() {
    return {
      height: 20,
      focus: false,
      timer: null,
      maxCount: 9,
      textareaValue: "",
      files: [],
      maxSize: 10 * 1024 * 1024,
      address: "\u8BF7\u9009\u62E9\u4F4D\u7F6E\u4FE1\u606F",
      location: {
        name: false
      },
      recordState: false,
      recordAuthorStatus: false,
      place: {
        address: "\u6C5F\u82CF\u7701\u5BBF\u8FC1\u5E02\u6CAD\u9633\u53BF\u667A\u6167\u6811\u5E7C\u513F\u56ED\u4E1C\u5317(\u5C0F\u8857\u8DEF\u4E1C)",
        errMsg: "chooseLocation:ok",
        latitude: 34.187418,
        longitude: 118.81498,
        name: "\u9EC4\u91D1\u7269\u6D41"
      },
      array: [
        {
          mood: "\u5F00\u5FC3"
        },
        {
          mood: "\u96BE\u8FC7"
        },
        {
          mood: "\u4F24\u5FC3"
        },
        {
          mood: "\u72AF\u56F0"
        },
        {
          mood: "\u5E78\u798F"
        },
        {
          mood: "\u8FF7\u832B"
        },
        {
          mood: "emo"
        },
        {
          mood: "\u7D2F"
        }
      ],
      canSee: 0
    };
  },
  onLoad: function(options) {
    common_vendor.index.showNavigationBarLoading();
    common_vendor.index.setNavigationBarTitle({
      title: "\u5199\u8BF4\u8BF4"
    });
    common_vendor.index.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#25BDCE",
      animation: {
        duration: 1e3,
        timingFunc: "easeIn"
      }
    });
    this.initRecord();
    this.handleRecord().then((res) => {
      this.recordAuthorStatus = res;
    });
  },
  onReady: function() {
  },
  onShow: function() {
    setTimeout(() => {
      common_vendor.index.hideNavigationBarLoading();
    }, 1e3);
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
  },
  onReachBottom: function() {
  },
  onShareAppMessage: function() {
  },
  methods: {
    initRecord: function() {
      const that = this;
      manager.onRecognize = function(res) {
        console.log(res);
      };
      manager.onStart = function(res) {
        console.log("\u6210\u529F\u5F00\u59CB\u5F55\u97F3\u8BC6\u522B", res);
      };
      manager.onError = function(res) {
        that.recordState = false;
        common_vendor.index.showToast({
          title: "\u8BED\u97F3\u8BC6\u522B\u5931\u8D25",
          icon: "error",
          duration: 1e3
        });
        console.error("error msg", res);
      };
      manager.onStop = function(res) {
        console.log("..............\u7ED3\u675F\u5F55\u97F3");
        console.log("\u5F55\u97F3\u4E34\u65F6\u6587\u4EF6\u5730\u5740 -->" + res.tempFilePath);
        console.log("\u5F55\u97F3\u603B\u65F6\u957F -->" + res.duration + "ms");
        console.log("\u6587\u4EF6\u5927\u5C0F --> " + res.fileSize + "B");
        console.log("\u8BED\u97F3\u5185\u5BB9 --> " + res.result);
        if (res.result == "") {
          common_vendor.index.showModal({
            title: "\u63D0\u793A",
            content: "\u542C\u4E0D\u6E05\u695A\uFF0C\u8BF7\u91CD\u65B0\u8BF4\u4E00\u904D\uFF01",
            showCancel: false,
            success: function(res2) {
            }
          });
          return;
        }
        var text = that.textareaValue + res.result;
        that.textareaValue = text;
      };
    },
    touchStart(e) {
      if (!this.recordAuthorStatus)
        return;
      this.recordState = true;
      manager.start({
        lang: "zh_CN"
      });
    },
    touchEnd(e) {
      console.log("\u7ED3\u675F\u4E86");
      if (this.recordAuthorStatus) {
        manager.stop();
        this.recordState = false;
      }
    },
    async handleRecord() {
      let scoped = false;
      let scopedRecord = await utils_authorPre.getSetting("scope.record");
      if (scopedRecord === void 0) {
        scoped = await utils_authorPre.authorize("scope.record", "\u8BED\u97F3\u6388\u6743\u5931\u8D25");
      }
      if (scopedRecord === false) {
        scoped = await this.openShowSetting("scope.record");
      }
      if (scopedRecord === true) {
        scoped = true;
      }
      return scoped;
    },
    openShowSetting(name) {
      return new Promise((resolve, reject) => {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u8BF7\u6253\u5F00\u5F55\u97F3\u6743\u9650",
          showCancel: true,
          cancelText: "\u53D6\u6D88",
          cancelColor: "#000000",
          confirmText: "\u786E\u5B9A",
          confirmColor: "#3CC51F",
          success: (res) => {
            if (res.confirm) {
              utils_authorPre.openSetting(name).then((res2) => {
                resolve(res2);
              }).catch((error) => {
                reject(error);
              });
            } else if (res.cancel) {
              reject(false);
              common_vendor.index.showToast({
                title: "\u9700\u8981\u8BED\u97F3\u6743\u9650",
                icon: "none",
                duration: 2e3
              });
            }
          }
        });
      });
    },
    chooseImage(event) {
      const { type } = event.currentTarget.dataset;
      let files = this.files;
      utils_upload.chooseFile({
        accept: type,
        maxCount: this.maxCount - files.length
      }).then((res) => {
        this.onAfterRead(res);
      }).catch((error) => {
      });
    },
    onAfterRead(file) {
      const { maxSize } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        common_vendor.index.showToast({
          title: "\u5355\u4E2A\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC710M",
          icon: "none"
        });
        return;
      }
      this.files = this.files.concat(Array.isArray(file) ? file : [file]);
    },
    onPreviewImage(event) {
      const { index } = event.currentTarget.dataset;
      const { files } = this;
      const item = files[index];
      common_vendor.index.previewImage({
        urls: files.filter((item2) => utils_upload.isImageFile(item2)).map((item2) => item2.url),
        current: item.url,
        fail() {
          common_vendor.index.showToast({
            title: "\u9884\u89C8\u56FE\u7247\u5931\u8D25",
            icon: "none"
          });
        }
      });
    },
    deleteItem(event) {
      const { index } = event.currentTarget.dataset;
      this.files = this.files.filter((item, i) => i !== index);
    },
    choosiePlace() {
      let that = this;
      common_vendor.index.chooseLocation({
        success(res) {
          console.log(res);
          const { address, name, latitude, longitude } = res;
          that.location = {
            address,
            name,
            latitude,
            longitude
          };
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    choosiePlaces() {
      let { latitude, longitude } = this.place;
      common_vendor.index.chooseLocation({
        latitude,
        longitude,
        success(res) {
          console.log(res);
        }
      });
    },
    getLocation() {
      common_vendor.index.getLocation({
        type: "wgs84",
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          common_vendor.index.openLocation({
            latitude,
            longitude,
            success(res2) {
            },
            fail() {
              console.log(res);
            }
          });
        }
      });
    },
    bindPickerChange(e) {
      this.canSee = e.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.textareaValue,
    b: common_vendor.o(($event) => $data.textareaValue = $event.detail.value),
    c: common_vendor.t($data.files.length),
    d: $data.files.length
  }, $data.files.length ? {
    e: common_vendor.f($data.files, (item, index, i0) => {
      return {
        a: index,
        b: item.url,
        c: index,
        d: index
      };
    }),
    f: common_vendor.o((...args) => $options.onPreviewImage && $options.onPreviewImage(...args)),
    g: common_vendor.o((...args) => $options.deleteItem && $options.deleteItem(...args)),
    h: $data.files
  } : {}, {
    i: $data.files.length < 9
  }, $data.files.length < 9 ? {
    j: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    k: $data.files.length < 9
  }, $data.files.length < 9 ? {
    l: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    m: common_vendor.t($data.location.name || "\u6240\u5728\u4F4D\u7F6E"),
    n: common_vendor.n("location " + ($data.location.name ? "activePlace" : "")),
    o: common_vendor.o((...args) => $options.choosiePlace && $options.choosiePlace(...args)),
    p: common_vendor.t($data.array[$data.canSee].mood),
    q: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    r: $data.canSee,
    s: $data.array,
    t: common_vendor.t(!$data.recordState ? " \u6309\u4F4F\u8BED\u97F3\u8BC6\u522B" : "\u677E\u5F00\u7ED3\u675F"),
    v: common_vendor.n($data.recordState ? "yuyinBtnBg" : ""),
    w: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    x: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    y: !$data.files.length && !$data.textareaValue,
    z: $data.recordState
  }, $data.recordState ? {} : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/pages/create-record/create-record.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
