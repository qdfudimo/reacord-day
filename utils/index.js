export const radioData = [{
    value: "default",
    name: "系统随机",
}, {
    value: "optional",
    name: "自选图片",
}]
/**防止图片失败兜底照片 */
export const defaultImg = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/bd229f4c-86eb-4399-a39b-460d764d456b.jpg';
export const category = [{
        icon: "icon-tiaochariji",
        name: "日记本",
        color: "#1CBBB4"
    },
    {
        icon: "icon-tubiaolunkuo-",
        name: "日历",
        color: "#9C26B0"
    },
    {
        icon: "icon-icon_xinyong_xianxing_jijin-107",
        name: "名句鉴赏",
        color: "#32c312"
    },
    // {
    //     icon: "icon-qiandaodaka",
    //     name: "打卡",
    //     color: "#72c2f4"
    // },
    {
        icon: "icon-yuyinshi",
        name: "语音识别文字",
        color: "#1296db"
    },
    {
        icon: "icon-gerenzhongxin",
        name: "个人中心",
        color: "#ed4e41"
    },
];
export const ChineseZodiacs = new Map()
ChineseZodiacs.set("猴", "xiaohouzi")
ChineseZodiacs.set("鸡", "xiaoji")
ChineseZodiacs.set("狗", "xiaogouzi")
ChineseZodiacs.set("猪", "xiaozhuzhu")
ChineseZodiacs.set("鼠", "xiaolaoshu")
ChineseZodiacs.set("牛", "xiaoniuniu")
ChineseZodiacs.set("虎", "xiaolaohu")
ChineseZodiacs.set("兔", "xiaotuzi")
ChineseZodiacs.set("龙", "long")
ChineseZodiacs.set("蛇", "xiaosheshe")
ChineseZodiacs.set("马", "xiaoma")
ChineseZodiacs.set("羊", "xiaoyangyang")
const ManagerError = {
    "-30001": "录音接口出错",
    "-30002": "录音暂停接口被调用，录音终止，识别终止",
    "-30003": "录音帧数据未产生或者发送失败导致的数据传输失败",
    "-30004": "因网络或者其他非正常状态导致的未查询识别结果",
    "-30005": "语音识别服务内部错误",
    "-30006": "语音识别服务未在限定时间内识别完成",
    "-30007": "start启动参数错误",
    "-30008": "查询请求时网络失败",
    "-30009": "创建鉴权内部失败",
    "-300010": "发送鉴权时网络失败",
    "-300011": "试图在识别正在进行中是再次调用start，返回错误，正在进行的识别任务正常进行",
    "-300012": "当前无识别任务进行时调用stop错误",
    "-300013": "其他未知错误",
    "-40001": "达到接口调用频率限制",
}
/**背景图片 */
export const randomImg = [
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
]
/**分享图片 */
export const shareImg = [
    "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/b96c8a2a-35c3-4b94-ab82-ec99789e28b5.png",
    "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/5cf60f21-51a3-4fc0-b0a0-51e6eaabe481.png",
    "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/48584376-6215-4bf4-9289-669a27a13c01.png",
    "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/833a7386-6559-4018-90c7-78db18f89438.png"
]