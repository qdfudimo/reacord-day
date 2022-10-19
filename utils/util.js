import {
    ChineseZodiacs
} from './index'
import {
    request
} from './request'
import calendar from "@/uni_modules/uni-calendar/components/uni-calendar/calendar";
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
    }
}
const formatTime = (date = new Date()) => {
    let {
        year,
        month,
        day,
        hour,
        minute,
        second
    } = formatTimeDate()
    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
};
const handelTime = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${[year, month, day].map(formatNumber).join('/')}`;
};
const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};
/**
 * 格式化星期几
 * @param {*} date 要解析的时间
 * @returns 星期几
 */
const getWeek = (date = new Date()) => {
    var days = date.getDay();
    var week = '';
    switch (days) {
        case 1:
            week = '星期一';
            break;
        case 2:
            week = '星期二';
            break;
        case 3:
            week = '星期三';
            break;
        case 4:
            week = '星期四';
            break;
        case 5:
            week = '星期五';
            break;
        case 6:
            week = '星期六';
            break;
        case 0:
            week = '星期日';
            break;
    }

    return week;
}
/**
 * jS实现 数字转中文数字
 * @param {*} number 
 * @returns 
 */
const numberToString = (number) => {
    if (number.match(/\D/) || number.length >= 14) return;
    let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 数字对应中文
    let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
    let string = String(number).split('').reverse().map((item, index) => { // 把数字切割成数组并倒序排列，然后进行遍历转成中文
        // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
        item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
        return item;
    }).reverse().join(''); // 倒叙回来数组，拼接成字符串
    string = string.replace(/^一十/, '十'); // 如果以 一十 开头，可省略一
    string = string.replace(/零+/, '零'); // 如果有多位相邻的零，只写一个即可
    return string;
}
/**
 * 返回农历日期
 * @param {*} time 
 * @returns 
 */
const getChineseDate = () => {
    let {
        year,
        month,
        day,
    } = formatTimeDate()
    let getlunar = calendar.solar2lunar(year, month, day)
    let animal = ChineseZodiacs.get(getlunar.Animal)
    return {
        ...getlunar,
        icon: animal
    }
}
/**
 * 返回当前日期 和几号 汉字形式
 * @param {*} time 
 * @returns 
 */
const getCurrentDate = (time) => {
    let date = time ? new Date(time) : new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let currentDay = day < 10 ? `0${day}` : "" + day
    month = delZoo(numberToString(month + ""));
    day = delZoo(numberToString(day + ""));

    function delZoo(date) {
        let index = date.indexOf("零")
        return index == -1 ? date : date.slice(0, index);
    }
    const week = getWeek()
    return {
        chinaDate: `${month}月${day}日`,
        currentDay,
        week
    }
}
//弹窗提示统一设置
const tip = (title, icon, duration) => {
    uni.showToast({
        title: title || '操作成功',
        icon: icon || 'none',
        duration: duration || 1500,
        mask: true
    })
}
const collectFamous = (e, callBack) => {
    if (!e._id) return
    let data = {
        type: e.ifCollect ? "noCollect" : "collect",
        id: e._id
    }
    uni.showModal({
        title: '提示',
        content: !e.ifCollect ? '是否添加到我的收藏' : '是否取消收藏',
        success: function (res) {
            if (res.confirm) {
                request("getFamousSaying", data).then(({
                    result = {}
                }) => {
                    if (result.updated != 1) {
                        tip("操作失败", "error")
                    } else {
                        e.ifCollect = !e.ifCollect
                        callBack && callBack()
                    }
                })
            } else if (res.cancel) {}
        }
    });
}
export default {
    formatTime,
    handelTime,
    getCurrentDate,
    getChineseDate,
    collectFamous,
    tip
};