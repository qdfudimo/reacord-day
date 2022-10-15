<template>
    <view class="main">
        <scroll-view v-if="scheduleLsits.length" scroll-y class="scrool_square" :refresher-enabled="true"
            :refresher-threshold="100" :lower-threshold="30" refresher-default-style="white"
            refresher-background="lightgreen" :refresher-triggered="triggered" @refresherrefresh="onRefresh"
            @scroll="scrollView" @scrolltolower="loadMore" @refresherrestore="onRestore">
            <view style="height: 20px; width: 100%"></view>
            <block v-for="(item, index) in scheduleLsits" :key="item.scheduleTime">
                <view class="talkList">
                    <reacord-list @remove="remove" :reacordList="item" :onlyIndex="index"></reacord-list>
                </view>
            </block>
            <view class="more" v-if="_loadmoreIng||ifMoreData">
                <text v-if="_loadmoreIng">
                    正在加载...
                </text>
                <text v-else-if="ifMoreData">
                    😊没有更多了
                </text>
            </view>
        </scroll-view>
        <view v-else class="empty">
            <image class="image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/6a3cc55f-f376-4ea0-a2a2-eec5f36f7054.png" />
            <button class="write" @tap="goRecord"> 去写篇日记</button>
        </view>
        <view @tap="scrollToop" :class="'viewIcon ' + (ifTop ? 'showTop' : 'hideTop')">
            <view :class="'iconfont icon-huidaodingbu addRecord '"></view>
        </view>
    </view>
</template>

<script>
import reacordList from '@/components/reacordList/reacordList';
// pages/home/index.js
// const util = require('../../utils/util.js')
// util.formatTime(new Date(log))
export default {
    components: {
        reacordList,
        reacordList
    },
    data() {
        return {
            //是否正在刷新
            _refreshing: false,
            //是否正在加载更多
            _loadmoreIng: false,
            //是否还有更多数据
            ifMoreData: false,
            ifTop: false,
            scheduleLsits: [
            ],
            // scheduleLsits: [
            //     {
            //         scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
            //         // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
            //         scheduleTime: '2022-01-12 03:30',
            //         likeCount: 1,
            //         ifMyLike: 1,
            //         commentCount: 0,
            //         scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
            //         userAvatrImage: '',
            //         mood: "开心",
            //         userName: '旺仔果冻',
            //         userId: '11321313'
            //     },
            //     {
            //         scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
            //         // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
            //         scheduleTime: '2022-01-122 03:30',
            //         likeCount: 1,
            //         ifMyLike: 1,
            //         commentCount: 0,
            //         scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
            //         userAvatrImage: '',
            //         userName: '旺仔果冻',
            //         userId: '11321313'
            //     },
            //     {
            //         scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
            //         // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
            //         scheduleTime: '2022-01-142 03:30',
            //         likeCount: 1,
            //         ifMyLike: 1,
            //         commentCount: 0,
            //         scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
            //         userAvatrImage: '',
            //         userName: '旺仔果冻',
            //         userId: '11321313'
            //     },
            //     {
            //         scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
            //         // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
            //         scheduleTime: '2022-01-182 03:30',
            //         likeCount: 1,
            //         ifMyLike: 1,
            //         commentCount: 0,
            //         scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
            //         userAvatrImage: '',
            //         userName: '旺仔果冻',
            //         userId: '11321313'
            //     },
            // ],
            triggered: false,
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        uni.hideShareMenu()
        uni.showNavigationBarLoading();
        uni.setNavigationBarTitle({
            title: '日记本'
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        setTimeout(() => {
            this.triggered = true
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // //在 Vue3 中，this 对象下的 $mp 调整为 $scope
        if (typeof this.$scope.getTabBar === 'function' &&
            this.$scope.getTabBar()) {
            this.$scope.getTabBar().setData({
                selected: 1
            })
        }
        setTimeout(() => {
            uni.hideNavigationBarLoading();
        }, 1000);
        // const curPages = getCurrentPages()[0];  // 获取当前页面实例  
        // if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
        //     curPages.getTabBar().setData({
        //         selected: 0
        //     });
        // }
    },
    /**
     * 监听页面滚动
     */
    onPageScroll(e) {
        this.ifTop = e.scrollTop >= 400
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
    onReachBottom: function () { },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { },
    methods: {
        //自定义下拉刷新被触发
        onRefresh() {
            if (this._refreshing) return
            this._refreshing = true;
            this.triggered = true;
            setTimeout(() => {
                this.triggered = false;
                this._refreshing = false;
                console.log('onRefresh 自定义下拉刷新被触发');
            }, 2000);
        },

        //滚动到底部/右边，会触发 scrolltolower 事件
        loadMore(e) {
            if (this._loadmoreIng || this.ifMoreData) {
                return;
            }
            this._loadmoreIng = true;
            setTimeout(() => {
                this._loadmoreIng = false;
                this.ifMoreData = true;
                console.log('loadMore loadMore', e);
            }, 2000);
        },
        //自定义下拉刷新被复位
        onRestore(e) {
            console.log('onRestore 自定义下拉刷新被复位', e);
        },
        goRecord(e) {
            uni.navigateTo({
                url: `../create-record/create-record`
            });
        },

        scrollView(e) {
            // console.log(e);
        },
        remove(e) {
            uni.showModal({
                title: '提示',
                content: '是否删除这篇日记',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        scrollToop() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 300
            });
        },

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
