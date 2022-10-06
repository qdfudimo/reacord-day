"use strict";
var common_vendor = require("../common/vendor.js");
function useGetTabBar(index) {
  common_vendor.onShow(() => {
    const curPages = getCurrentPages()[0];
    if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
      curPages.getTabBar().setData({
        selected: index
      });
    }
  });
}
exports.useGetTabBar = useGetTabBar;
