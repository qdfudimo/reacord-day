<template>
    <!-- pages/home/index.wxml -->
    <view class="main">
        <!-- <view class="fixedTop">
            <view class="tab" @tap="switchTab">
                <view class="tab_actvie-bar" :style="'transform:translateX(' + movePx + ')'"></view>
                <view :class="'tabItem ' + (activeTab == item.id ? 'active_tab' : '')" :data-name="item.id"
                    v-for="item in tabData" :key="item.id">
                    {{ item.name }}
                </view>
            </view>
            <view class="serch">
                <icon class="serch_icon" color="#000" type="search" size="20"></icon>
                <input class="serch-input" v-model="inputValue" @blur="focusInput" confirm-type="search"
                    @focus="focusInput" placeholder-style="color:#999" placeholder="请输入搜索关键词" />
                <icon class="close_icon" @tap="clearInput" v-if="inputValue" type="cancel" size="20"
                    color="#666"></icon>
            </view>
        </view> -->
        <scroll-view v-if="scheduleLsits.length" scroll-y class="scrool_square" :refresher-enabled="true"
            :refresher-threshold="100" :lower-threshold="30" refresher-default-style="white"
            refresher-background="lightgreen" :refresher-triggered="triggered" @refresherrefresh="onRefresh"
            @scroll="scrollView" @scrolltolower="loadMore" @refresherrestore="onRestore">
            <view style="height: 20px; width: 100%"></view>
            <block v-for="(item, index) in scheduleLsits" :key="item.scheduleTime">
                <view class="talkList">
                    <reacord-list @changeLike="changeLike" :reacordList="item" :onlyIndex="index"></reacord-list>
                </view>
            </block>
        </scroll-view>
        <image v-else class="empty" src="/static/image/empty.png" />
        <view @tap="scrollToop" :class="'viewIcon ' + (ifTop ? 'showTop' : 'hideTop')">
            <view :class="'iconfont icon-huidaodingbu addRecord '"></view>
        </view>
    </view>
</template>

<script>
import reacordList from '@/component/reacordList/reacordList';
// pages/home/index.js
// const util = require('../../utils/util.js')
// util.formatTime(new Date(log))
export default {
    components: {
        reacordList
    },
    data() {
        return {
            tabData: [
                {
                    name: '我的',
                    id: 'mine'
                },
                {
                    name: '广场',
                    id: 'other'
                }
            ],

            activeTab: 'mine',
            movePx: '0px',
            inputValue: '',
            showClose: false,
            _refreshing: false,
            _loadmoreIng: false,
            ifTop: false,
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
                },
                {
                    scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
                    // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
                    scheduleTime: '2022-01-122 03:30',
                    likeCount: 1,
                    ifMyLike: 1,
                    commentCount: 0,
                    scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
                    userAvatrImage: '',
                    userName: '旺仔果冻',
                    userId: '11321313'
                },
                {
                    scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
                    // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
                    scheduleTime: '2022-01-142 03:30',
                    likeCount: 1,
                    ifMyLike: 1,
                    commentCount: 0,
                    scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
                    userAvatrImage: '',
                    userName: '旺仔果冻',
                    userId: '11321313'
                },
                {
                    scheduleImg: ['https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg'],
                    // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
                    scheduleTime: '2022-01-182 03:30',
                    likeCount: 1,
                    ifMyLike: 1,
                    commentCount: 0,
                    scheduleContent: '新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货',
                    userAvatrImage: '',
                    userName: '旺仔果冻',
                    userId: '11321313'
                },
            ],

            triggered: false,
            arr: [1, 2, 3],
            selected: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
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
        // console.log(e);
        // this.scrollTop = e.scrollTop;
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
        switchTab(e) {
            let { dataset, offsetLeft } = e.target;
            this.activeTab = dataset.name
            this.movePx = `${offsetLeft - 3}px`
        },

        focusInput(e) {
            this.showClose = e.type == 'focus'
        },

        clearInput() {
            this.inputValue = ""
        },

        onRefresh(e) {
            if (this._refreshing) {
                return;
            }

            this._refreshing = true;
            setTimeout(() => {
                this.triggered = false;
                this.arr = [1, 2]
                this._refreshing = false;
            }, 3000);
            console.log('onRefresh 自定义下拉刷新被触发', e);
        },

        onPulling(e) {
            // bindrefresherpulling="onPulling"
            console.log('onPulling 自定义下拉刷新控件被下拉', e);
        },

        loadMore(e) {
            console.log('loadMore loadMore', e);

            if (this._loadmoreIng) {
                return;
            }

            this._loadmoreIng = true;
            setTimeout(() => {
                this.arr = [1, 2, 3, 4, 5, 6]
                this._loadmoreIng = false;
            }, 2000);
        },

        onRestore(e) {
            console.log('onRestore 自定义下拉刷新被复位', e);
        },

        scrollView(e) {
            // console.log(e);
        },

        scrollToop() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 300
            });
            // uni.navigateTo({
            //     url: `../create-record/create-record`
            // });
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
