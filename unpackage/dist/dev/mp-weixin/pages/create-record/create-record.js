"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
const _sfc_main = {
  data() {
    return {
      height: 20,
      focus: false,
      maxCount: 9,
      files: [],
      maxSize: 10 * 1024 * 1024,
      address: "\u8BF7\u9009\u62E9\u4F4D\u7F6E\u4FE1\u606F",
      location: {
        name: false
      },
      place: {
        address: "\u6C5F\u82CF\u7701\u5BBF\u8FC1\u5E02\u6CAD\u9633\u53BF\u667A\u6167\u6811\u5E7C\u513F\u56ED\u4E1C\u5317(\u5C0F\u8857\u8DEF\u4E1C)",
        errMsg: "chooseLocation:ok",
        latitude: 34.187418,
        longitude: 118.81498,
        name: "\u9EC4\u91D1\u7269\u6D41"
      },
      array: ["\u516C\u5F00", "\u79C1\u5BC6"],
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
  },
  onReady: function() {
  },
  onShow: function() {
    setTimeout(() => {
      common_vendor.index.hideNavigationBarLoading();
    }, 2e3);
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
    a: common_vendor.t($data.files.length),
    b: $data.files.length
  }, $data.files.length ? {
    c: common_vendor.f($data.files, (item, index, i0) => {
      return {
        a: index,
        b: item.url,
        c: index,
        d: index
      };
    }),
    d: common_vendor.o((...args) => $options.onPreviewImage && $options.onPreviewImage(...args)),
    e: common_vendor.o((...args) => $options.deleteItem && $options.deleteItem(...args)),
    f: $data.files
  } : {}, {
    g: $data.files.length < 9
  }, $data.files.length < 9 ? {
    h: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    i: $data.files.length < 9
  }, $data.files.length < 9 ? {
    j: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    k: common_vendor.t($data.location.name || "\u6240\u5728\u4F4D\u7F6E"),
    l: common_vendor.n("location " + ($data.location.name ? "activePlace" : "")),
    m: common_vendor.o((...args) => $options.choosiePlace && $options.choosiePlace(...args)),
    n: common_vendor.t($data.array[$data.canSee]),
    o: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    p: $data.canSee,
    q: $data.array
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/pages/create-record/create-record.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
