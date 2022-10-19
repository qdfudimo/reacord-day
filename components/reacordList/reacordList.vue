<template>
    <view class="schedule_view">
        <view class="schedule_top">
            <image v-if="ifNote" class="schedule_avatr" mode="aspectFill"
                :src="userInfo.avatarUrl || '/static/image/avtar.png'" />
            <image v-else class="clock_img" :style="`background-color: ${reacordList.color};`"
                :src="reacordList.clockUrl" mode="aspectFill" />
            <view :class="['issue_time',ifNote?'':'clockCs']">
                <view v-if="ifNote" class="schedule_userName">{{ userInfo.nickName }}</view>
                <view v-else class="schedule_userName">天气：{{reacordList.weather}}
                    <image v-if="reacordList.weatherUrl" class="weather_img" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/2062e2d4-2a30-47f2-b788-c30890149d67.png" mode="aspectFill" />
                </view>
                <text>{{ formatTime(reacordList.create_time) }}</text>
                <!-- <text v-if="reacordList.create_time">{{ formatTime(reacordList.create_time) }}</text> -->
            </view>
            <text class="mood" v-if="reacordList.mood">
                {{ reacordList.mood }}
            </text>
        </view>
        <template v-if="ifNote">
            <view class="schedule_content">{{ reacordList.content }}</view>
            <view class="pictures" v-if="reacordList.imgUrl && reacordList.imgUrl.length">
                <!-- 大于等于两张图片 -->
                <view :data-index="index" :data-urls="reacordList.imgUrl" @tap.stop.prevent="preview" class="picture"
                    style="height: 228rpx" v-for="(i, index) in reacordList.imgUrl" :key="index">
                    <image mode="scaleToFill" :src="i"></image>
                </view>
            </view>
        </template>
        <view class="schedule_bottom">
            <view class="share" @tap="choosiePosi" style="color: #77aef3;" v-if="reacordList.name">
                <text class="iconfont icon-weizhi" style="font-size: 14px; margin-right: 6px"></text>
                <text style="font-size: 13px;">{{reacordList.name}}</text>
            </view>
            <view class="comment" @tap="remove">
                <text class="iconfont icon-shanchu1" style="color:#ccc;font-size: 18px; margin-right: 4px"></text>
                <text style="font-size: 13px"> 删除</text>
            </view>
            <!-- <view class="comment">
                <text class="iconfont icon-comment" style="color: '#ccc'; font-size: 14px; margin-right: 6px"></text>
                <text :style="'font-size:' + (reacordList.commentCount ? '16px' : '12px') + ';'"> 编辑</text>
            </view>
            <view class="likeCount">
                <text @tap="changeLike" class="iconfont icon-aixin-copy"
                    :style="'color:' + (reacordList.ifMyLike ? '#eb3349' : '#ccc') + ';font-size:22px;margin-right:6px;'"></text>
                <text>{{ reacordList.likeCount }}</text>
            </view> -->
        </view>
    </view>
</template>

<script>
import util from "@/utils/util";
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
        ifNote: {
            type: Boolean,
            default: true
        },
        userInfo: Object,
        onlyIndex: Number // myProperty: { // 属性名
        //   type: String,
        //   value: ''
        // },
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    beforeMount: function () { },
    moved: function () { },
    destroyed: function () { },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    beforeMount: function () { },
    // 此处attached的声明会被lifetimes字段中的声明覆盖
    mounted: function () { },
    // 组件所在页面的生命周期函数
    onPageShow: function () { },
    onPageHide: function () { },
    onPageResize: function () { },
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
        formatTime(time) {
            return util.formatTime(time)
        },
        choosiePosi() {
            let longitude = this.reacordList.point.coordinates[0]
            let latitude = this.reacordList.point.coordinates[1]
            uni.openLocation({
                latitude: latitude,
                longitude: longitude,
                success: function () {
                    console.log('success');
                }
            });

        },
        changeLike(e) {
            this.$emit('changeLike', {
                detail: this.onlyIndex
            });
        },
        remove(e) {
            this.$emit('remove', {
                detail: this.onlyIndex
            });
        }
    }
};
</script>
<style>
@import './reacordList.css';
</style>
