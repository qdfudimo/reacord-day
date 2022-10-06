"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_util = require("../../utils/util.js");
const _sfc_main = {
  data() {
    return {
      logs: []
    };
  },
  onLoad() {
    this.logs = (common_vendor.index.getStorageSync("logs") || []).map((log) => {
      return {
        date: utils_util.util.formatTime(new Date(log)),
        timeStamp: log
      };
    });
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.logs, (log, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(log.date),
        c: log.timeStamp
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/pages/logs/logs.vue"]]);
wx.createPage(MiniProgramPage);
