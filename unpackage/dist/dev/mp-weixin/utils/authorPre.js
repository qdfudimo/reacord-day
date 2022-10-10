"use strict";
var common_vendor = require("../common/vendor.js");
const authorize = (name, title = "\u6388\u6743\u5931\u8D25") => {
  return new Promise((resolve, reject) => {
    common_vendor.index.authorize({
      scope: name,
      success() {
        resolve();
      },
      fail(error) {
        console.log(error);
        wx.showToast({
          title,
          icon: "error"
        });
        reject();
      }
    });
  });
};
const getSetting = (name) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getSetting({
      success(res) {
        resolve(res.authSetting[name]);
      },
      fail(error) {
        reject(error);
      }
    });
  });
};
const openSetting = (name) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.openSetting({
      success(res) {
        resolve(res.authSetting[name]);
      },
      fail(error) {
        reject(error);
      }
    });
  });
};
exports.authorize = authorize;
exports.getSetting = getSetting;
exports.openSetting = openSetting;
