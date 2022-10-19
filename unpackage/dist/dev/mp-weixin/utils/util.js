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
var utils_index = require("./index.js");
var utils_request = require("./request.js");
var uni_modules_uniCalendar_components_uniCalendar_calendar = require("../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
const formatTimeDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  };
};
const formatTime = (date = new Date()) => {
  let {
    year,
    month,
    day,
    hour,
    minute,
    second
  } = formatTimeDate();
  return `${[year, month, day].map(formatNumber).join("/")} ${[hour, minute, second].map(formatNumber).join(":")}`;
};
const handelTime = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${[year, month, day].map(formatNumber).join("/")}`;
};
const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};
const getWeek = (date = new Date()) => {
  var days = date.getDay();
  var week = "";
  switch (days) {
    case 1:
      week = "\u661F\u671F\u4E00";
      break;
    case 2:
      week = "\u661F\u671F\u4E8C";
      break;
    case 3:
      week = "\u661F\u671F\u4E09";
      break;
    case 4:
      week = "\u661F\u671F\u56DB";
      break;
    case 5:
      week = "\u661F\u671F\u4E94";
      break;
    case 6:
      week = "\u661F\u671F\u516D";
      break;
    case 0:
      week = "\u661F\u671F\u65E5";
      break;
  }
  return week;
};
const numberToString = (number) => {
  if (number.match(/\D/) || number.length >= 14)
    return;
  let zhArray = ["\u96F6", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"];
  let baseArray = ["", "\u5341", "\u767E", "\u5343", "\u4E07", "\u5341", "\u767E", "\u5343", "\u4EBF", "\u5341", "\u767E", "\u5343", "\u4E07"];
  let string = String(number).split("").reverse().map((item, index) => {
    item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
    return item;
  }).reverse().join("");
  string = string.replace(/^一十/, "\u5341");
  string = string.replace(/零+/, "\u96F6");
  return string;
};
const getChineseDate = () => {
  let {
    year,
    month,
    day
  } = formatTimeDate();
  let getlunar = uni_modules_uniCalendar_components_uniCalendar_calendar.calendar.solar2lunar(year, month, day);
  let animal = utils_index.ChineseZodiacs.get(getlunar.Animal);
  return __spreadProps(__spreadValues({}, getlunar), {
    icon: animal
  });
};
const getCurrentDate = (time) => {
  let date = time ? new Date(time) : new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let currentDay = day < 10 ? `0${day}` : "" + day;
  month = delZoo(numberToString(month + ""));
  day = delZoo(numberToString(day + ""));
  function delZoo(date2) {
    let index = date2.indexOf("\u96F6");
    return index == -1 ? date2 : date2.slice(0, index);
  }
  const week = getWeek();
  return {
    chinaDate: `${month}\u6708${day}\u65E5`,
    currentDay,
    week
  };
};
const tip = (title, icon, duration) => {
  common_vendor.index.showToast({
    title: title || "\u64CD\u4F5C\u6210\u529F",
    icon: icon || "none",
    duration: duration || 1500,
    mask: true
  });
};
const collectFamous = (e, callBack) => {
  if (!e._id)
    return;
  let data = {
    type: e.ifCollect ? "noCollect" : "collect",
    id: e._id
  };
  common_vendor.index.showModal({
    title: "\u63D0\u793A",
    content: !e.ifCollect ? "\u662F\u5426\u6DFB\u52A0\u5230\u6211\u7684\u6536\u85CF" : "\u662F\u5426\u53D6\u6D88\u6536\u85CF",
    success: function(res) {
      if (res.confirm) {
        utils_request.request("getFamousSaying", data).then(({
          result = {}
        }) => {
          if (result.updated != 1) {
            tip("\u64CD\u4F5C\u5931\u8D25", "error");
          } else {
            e.ifCollect = !e.ifCollect;
            callBack && callBack();
          }
        });
      } else if (res.cancel)
        ;
    }
  });
};
var util = {
  formatTime,
  handelTime,
  getCurrentDate,
  getChineseDate,
  collectFamous,
  tip
};
exports.util = util;
