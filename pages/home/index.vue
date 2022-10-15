<template>
    <!-- pages/mine/index.wxml -->
    <view class='container '>
        <image class="background_image"
            :src="backgroundImg.currentBackground ||backgroundImg.defaultBackground|| defaultImg" mode="aspectFill">
        </image>
        <view class="top_content">
            <view class="time" @tap="showClander">
                <view class="month_day">
                    <view :class="`iconfont icon-shuzi${currentDate.currentDay[0]}`"></view>
                    <view :class="`iconfont icon-shuzi${currentDate.currentDay[1]}`"></view>
                </view>
                <view class="month_date">
                    <view class="lunar_calendar">
                        {{currentDate.chinaDate}}
                    </view>
                    <view class="week">
                        {{CDate.ncWeek}}
                    </view>
                </view>
            </view>
            <view class="textCon">
                <view class="text">
                    <view class="sayCont">
                        {{homeShort.short}}
                    </view>
                    <view class="whoSay"> {{homeShort.author.indexOf("-")!=-1?homeShort.author:"-- "+homeShort.author}}
                    </view>
                </view>
                <view :style="`color:${homeShort.ifCollect?'#FBBD08':'#fff'}`" class="shoucang iconfont icon-shoucang2"
                    @tap="collectShort"></view>
            </view>
            <view class="iconfont icon-shezhi1 setIcon" @tap="changeImg"></view>
        </view>
        <view class="category_list">
            <view class="typeFunction">
                <view class="cartgrouy" v-for="item in category" :key="item.icon" :data-name="item.name"
                    @tap="handelCheck">
                    <view :class="`iconfont ${item.icon}`" :style="`background-color:${item.color}`"></view>
                    <view class="type_name">{{item.name}}</view>
                </view>
            </view>
            <button class="write iconfont icon-xie" @tap="goRecord"> 写日记</button>
        </view>
        <dia-log v-model:show="showDialog" title="设置背景格言" @confirm="confirm" @cancle="cancle">
            <view class="modal_content">
                <view class="picture" @tap="selectImg">
                    <view style="margin-right: 8px;" class="select_img" data-img="default">
                        <img data-img="default" class="default_image"
                            :src="backgroundImg.defaultBackground || defaultImg" mode="aspectFill" />
                    </view>
                    <view style="margin-left: 8px;" :class="['select_img',backgroundImg.currentBackground?'':'border']"
                        data-img="optional">
                        <img data-img="optional" class="default_image"
                            :src="backgroundImg.temporaryImg || '/static/image/error.png'" mode="aspectFit" />
                    </view>
                </view>
                <radio-group class="radio_group" @change="radioChange">
                    <label class="radio" v-for="item in radioData" :key="item.value">
                        <radio :value="item.value" :checked="checkImgType == item.value" />{{item.name}}
                    </label>
                </radio-group>
                <view class="textArea">
                    <textarea v-model="textareaValue" placeholder-style="color:#cdcdcd" :maxlength="100"
                        placeholder="请输入自定义格言" />
                    <view class="clear"><button :disabled="!textareaValue" @tap="clearText">清楚自选格言</button></view>
                    <input class="input" :disabled="!textareaValue" v-model="inputVal" placeholder-style="color:#cdcdcd"
                        maxlength="10" placeholder="创作人" />
                </view>
            </view>
        </dia-log>
        <dia-log v-model:show="showClanderDialog" :showButton="false" width="70%" @clickDialog="clickDialog">
            <view class="clander_content">
                <view class="iconfont icon-tubiaolunkuo-" style="color:#4dbb14;font-size:32px;font-weight: 800;">
                </view>
                <view> {{`${CDate.cYear}/${CDate.cMonth}/${CDate.cDay}`}} {{CDate.ncWeek}}</view>
                <view> {{CDate.astro}}</view>
                <view> 农历{{CDate.IMonthCn}}{{CDate.IDayCn}}</view>
                <view> {{`${CDate.gzYear}年${CDate.gzMonth}月${CDate.gzDay}日`}}</view>
                <view :class="['iconfont',`icon-${CDate.icon}`]" style="font-size:46px;color: #8a8a8a;"></view>
            </view>
        </dia-log>
    </view>
</template>

