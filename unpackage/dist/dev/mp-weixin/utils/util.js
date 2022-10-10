"use strict";
var utils_index = require("./index.js");
const formatTime = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
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
const getChineseDate = (time) => {
  let date = time ? new Date(time) : new Date();
  let dateString = date.toLocaleString("zh-CN-u-ca-chinese");
  dateString = dateString.replace(/(\d+)\s*?年/, (x, y) => {
    let result = "";
    result = "\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678".charAt((y - 4) % 10);
    result += "\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5".charAt((y - 4) % 12);
    return result;
  });
  dateString = dateString.split(" ")[0];
  let g = dateString.substr(0, 2) + "\u5E74";
  let m = dateString.substring(2, dateString.match("\u6708").index) + "\u6708";
  let d = dateString.match(/\d+/)[0];
  d = d < 11 ? "\u521D" + numberToString(d) : numberToString(d);
  let index = date.toLocaleString("zh-CN-u-ca-chinese").substr(0, 4) % 12;
  let a = utils_index.ChineseZodiac[index];
  return {
    g,
    m,
    d,
    a
  };
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
var util = {
  formatTime,
  handelTime,
  getCurrentDate,
  getChineseDate
};
exports.util = util;
