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
                        .要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度
                    </view>
                    <view class="whoSay">--恩格尔</view>
                </view>
                <view class="shoucang">收藏</view>
            </view>
            <view class="setIcon">设置</view>
        </view>
        <view class="category_list">222</view>
    </view>
</template>

<script setup>
// pages/mine/index.js
// import {
//     onLoad,
//     onShow,
// } from "@dcloudio/uni-app";
import { ref } from 'vue';
import { useGetTabBar } from "@/hooks/useGetTabBar"
import util from "@/utils/util"
const app = getApp();
const currentDate = util.getCurrentDate()
// console.log(util.getChineseDate());
const defaultImg = '/static/image/background/rainbow.jpg';
const currentBackground = ref("/static/image/background/rainbow.jpg")
useGetTabBar(0)
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
                height: 18px;
                padding-bottom: 8px;
            }
        }

        .setIcon {
            position: absolute;
            bottom: 16px;
            right: 10px;
        }
    }

    .category_list {
        position: relative;
        z-index: 1;
        height: 50%;
        background: rgba(255, 255, 255, .8);
        box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(85, 85, 85, 0.1);
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
</style>
