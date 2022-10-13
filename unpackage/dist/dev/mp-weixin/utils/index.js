"use strict";
const radioData = [{
  value: "default",
  name: "\u7CFB\u7EDF\u9ED8\u8BA4"
}, {
  value: "optional",
  name: "\u81EA\u9009\u56FE\u7247"
}];
const defaultImg = "/static/image/background/rainbow.jpg";
const category = [
  {
    icon: "icon-tiaochariji",
    name: "\u65E5\u8BB0\u672C",
    color: "#1CBBB4"
  },
  {
    icon: "icon-tubiaolunkuo-",
    name: "\u65E5\u5386",
    color: "#9C26B0"
  },
  {
    icon: "icon-icon_xinyong_xianxing_jijin-107",
    name: "\u540D\u53E5\u9274\u8D4F",
    color: "#32c312"
  },
  {
    icon: "icon-gerenzhongxin",
    name: "\u4E2A\u4EBA\u4E2D\u5FC3",
    color: "#ed4e41"
  }
];
const ChineseZodiacs = /* @__PURE__ */ new Map();
ChineseZodiacs.set("\u7334", "xiaohouzi");
ChineseZodiacs.set("\u9E21", "xiaoji");
ChineseZodiacs.set("\u72D7", "xiaogouzi");
ChineseZodiacs.set("\u732A", "xiaozhuzhu");
ChineseZodiacs.set("\u9F20", "xiaolaoshu");
ChineseZodiacs.set("\u725B", "xiaoniuniu");
ChineseZodiacs.set("\u864E", "xiaolaohu");
ChineseZodiacs.set("\u5154", "xiaotuzi");
ChineseZodiacs.set("\u9F99", "long");
ChineseZodiacs.set("\u86C7", "xiaosheshe");
ChineseZodiacs.set("\u9A6C", "xiaoma");
ChineseZodiacs.set("\u7F8A", "xiaoyangyang");
exports.ChineseZodiacs = ChineseZodiacs;
exports.category = category;
exports.defaultImg = defaultImg;
exports.radioData = radioData;
