"use strict";
const radioData = [{
  value: "default",
  name: "\u7CFB\u7EDF\u968F\u673A"
}, {
  value: "optional",
  name: "\u81EA\u9009\u56FE\u7247"
}];
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
const randomImg = [
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/c8446bbf-6121-47fb-ac08-35affdfae2b6.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/1433b052-daab-4f5d-afcd-6ff071e24a7c.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/2284dc69-b4c5-4a6e-aaf2-de7a7429d382.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/897baf77-401a-42c5-a6e5-fe0ee0be1738.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/630592af-8e5a-4262-a9bf-98139ad44a19.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/e60e944f-ca5f-423e-ad49-87345a271e2b.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/431a8a5f-b029-49ad-8df4-4cab53385263.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/bd229f4c-86eb-4399-a39b-460d764d456b.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/0ece416d-4e46-4a26-83bc-d4fa453b72de.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/31e0be52-618e-469a-a070-ed2bbfb8c9dd.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/4ba5b999-9b96-4b39-b1d5-88c5e6e0ea94.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/7bf6a7eb-dba2-440d-8717-7c6b01a5a6e4.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/34bc5696-85e5-400c-bf03-77b191ffadd4.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/445d582b-cd5d-412c-b598-53abd5ac1b57.jpg",
  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/01c9908a-569f-4a16-b85e-29098ad9b344.jpg"
];
exports.ChineseZodiacs = ChineseZodiacs;
exports.category = category;
exports.radioData = radioData;
exports.randomImg = randomImg;
