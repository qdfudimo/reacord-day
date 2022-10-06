<template>
    <view class="schedule_view">
        <view class="schedule_top">
            <image class="schedule_avatr" :src="reacordList.userAvatrImage || '/static/image/avtar.png'" />
            <view class="issue_time">
                <view class="schedule_userName">{{ reacordList.userName }}</view>
                <text>{{ reacordList.scheduleTime }}</text>
            </view>
        </view>
        <view class="schedule_content">{{ reacordList.scheduleContent }}</view>
        <view class="pictures" v-if="reacordList.scheduleImg && reacordList.scheduleImg.length">
            <!-- 大于等于两张图片 -->
            <view
                :data-index="index"
                :data-urls="reacordList.scheduleImg"
                @tap.stop.prevent="preview"
                class="picture"
                style="height: 228rpx"
                v-for="(i, index) in reacordList.scheduleImg"
                :key="index"
            >
                <image mode="aspectFill" :src="i"></image>
            </view>
            <!-- 一张图片 -->
            <!-- <view data-index='{{0}}' data-urls='{{reacordList.scheduleImg}}' catchtap='preview' class='picture' style='width:80%;height:548rpx;' wx:if='{{reacordList.scheduleImg.length === 1}}'>
            <image mode='widthFix' src="{{reacordList.scheduleImg[0]||'/image/Occupying.png'}}" />
        </view> -->
        </view>
        <view class="schedule_bottom">
            <view class="share">
                <text class="iconfont icon-iconfontfenxiang" style="color: '#ccc'; font-size: 14px; margin-right: 6px"></text>
                <text style="font-size: 13px">分享</text>
            </view>
            <view class="comment">
                <text class="iconfont icon-comment" style="color: '#ccc'; font-size: 14px; margin-right: 6px"></text>
                <text :style="'font-size:' + (reacordList.commentCount ? '16px' : '12px') + ';'">{{ reacordList.commentCount || '评论' }}</text>
            </view>
            <view class="likeCount">
                <text
                    @tap="changeLike"
                    class="iconfont icon-aixin-copy"
                    :style="'color:' + (reacordList.ifMyLike ? '#eb3349' : '#ccc') + ';font-size:22px;margin-right:6px;'"
                ></text>
                <text>{{ reacordList.likeCount }}</text>
            </view>
        </view>
    </view>
</template>

<script>
// component/reacordList/reacordList.js
export default {
    data() {
        return {
            i: ''
        };
    },
    /**
     * 组件的属性列表
     */
    options: {
        //https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
        styleIsolation: 'apply-shared'
    },
    props: {
        reacordList: Object,
        onlyIndex: Number // myProperty: { // 属性名
        //   type: String,
        //   value: ''
        // },
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    beforeMount: function () {},
    moved: function () {},
    destroyed: function () {},
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    beforeMount: function () {},
    // 此处attached的声明会被lifetimes字段中的声明覆盖
    mounted: function () {},
    // 组件所在页面的生命周期函数
    onPageShow: function () {},
    onPageHide: function () {},
    onPageResize: function () {},
    /**
     * 组件的方法列表
     */
    methods: {
        preview(e) {
            let dataset = e.currentTarget.dataset;
            let urls = dataset.urls;
            let index = dataset.index;
            uni.previewImage({
                urls,
                current: urls[index]
            });
        },

        changeLike(e) {
            this.$emit('changeLike', {
                detail: this.onlyIndex
            });
        }
    }
};
</script>
<style>
@import './reacordList.css';
</style>
