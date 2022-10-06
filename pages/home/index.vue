<template>
    <!-- pages/mine/index.wxml -->
    <view class='container '>
        <image class="background_image" :src="currentBackground || defaultImg" mode="aspectFill">
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
                <view></view>
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
// console.log(util.getChineseDate());
const defaultImg = '/static/image/background/rainbow.jpg';
const currentBackground = ref("/static/image/background/rainbow.jpg")
const showDialog = ref(false)
const homeShort = reactive({
    short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
    author: "--恩格尔",
    ifCollect: false
})
useGetTabBar(0)
const goRecord = () => {
    uni.navigateTo({
        url: `../create-record/create-record`
    });
}
const changeImg = () => {
    showDialog.value = true
}
const confirm = () => {
    showDialog.value = false
}
const cancle = () => {
    showDialog.value = false
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
    height: 200px;
}
</style>
