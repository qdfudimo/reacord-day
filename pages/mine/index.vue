<template>
    <!-- pages/mine/index.wxml -->
    <view :class="'container ' + 'noColor'">
        <image class="background_image" :src="currentBackground" mode="aspectFill">
        </image>
        <view class="main">
            <view class="con" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
            </view>
            <view class="content">
                <view class="content_top">
                    <view class="user_avtar" @tap="getUserProfile">
                        <view class="avtarImg">
                            <image class="avtar" :src="userInfo.avatarUrl || '/static/image/vx.png'" />
                        </view>
                        <view class="userName">
                            <view class="nickName">{{ userInfo.nickName||"用户XXXX" }}</view>
                            <view class="changeM">点击更换用户信息</view>
                        </view>
                    </view>
                    <view class="background" @tap="showIfBackground">更换背景</view>
                </view>
                <view class="details">
                    <view class="diary">
                        <view>日记: {{ 0 }} 篇</view>
                        <view>坚持: {{ 0 }} 天</view>
                    </view>
                    <view class="setting">
                        <view class="common">
                            <text class="iconfont icon-shoucang" style="font-size: 22px" @tap="collectApplet"></text>
                            <text style="font-size: 12px; margin-top: 6px">收藏小程序</text>
                        </view>
                        <view class="common">
                            <text class="iconfont icon-fenxiang" style="font-size: 22px"></text>
                            <text style="font-size: 12px; margin-top: 6px">分享好友</text>
                            <button data-id="shareBtn" :plain="true" open-type="share" class="shareBtn"
                                style="border: 0; padding: 0; width: 100%"></button>
                        </view>
                        <view class="common">
                            <text class="iconfont icon-shezhi" style="font-size: 22px"></text>
                            <text style="font-size: 12px; margin-top: 6px">意见反馈</text>
                            <button style="border: 0; padding: 0; width: 100%" :plain="true" class="shareBtn"
                                open-type="feedback"></button>
                        </view>
                    </view>
                    <view class="empty" v-if="!scheduleLsits.length">暂无记录</view>
                </view>
                <block v-for="(item, index) in scheduleLsits" :key="index">
                    <view class="talkList">
                        <famous :homeShort="item" @collectShort="collectShort"></famous>
                    </view>
                </block>
            </view>
        </view>
        <view class="selectBackground" v-if="showBackground">
            <view class="iconfont icon-chahao delIcon" @tap="showIfBackground"></view>
            <scroll-view scroll-x style="height: 110px; white-space: nowrap">
                <view class="selectImg">
                    <image class="img_background" style="width: 100%; height: 100%" :src="currentBackground" />
                </view>
                <view class="selectImg addImg" @tap="selectBackground">
                    <view class="iconfont icon-xiangji" style="font-size: 36px; margin-top: 8px"></view>
                    <view>添加图片</view>
                    <view>建议尺寸</view>
                    <view>750*800</view>
                </view>
                <view class="selectImg" v-for="(item, index) in imgList" :key="index">
                    <image @tap="selectImage" class="img_background" :data-url="item" style="width: 100%; height: 100%"
                        :src="item" />
                </view>
            </scroll-view>
        </view>
        <view v-if="ifCollect" class="collect"
            :style="'top:' + (customBar + 20) + 'px;left:' + (custom.left - custom.width / 2) + 'px;'">点击添加"小程序"</view>
    </view>
</template>

<script setup>
// pages/mine/index.js
import famous from '@/components/famous/famous';
import { chooseFile } from '@/utils/upload';
import { randomImg, shareImg } from '@/utils/index';
import { ref, reactive } from 'vue';
import { useGetTabBar } from "@/hooks/useGetTabBar";
import {
    onLoad,
    onShareAppMessage,
    onReachBottom,
} from "@dcloudio/uni-app";
import util from "@/utils/util";
useGetTabBar(1)
const app = getApp();
const statusBar = app.globalData.statusBar
const customBar = app.globalData.customBar
const custom = app.globalData.custom;
const imgList = ref([])
const scheduleLsits = ref([{
    short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
    author: "恩格尔",
    ifCollect: true,
    id: 1
},
{
    short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
    author: "恩格尔",
    ifCollect: false,
    id: 2
},])
const userInfo = reactive({
    avatarUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/da5f56fe-c939-4168-9c49-ae76ed29d0d0.png',
    nickName: '用户XXXX',
})
const showBackground = ref(false)
const loadMore = ref(false)
//是否收藏小程序
const ifCollect = ref(false)
const currentBackground = ref('')
const showIfBackground = () => {
    showBackground.value = !showBackground.value
}
const selectImage = (e) => {
    currentBackground.value = e.target.dataset.url
    uni.setStorage({
        key: 'currentBackground',
        data: e.target.dataset.url
    });
}
const selectBackground = () => {
    chooseFile({
        accept: 'img',
        maxCount: 1,
        multiple: false
    })
        .then((res) => {
            console.log(res);
            currentBackground.value = res[0].url;
            let ext = res[0].url.split('.').pop()
            uniCloud.uploadFile({
                filePath: res[0].url,
                cloudPath: Date.now() + "." + ext,
                success(res) {
                    console.log(res);
                },
                fail(error) {
                    console.log(error);
                    util.tip("上传失败", "error")
                },
            });
        })
        .catch((error) => { });
}
const getUserProfile = () => {
    uni.navigateTo({
        url: `../userInfo/index`,
        success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('userData', {
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
            })
        }
    });
}
/**收藏小程序 */
const collectApplet = () => {
    ifCollect.value = true
    setTimeout(() => {
        ifCollect.value = false
    }, 2000);
}

const collectShort = (item) => {
}
/**
  * 生命周期函数--监听页面加载
  */
onLoad(() => {
    // uni.hideShareMenu()
    imgList.value = randomImg
    uni.getStorage({
        key: 'currentBackground',
        success: (res) => {
            currentBackground.value = res.data
        },
        fail: (error) => {
            const randomImgurl = imgList.value[Math.floor(Math.random() * imgList.value.length)];
            currentBackground.value = randomImgurl;
            uni.setStorage({
                key: 'currentBackground',
                data: randomImgurl
            });
        }
    });
})
/**
* 用户点击右上角分享
*/
// onShareAppMessage(() => {
//     const randomImgs = shareImg[Math.floor(Math.random() * shareImg.length)];
//     return {
//         title: '写下你的生活',
//         path: '/page/mine/index',
//         imageUrl: randomImgs
//     };
// })
onReachBottom(() => {
    if (loadMore.value) return
    loadMore.value = true
    setTimeout(() => {
        loadMore.value = false
    }, 300)
})

</script>
<style>
@import './index.css';
</style>
