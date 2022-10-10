<template>
    <!-- pages/mine/index.wxml -->
    <view :class="'container ' + (hasUserInfo ? '' : 'noColor')">
        <image v-if="hasUserInfo" class="background_image" :src="currentBackground || defaultImg" mode="aspectFill">
        </image>
        <view class="main">
            <view class="con"
                :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;background-color:' + (hasUserInfo ? 'transparent' : '#fff')">
            </view>
            <view class="content">
                <view class="content_top" :style="'background-color:' + (hasUserInfo ? 'transparent' : '#fff') + ';'">
                    <view class="user_avtar" @tap="getUserProfile">
                        <image class="avtar" :src="userInfo.avatarUrl || '/static/image/vx.png'" />
                        <view class="userName" v-if="hasUserInfo">
                            <view style="font-size: 12px">{{ userInfo.nickName }}</view>
                            <view>普通用户</view>
                        </view>
                        <view class="getInfo" v-else>
                            <text class="iconfont icon-shuaxin1" style="color: #28c445; font-size: 18px"></text>
                            <text style="margin-left: 10px">同步获取微信头像与昵称</text>
                        </view>
                    </view>
                    <view v-if="hasUserInfo" class="background" @tap="showIfBackground">更换背景</view>
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
                            <text class="iconfont icon-shezhi" style="font-size: 22px" @tap="setApplet"></text>
                            <text style="font-size: 12px; margin-top: 6px">设置</text>
                        </view>
                    </view>
                    <view class="empty" v-if="!scheduleLsits.length || !hasUserInfo">暂无记录</view>
                    <!-- <view class="empty" v-if="!scheduleLsits.length || !hasUserInfo">暂无记录</view> -->
                </view>
                <block v-for="(item, index) in scheduleLsits" :key="index">
                    <view class="talkList">
                        <reacord-list @changeLike="changeLike" :reacordList="item" :onlyIndex="index"></reacord-list>
                    </view>
                </block>
                <block v-for="(item, index) in scheduleLsits" :key="index">
                    <view class="talkList">
                        <reacord-list @changeLike="changeLike" :reacordList="item" :onlyIndex="index"></reacord-list>
                    </view>
                </block>
            </view>
        </view>
        <view class="selectBackground" v-if="showBackground">
            <view class="iconfont icon-chahao delIcon" @tap="showIfBackground"></view>
            <scroll-view scroll-x style="height: 110px; white-space: nowrap">
                <view class="selectImg">
                    <image class="img_background" style="width: 100%; height: 100%"
                        :src="currentBackground || defaultImg" />
                </view>
                <view class="selectImg addImg" @tap="selectBackground">
                    <view class="iconfont icon-xiangji" style="font-size: 36px; margin-top: 8px"></view>
                    <view>添加图片</view>
                    <view>建议尺寸</view>
                    <view>750*800</view>
                </view>
                <view class="selectImg" v-for="(item, index) in imgList" :key="index">
                    <image @tap="selectImage" class="img_background" :data-url="item" style="width: 100%; height: 100%"
                        :src="item || defaultImg" />
                </view>
            </scroll-view>
        </view>
        <view v-if="ifCollect" class="collect"
            :style="'top:' + (customBar + 20) + 'px;left:' + (custom.left - custom.width / 2) + 'px;'">点击添加"小程序"</view>
    </view>
</template>

