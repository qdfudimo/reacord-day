"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../common/vendor.js");
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item) {
  if (item.isImage != null) {
    return item.isImage;
  }
  if (item.type) {
    return item.type === "image";
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  return false;
}
function isPlainObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}
function pickExclude(obj, keys) {
  if (!isPlainObject(obj)) {
    return {};
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function formatImage(res) {
  return res.tempFiles.map((item) => __spreadProps(__spreadValues({}, pickExclude(item, ["path"])), {
    type: "image",
    url: item.path,
    thumb: item.path
  }));
}
function formatFile(res) {
  return res.tempFiles.map((item) => __spreadProps(__spreadValues({}, pickExclude(item, ["path"])), {
    url: item.path
  }));
}
function chooseFile({
  accept,
  maxCount,
  multiple = true,
  sourceType = ["album", "camera"],
  sizeType = ["original", "compressed"]
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case "img":
        common_vendor.index.chooseImage({
          count: multiple ? maxCount : 1,
          sourceType,
          sizeType,
          success: (res) => resolve(formatImage(res)),
          fail: reject
        });
        break;
      default:
        common_vendor.index.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: (res) => resolve(formatFile(res)),
          fail: reject
        });
        break;
    }
  });
}
exports.chooseFile = chooseFile;
exports.isImageFile = isImageFile;