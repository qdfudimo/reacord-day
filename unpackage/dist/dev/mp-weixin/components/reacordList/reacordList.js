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
    },
    remove(e) {
      this.$emit("remove", {
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
    d: $props.reacordList.mood
  }, $props.reacordList.mood ? {
    e: common_vendor.t($props.reacordList.mood)
  } : {}, {
    f: common_vendor.t($props.reacordList.scheduleContent),
    g: $props.reacordList.scheduleImg && $props.reacordList.scheduleImg.length
  }, $props.reacordList.scheduleImg && $props.reacordList.scheduleImg.length ? {
    h: common_vendor.f($props.reacordList.scheduleImg, (i, index, i0) => {
      return {
        a: i,
        b: index,
        c: common_vendor.o((...args) => $options.preview && $options.preview(...args), index),
        d: index
      };
    }),
    i: $props.reacordList.scheduleImg
  } : {}, {
    j: common_vendor.o((...args) => $options.remove && $options.remove(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/components/reacordList/reacordList.vue"]]);
wx.createComponent(Component);
