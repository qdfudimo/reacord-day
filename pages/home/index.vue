<template>
    <!-- pages/mine/index.wxml -->
    <view class='container '>
        <image class="background_image"
            :src="backgroundImg.currentBackground ||backgroundImg.defaultBackground|| defaultImg" mode="aspectFill">
        </image>
        <view class="top_content">
            <view class="time">
                <view class="month_day">
                    <view :class="`iconfont icon-shuzi${currentDate.currentDay[0]}`"></view>
                    <view :class="`iconfont icon-shuzi${currentDate.currentDay[1]}`"></view>
                </view>
                <view class="month_date">
                    <view class="lunar_calendar">
                        {{currentDate.chinaDate}}
                    </view>
                    <view class="week">
                        {{currentDate.week}}
                    </view>
                </view>
            </view>
            <view class="textCon">
                <view class="text">
                    <view class="sayCont">
                        {{homeShort.short}}
                    </view>
                    <view class="whoSay"> {{homeShort.author}}</view>
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
                    <label class="radio">
                        <radio value="default" :checked="checkImgType == 'default'" /> 系统默认
                    </label>
                    <label class="radio">
                        <radio value="optional" :checked="checkImgType == 'optional'" /> 自选图片
                    </label>
                </radio-group>
                <view class="textArea">
                    <textarea v-model="textareaValue" placeholder-style="color:#707070" :maxlength="100"
                        placeholder="请输入自定义格言" />
                    <view class="clear"><button :disabled="!textareaValue" @tap="clearText">清楚自选格言</button></view>
                </view>
            </view>
        </dia-log>
    </view>
</template>

<script setup>
// pages/mine/index.js
// import {
//     onLoad,
//     onShow,
// } from "@dcloudio/uni-app";
import { ref, reactive } from 'vue';
import diaLog from "@/components/diaLog/diaLog";
import { useGetTabBar } from "@/hooks/useGetTabBar";
import util from "@/utils/util";
import { chooseFile } from '@/utils/upload';
useGetTabBar(0)
const app = getApp();
const category = [
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
    {
        icon: "icon-qiandaodaka",
        name: "打卡",
        color: "#72c2f4"
    },
    {
        icon: "icon-gerenzhongxin",
        name: "个人中心",
        color: "#ed4e41"
    },
];
const currentDate = util.getCurrentDate()
//防止图片失败兜底照片
const defaultImg = '/static/image/background/rainbow.jpg';
//系统默认图片
const backgroundImg = reactive({
    //背景图片地址
    currentBackground: "",
    //系统默认图片
    defaultBackground: "/static/image/background/anime.jpg",
    //图片临时选择的图片
    temporaryImg: ""
});
const showDialog = ref(false)
//按钮图片选择类型 默认 还是自选
const checkImgType = ref("default")
const textareaValue = ref("")
//短句
const homeShort = reactive({
    short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
    author: "--恩格尔",
    ifCollect: false
})
const goRecord = () => {
    uni.navigateTo({
        url: `../create-record/create-record`
    });
}
const changeImg = () => {
    showDialog.value = true;
    backgroundImg.temporaryImg = "";
    checkImgType.value = 'default';
}
const radioChange = (e) => {
    changeBackIMG(e.detail.value)
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
    showDialog.value = false;
    backgroundImg.currentBackground = checkImgType.value == 'default' ? backgroundImg.defaultBackground : backgroundImg.temporaryImg;
}
const cancle = () => {
    showDialog.value = false
}
const clearText = () => {
    textareaValue.value = ""
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
                url: `../create-record/create-record`
            });
            break;
        case "日历":
            uni.showToast({
                title: '暂未开发',
                icon: 'error',
                duration: 2000
            });
            break;
        case "名句鉴赏":
            uni.showToast({
                title: '暂未开发',
                icon: 'error',
                duration: 2000
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

        .write {
            height: 40px;
            width: 160px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            border-radius: 18px;
            font-weight: 800;
            background-image: linear-gradient(to right, rgb(220, 194, 11), rgb(10, 185, 156), rgb(4, 151, 99));

            &::after {
                border: none;
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
    }
}
</style>
