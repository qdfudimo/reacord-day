"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      i: ""
    };
  },
  options: {
    styleIsolation: "apply-shared"
  },
  props: {
    reacordList: Object,
    onlyIndex: Number
  },
  beforeMount: function() {
  },
  moved: function() {
  },
  destroyed: function() {
  },
  beforeMount: function() {
  },
  mounted: function() {
  },
  onPageShow: function() {
  },
  onPageHide: function() {
  },
  onPageResize: function() {
  },
  methods: {
    preview(e) {
      let dataset = e.currentTarget.dataset;
      let urls = dataset.urls;
      let index = dataset.index;
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    },
    changeLike(e) {
      this.$emit("changeLike", {
        detail: this.onlyIndex
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.reacordList.userAvatrImage || "/static/image/avtar.png",
    b: common_vendor.t($props.reacordList.userName),
    c: common_vendor.t($props.reacordList.scheduleTime),
    d: common_vendor.t($props.reacordList.scheduleContent),
    e: $props.reacordList.scheduleImg && $props.reacordList.scheduleImg.length
  }, $props.reacordList.scheduleImg && $props.reacordList.scheduleImg.length ? {
    f: common_vendor.f($props.reacordList.scheduleImg, (i, index, i0) => {
      return {
        a: i,
        b: index,
        c: common_vendor.o((...args) => $options.preview && $options.preview(...args), index),
        d: index
      };
    }),
    g: $props.reacordList.scheduleImg
  } : {}, {
    h: common_vendor.t($props.reacordList.commentCount || "\u8BC4\u8BBA"),
    i: common_vendor.s("font-size:" + ($props.reacordList.commentCount ? "16px" : "12px") + ";"),
    j: common_vendor.o((...args) => $options.changeLike && $options.changeLike(...args)),
    k: common_vendor.s("color:" + ($props.reacordList.ifMyLike ? "#eb3349" : "#ccc") + ";font-size:22px;margin-right:6px;"),
    l: common_vendor.t($props.reacordList.likeCount)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/component/reacordList/reacordList.vue"]]);
wx.createComponent(Component);
