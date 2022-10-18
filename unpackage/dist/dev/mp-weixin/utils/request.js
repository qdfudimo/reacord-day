"use strict";
var common_vendor = require("../common/vendor.js");
var utils_util = require("./util.js");
let token;
const request = (name = "", data = {}) => {
  if (token)
    data.token = token;
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D"
    });
    common_vendor.pn.callFunction({
      name,
      data
    }).then((res) => {
      resolve(res);
    }).catch((error) => {
      utils_util.util.tip("\u8BF7\u6C42\u5931\u8D25", "error");
      reject(error);
    }).finally(() => {
      common_vendor.index.hideLoading();
    });
  });
};
function login() {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success: (res) => {
        request("login", {
          code: res.code
        }).then((res2) => {
          if (res2.result && res2.result.token)
            token = res2.result.token;
          resolve(res2);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  });
}
exports.login = login;
exports.request = request;
