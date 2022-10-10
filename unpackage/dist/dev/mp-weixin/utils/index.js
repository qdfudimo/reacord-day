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
const ChineseZodiac = [
  {
    animal: "\u7334",
    icon: "xiaolaohu"
  },
  {
    animal: "\u9E21",
    icon: "xiaoji"
  },
  {
    animal: "\u72D7",
    icon: "xiaogouzi"
  },
  {
    animal: "\u732A",
    icon: "xiaozhuzhu"
  },
  {
    animal: "\u9F20",
    icon: "xiaolaoshu"
  },
  {
    animal: "\u725B",
    icon: "xiaoniuniu"
  },
  {
    animal: "\u864E",
    icon: "xiaolaohu"
  },
  {
    animal: "\u5154",
    icon: "xiaotuzi"
  },
  {
    animal: "\u9F99",
    icon: "long"
  },
  {
    animal: "\u86C7",
    icon: "xiaosheshe"
  },
  {
    animal: "\u9A6C",
    icon: "xiaoma"
  },
  {
    animal: "\u7F8A",
    icon: "xiaoyangyang"
  }
];
exports.ChineseZodiac = ChineseZodiac;
exports.category = category;
exports.defaultImg = defaultImg;
exports.radioData = radioData;
