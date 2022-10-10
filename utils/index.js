export const radioData = [{
    value: "default",
    name: "系统默认",
}, {
    value: "optional",
    name: "自选图片",
}]
/**防止图片失败兜底照片 */
export const defaultImg = '/static/image/background/rainbow.jpg';
export const category = [
    {
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
        icon: "icon-gerenzhongxin",
        name: "个人中心",
        color: "#ed4e41"
    },
];
export const ChineseZodiac =[
    {
        animal:"猴",
        icon:"xiaolaohu"
    },
    {
        animal:"鸡",
        icon:"xiaoji"
    },
    {
        animal:"狗",
        icon:"xiaogouzi"
    },
    {
        animal:"猪",
        icon:"xiaozhuzhu"
    },
    {
        animal:"鼠",
        icon:"xiaolaoshu"
    },
    {
        animal:"牛",
        icon:"xiaoniuniu"
    },
    {
        animal:"虎",
        icon:"xiaolaohu"
    },
    {
        animal:"兔",
        icon:"xiaotuzi"
    },
    {
        animal:"龙",
        icon:"long"
    },
    {
        animal:"蛇",
        icon:"xiaosheshe"
    },
    {
        animal:"马",
        icon:"xiaoma"
    },
    {
        animal:"羊",
        icon:"xiaoyangyang"
    },
]
const ManagerError = {
    "-30001":"录音接口出错",
    "-30002":"录音暂停接口被调用，录音终止，识别终止",
    "-30003":"录音帧数据未产生或者发送失败导致的数据传输失败",
    "-30004":"因网络或者其他非正常状态导致的未查询识别结果",
    "-30005":"语音识别服务内部错误",
    "-30006":"语音识别服务未在限定时间内识别完成",
    "-30007":"start启动参数错误",
    "-30008":"查询请求时网络失败",
    "-30009":"创建鉴权内部失败",
    "-300010":"发送鉴权时网络失败",
    "-300011":"试图在识别正在进行中是再次调用start，返回错误，正在进行的识别任务正常进行",
    "-300012":"当前无识别任务进行时调用stop错误",
    "-300013":"其他未知错误",
    "-40001":"达到接口调用频率限制",
}