"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_util = require("../../utils/util.js");
require("../../utils/index.js");
require("../../utils/request.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
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
    ifNote: {
      type: Boolean,
      default: true
    },
    userInfo: Object,
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
    formatTime(time) {
      return utils_util.util.formatTime(time);
    },
    choosiePosi() {
      let longitude = this.reacordList.point.coordinates[0];
      let latitude = this.reacordList.point.coordinates[1];
      common_vendor.index.openLocation({
        latitude,
        longitude,
        success: function() {
          console.log("success");
        }
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
    a: $props.ifNote
  }, $props.ifNote ? {
    b: $props.userInfo.avatarUrl || "/static/image/avtar.png"
  } : {
    c: common_vendor.s(`background-color: ${$props.reacordList.color};`),
    d: $props.reacordList.clockUrl
  }, {
    e: $props.ifNote
  }, $props.ifNote ? {
    f: common_vendor.t($props.userInfo.nickName)
  } : common_vendor.e({
    g: common_vendor.t($props.reacordList.weather),
    h: $props.reacordList.weatherUrl
  }, $props.reacordList.weatherUrl ? {
    i: $props.reacordList.weatherUrl || "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/2062e2d4-2a30-47f2-b788-c30890149d67.png"
  } : {}), {
    j: common_vendor.t($options.formatTime($props.reacordList.create_time)),
    k: common_vendor.n($props.ifNote ? "" : "clockCs"),
    l: $props.reacordList.mood
  }, $props.reacordList.mood ? {
    m: common_vendor.t($props.reacordList.mood)
  } : {}, {
    n: $props.ifNote
  }, $props.ifNote ? common_vendor.e({
    o: common_vendor.t($props.reacordList.content),
    p: $props.reacordList.imgUrl && $props.reacordList.imgUrl.length
  }, $props.reacordList.imgUrl && $props.reacordList.imgUrl.length ? {
    q: common_vendor.f($props.reacordList.imgUrl, (i, index, i0) => {
      return {
        a: i,
        b: index,
        c: common_vendor.o((...args) => $options.preview && $options.preview(...args), index),
        d: index
      };
    }),
    r: $props.reacordList.imgUrl
  } : {}) : {}, {
    s: $props.reacordList.name
  }, $props.reacordList.name ? {
    t: common_vendor.t($props.reacordList.name),
    v: common_vendor.o((...args) => $options.choosiePosi && $options.choosiePosi(...args))
  } : {}, {
    w: common_vendor.o((...args) => $options.remove && $options.remove(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/xiaocx/reacord-day/components/reacordList/reacordList.vue"]]);
wx.createComponent(Component);