<script>
import reacordList from '@/components/reacordList/reacordList';
// pages/mine/index.js
const app = getApp();
import { chooseFile } from '@/utils/upload';
export default {
    components: {
        reacordList
    },
    data() {
        return {
            statusBar: app.globalData.statusBar,
            customBar: app.globalData.customBar,
            custom: app.globalData.custom,
            imgList: [],
            showBackground: false,
            currentBackground: '/static/image/background/rainbow.jpg',
            hasUserInfo: false,
            ifCollect: false,
            defaultImg: '/static/image/background/rainbow.jpg',
            loadMore: false,
            scheduleLsits: [
                {
                    scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
                    // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
                    scheduleTime: '2022-01-12 03:30',
                    likeCount: 1,
                    ifMyLike: 1,
                    commentCount: 0,
                    scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
                    userAvatrImage: '',
                    userName: '旺仔果冻',
                    userId: '11321313'
                }
            ],

            userInfo: {
                avatarUrl: '',
                nickName: ''
            },

            selected: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        const fs = uni.getFileSystemManager();
        const pathName = '/static/image/background';
        fs.readdir({
            dirPath: pathName,
            // dirPath: `${wx.env.USER_DATA_PATH}/recordDay/image`,
            success: (res) => {
                this.imgList = res.files.map((item) => `${pathName}/${item}`)
            },

            fail(res) {
                console.error(res);
            }
        });
        uni.getStorage({
            key: 'currentBackground',
            success: (res) => {
                this.currentBackground = res.data
            },
            fail: (error) => {
                this.currentBackground = '/static/image/background/rainbow.jpg'
            }
        });
        uni.getStorage({
            key: 'userInfo',
            success: (res) => {
                this.userInfo = JSON.parse(res.data)
                this.hasUserInfo = true
            },
            fail: (error) => {
                this.hasUserInfo = false
            }
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(item) {
        // console.log(item);
        const shareimg = ['/static/image/write.png', '/static/image/write1.png', '/static/image/write2.png', '/static/image/write3.png'];
        const randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];
        return {
            title: '写下你的生活',
            path: '/page/mine/index',
            imageUrl: randomImg
        };
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //在 Vue3 中，this 对象下的 $mp 调整为 $scope
        if (typeof this.$scope.getTabBar === 'function' &&
            this.$scope.getTabBar()) {
            this.$scope.getTabBar().setData({
                selected: 1
            })
        }
        // const curPages = getCurrentPages()[0];  // 获取当前页面实例  
        // if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
        //     curPages.getTabBar().setData({
        //         selected: 1
        //     });
        // }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.loadMore) return
        setTimeout(() => {
            this.scheduleLsits.push({
                // scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg', 'https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
                scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
                scheduleTime: '2022-01-14 07:30',
                likeCount: 4,
                ifMyLike: 1,
                commentCount: 1,
                scheduleContent: '新年开xx子啊这路i始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
                userAvatrImage: '',
                userName: '旺仔小馒头',
                userId: '888'
            })
            this.loadMore =true
        }, 300)
    },
    methods: {
        showIfBackground() {
            this.showBackground = !this.showBackground
        },

        selectImage(e) {
            this.currentBackground = e.target.dataset.url
            uni.setStorage({
                key: 'currentBackground',
                data: e.target.dataset.url
            });
        },

        /**自定义背景 */
        selectBackground() {
            chooseFile({
                accept: 'img',
                maxCount: 1,
                multiple: false
            })
                .then((res) => {
                    this.currentBackground = res[0].url
                })
                .catch((error) => { });
        },

        getUserProfile(e) {
            if(this.hasUserInfo) return
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            uni.getUserProfile({
                desc: '展示用户信息',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    this.userInfo = res.userInfo
                    this.hasUserInfo = true
                    uni.setStorage({
                        key: 'userInfo',
                        data: res.rawData
                    });
                },
                fail: (error) => { }
            });
        },

        /**收藏小程序 */
        collectApplet() {
            this.ifCollect = true
            setTimeout(() => {
                this.ifCollect = false
            }, 3000);
        },

        setApplet() {
            uni.showToast({
                title: '暂未开发',
                icon: 'error',
                duration: 2000
            });
        },

        shareApplet() {
            // wx.showShareImageMenu({
            //   path: "/image/sun.gif",
            //   success() {},
            //   fail() {}
            // })
        },

        /**点赞 */
        changeLike(e) {
            let ifMyLike = this.scheduleLsits[e.detail].ifMyLike;
            let likeCount = this.scheduleLsits[e.detail].likeCount;
            let Count = !ifMyLike ? likeCount + 1 : ifMyLike == 0 ? 0 : likeCount - 1;
            this.scheduleLsits[e.detail].likeCount = Count;
            this.scheduleLsits[e.detail].ifMyLike = !this.scheduleLsits[e.detail].ifMyLike;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