<script setup>
// pages/mine/index.js
import { onLoad, onShareAppMessage, onShow } from "@dcloudio/uni-app";
import { ref, reactive, watch } from 'vue';
import diaLog from "@/components/diaLog/diaLog";
import { useGetTabBar } from "@/hooks/useGetTabBar";
import util from "@/utils/util";
import { chooseFile } from '@/utils/upload';
import { radioData, category, defaultImg, randomImg, shareImg } from '@/utils/index';
useGetTabBar(0)
const app = getApp();
const currentDate = util.getCurrentDate()
const CDate = util.getChineseDate()
//系统默认图片
const backgroundImg = reactive({
    //背景图片地址
    currentBackground: "",
    //系统默认图片
    defaultBackground: "",
    //图片临时选择的图片
    temporaryImg: ""
});
onLoad(() => {
    const randomImgurl = randomImg[Math.floor(Math.random() * randomImg.length)];
    backgroundImg.defaultBackground = randomImgurl;
})
const showDialog = ref(false)
const showClanderDialog = ref(false)
//按钮图片选择类型 默认 还是自选
const checkImgType = ref("default")
const textareaValue = ref("")
const inputVal = ref("")
watch(() => textareaValue.value, (val, oldVal) => {
    // console.log(val, oldVal);
    if (!val && val == 0) inputVal.value = ""
})
//短句
const homeShort = reactive({
    short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
    author: "恩格尔",
    ifCollect: false,
    //是否更改过自选图片 false 否 
    isChangeImg: false
})
const goRecord = () => {
    uni.navigateTo({
        url: `../create-record/create-record`
    });
}
const changeImg = () => {
    showDialog.value = true;
    textareaValue.value = homeShort.short
    inputVal.value = homeShort.author
    if (homeShort.isChangeImg) {
        checkImgType.value = "optional"
        backgroundImg.temporaryImg = backgroundImg.currentBackground
    } else {
        checkImgType.value = 'default';
        backgroundImg.temporaryImg = "";
    }
}
const radioChange = (e) => {
    changeBackIMG(e.detail.value)
}
const clickDialog = () => {
    showClanderDialog.value = false
}
const showClander = () => {
    showClanderDialog.value = true
}
const selectImg = (e) => {
    changeBackIMG(e.target.dataset.img)
}
const changeBackIMG = (value) => {
    checkImgType.value = value
    if (value == "default") {
    } else if (value == "optional") {
        chooseFile({
            accept: 'img',
            maxCount: 1,
            multiple: false
        })
            .then((res) => {
                backgroundImg.temporaryImg = res[0].url
            })
            .catch((error) => {
                if (backgroundImg.temporaryImg) return
                checkImgType.value = "default"
            });
    }
}
const confirm = () => {
    backgroundImg.currentBackground = checkImgType.value == 'default' ? backgroundImg.defaultBackground : backgroundImg.temporaryImg;
    if (checkImgType.value == 'optional') {
        //上传图片
        homeShort.isChangeImg = true;
    }
    if (textareaValue.value) {
        homeShort.short = textareaValue.value
        homeShort.author = inputVal.value
        homeShort.homeShort = false
    }
    showDialog.value = false;
}
const cancle = () => {
    showDialog.value = false;
}
const clearText = () => {
    inputVal.value = textareaValue.value = ""
}
const collectShort = (e) => {
    uni.showModal({
        title: '提示',
        content: !homeShort.ifCollect ? '是否添加到我的收藏' : '是否取消收藏',
        success: function (res) {
            if (res.confirm) {
                homeShort.ifCollect = !homeShort.ifCollect
            } else if (res.cancel) {
            }
        }
    });
}
const handelCheck = (e) => {
    switch (e.currentTarget.dataset.name) {
        case "日记本":
            uni.navigateTo({
                url: `../square/index`
            });
            break;
        case "日历":
            uni.navigateTo({
                url: `../clander/index`
            });
            break;
        case "名句鉴赏":
            uni.navigateTo({
                url: `../famousSaying/index`
            });
            break;
        case "打卡":
            uni.showToast({
                title: '暂未开发',
                icon: 'error',
                duration: 2000
            });
            break;
        case "个人中心":
            uni.switchTab({
                url: '/pages/mine/index'
            });
            break;

        default:
            break;
    }
}
/**
* 用户点击右上角分享
*/
onShareAppMessage(() => {
    // const randomImgs = shareImg[Math.floor(Math.random() * shareImg.length)];
    return {
        title: '写下你的生活',
        path: '/page/home/index',
        // imageUrl: randomImgs
    };
})
var myAtoi = function (s) {
    let numStr = ''
    let startNumIndex = 0
    let trueIndex = -1
    for (var i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            trueIndex = i + 1
            continue
        }
        if (!(/[0-9]/.test(s[trueIndex + 1]))) {
            console.log(/[0-9]/.test(s[trueIndex + 1]),s[trueIndex + 1]);
            console.log(s[i]);
            numStr = ""
            break
        }
        if (/[a-zA-z]/.test(s[i])) {
            break
        }
        numStr += s[i]
    }
    console.log(numStr, 11);

    return numStr ? Number(numStr) : 0
}
myAtoi('   -12.88 ancnmskdjn 778'.trim())
</script>
<style lang="scss" scoped>
page {
    width: auto;
    height: auto;
    /* background-color: rgba(230, 230, 230,.6); */
}

