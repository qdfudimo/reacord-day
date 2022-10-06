<template>
    <view class="nav" :style="'height:' + customBar + 'px'">
        <view class="con" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
            <view class="backBtn" @tap="goBack">
                <!-- <text class="iconfont icon-fanhui"></text> -->
            </view>
            <view class="title" :style="'top:' + statusBar + 'px'">首页</view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            statusBar: app.globalData.statusBar,
            customBar: app.globalData.customBar,
            custom: app.globalData.custom
        };
    },
    mixins: [],
    props: {},
    created() {},
    beforeMount() {},
    moved() {},
    destroyed() {},
    methods: {
        goBack() {
            console.log('占位：函数 goBack 未声明');
        }
    }
};
</script>
<style>
@import './nav-bar.css';
</style>