.container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    padding-bottom: calc(48px + constant(safe-area-inset-bottom));
    padding-bottom: calc(48px + env(safe-area-inset-bottom));
    box-sizing: border-box;

    .top_content {
        position: relative;
        z-index: 1;
        height: 50%;
        overflow: hidden;

        .time {
            height: 40px;
            margin: 48rpx 24rpx 0;
            background: rgba(240, 232, 232, 0.87);
            border-radius: 8px;
            box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(85, 85, 85, 0.1);
            display: flex;
        }

        .month_day {
            width: 50px;
            border-right: 1px solid #cdcdcd;
            display: flex;
            line-height: 40px;
            justify-content: center;

            .iconfont {
                font-size: 22px;
            }
        }

        .month_date {
            padding-left: 12px;
            flex: 1;
            font-size: 14px;
            color: #8a8a8a;
            position: relative;

            view {
                height: 50%;
            }

            &::before {
                content: "";
                display: block;
                position: absolute;
                left: 90px;
                top: 16px;
                border: 8px solid transparent;
                border-top-color: #cdcdcd;
            }
        }

        .textCon {
            min-height: 160rpx;
            max-height: 320rpx;
            overflow: hidden;
            margin: 44rpx 32rpx 0;
            background-color: rgba(85, 85, 85, 0.4);
            box-shadow: 0rpx 0rpx 50rpx 10rpx rgba(85, 85, 85, 0.8);
            border-radius: 10px;
            padding: 10px 10px 0;
            display: flex;
            flex-direction: column;
            color: #fff;

            .text {
                overflow: hidden;
                display: flex;
                flex-direction: column;

                .sayCont {
                    overflow: auto;
                    font-weight: 800;
                }

                .whoSay {
                    height: 18px;
                    line-height: 18px;
                    text-align: right;
                    padding: 8px 16px 0;
                    font-size: 14px;
                }
            }

            .shoucang {
                height: 20px;
                padding-bottom: 8px;
                font-size: 20px;
            }
        }

        .setIcon {
            position: absolute;
            bottom: 16px;
            right: 10px;
            font-size: 18px;
            background-color: #ccc;
            padding: 4px;
            border-radius: 50%;
        }
    }

    .category_list {
        position: relative;
        z-index: 1;
        height: 50%;
        background: rgba(255, 255, 255, .8);
        overflow: hidden;

        &::after {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(to right,
                    rgba(0, 0, 0, 0) 0%,
                    rgba(0, 0, 0, 0) 10%,
                    rgba(21, 124, 89, 0.3) 20%,
                    rgba(21, 124, 89, 0.4) 30%,
                    rgba(21, 124, 89, 0.5) 40%,
                    rgba(21, 124, 89, 0.8) 50%,
                    rgba(21, 124, 89, 0.5) 60%,
                    rgba(21, 124, 89, 0.4) 70%,
                    rgba(21, 124, 89, 0.3) 80%,
                    rgba(0, 0, 0, 0) 90%,
                    rgba(0, 0, 0, 0) 100%);
        }

        // box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(85, 85, 85, 0.1);
        .typeFunction {
            display: flex;
            flex-wrap: wrap;
            margin: 20px;

            .cartgrouy {
                width: 33.33%;
                height: 100px;
                // background-color: aqua;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #515151;

                .iconfont {
                    font-size: 30px;
                    // background-color: aquamarine;
                    padding: 10px;
                    border-radius: 50%;
                    color: #fff;
                }

                .type_name {
                    margin-top: 8px;
                    font-weight: 800;
                    font-size: 16px;
                }
            }
        }

    }
}

.background_image {
    position: fixed;
    width: 100%;
    // height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: calc(100vh - 48px - constant(safe-area-inset-bottom));
    height: calc(100vh - 48px - env(safe-area-inset-bottom));
}

.modal_content {
    // height: 200px;

    .picture {
        display: flex;

        .select_img {
            height: 150px;
            flex: 1;
            // background-color: antiquewhite;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .border {
            border: 1px solid #ccc;
        }

        .default_image {
            width: 100%;
            flex: 1;
        }
    }

    .radio_group {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 8px;
        font-weight: 700;
        font-size: 14px;

        .radio {
            flex: 1;
            text-align: center;
        }
    }

    .textArea {
        padding-top: 12px;

        textarea {
            position: relative;
            height: 100px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                border: 1px solid #dbdbdb;
                width: 200%;
                height: 200%;
                box-sizing: border-box;
                transform: scale(0.5);
                transform-origin: left top;
            }
        }

        .clear {
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;

            button {
                height: 28px;
                width: 90px;
                margin: 0;
                font-size: 12px;
                padding: 0 4px;

                &::after {
                    border: none;
                }
            }

            button[disabled] {
                // color: hsla(0, 0%, 100%, .6);
                cursor: not-allowed;
            }
        }

        .input {
            margin-top: 12px;
            height: 32px;
            position: relative;
            padding: 6px;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                border: 1px solid #dbdbdb;
                width: 200%;
                height: 200%;
                box-sizing: border-box;
                transform: scale(0.5);
                transform-origin: left top;
            }
        }
    }
}

.clander_content {
    view {
        text-align: center;
        padding: 2px 0;
    }
}
</style>
