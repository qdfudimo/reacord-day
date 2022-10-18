<template>
    <view class="main scrool_square">
        <template v-if="scheduleLsits.length">
            <view style="height: 20px; width: 100%"></view>
            <block v-for="(item, index) in scheduleLsits" :key="item._id">
                <view class="talkList">
                    <reacord-list @remove="remove(item,index)" :userInfo="userInfo" :reacordList="item"
                        :onlyIndex="index">
                    </reacord-list>
                </view>
            </block>
            <view class="more iconfont icon-a-weixiaokaixingaoxing-03" v-if="loadMore||ifMoreData">
                <text v-if="loadMore">
                    正在加载...
                </text>
                <text v-else-if="ifMoreData">
                    😊没有更多了
                </text>
            </view>
        </template>

        <view v-else class="empty">
            <image class="image"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/6a3cc55f-f376-4ea0-a2a2-eec5f36f7054.png" />
            <button class="write" @tap="goRecord"> 去写篇日记</button>
        </view>
        <fab-top></fab-top>
    </view>
</template>

<script>
import reacordList from '@/components/reacordList/reacordList';
import fabTop from '@/components/fabTop';
import { request } from "@/utils/request";
// pages/home/index.js
export default {
    components: {
        reacordList,
        fabTop
    },
    data() {
        return {
            //是否正在加载更多
            loadMore: false,
            //是否还有更多数据
            ifMoreData: false,
            currentPage: 1,
            userInfo: {
                nickName: "",
                avatarUrl: ""
            },
            scheduleLsits: [
                // {
                //     content: "321",
                //     create_time: 1666015887609,
                //     imgUrl: [],
                //     is_sticky: 0,
                //     mood: "开心",
                //     update_time: 1666015887609,
                //     name:"雨花台风景区",
                //     point: { type: "Point", coordinates: [118.7787, 31.99226] },
                //     _id: "634d6290737e2800013797fa",
                // }
            ],
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
        // const eventChannel = this.getOpenerEventChannel();
        // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        // eventChannel.on('rquestData', (data) => {
        //     console.log(1111);
        //     this.getSquare()
        // })
        uni.getStorage({
            key: 'userInfo',
            success: ({ data }) => {
                this.userInfo.avatarUrl = data.avatarUrl || ""
                this.userInfo.nickName = data.nickName || ""
                this.getSquare()
            },
            fail: (error) => {
                this.getSquare()
                console.log(error);
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 监听页面滚动
     */
    onPageScroll(e) {
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
    onPullDownRefresh: function () {
        this.currentPage = 1
        this.ifMoreData = false
        this.loadMore = false
        this.getSquare("refersh");
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        if (this.loadMore || this.ifMoreData) return
        this.loadMore = true
        this.currentPage++
        await this.getSquare()
        this.loadMore = false
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { },
    methods: {
        async getSquare(whoType) {
            let data = {
                type: "read",
                pageSize: 10,
                currentPage: this.currentPage
            }
            data.ifRequestInfo = !this.userInfo.avatarUrl.length
            request("createNote", data).then(({ result = {} }) => {
                if (result.affectedDocs) {
                    whoType == "refersh" && (this.scheduleLsits = [])
                    if (data.ifRequestInfo) {
                        this.userInfo.avatarUrl = result.avatarUrl || ""
                        this.userInfo.nickName = result.nickName || ""
                    }
                    this.scheduleLsits.push(...result.data);
                    if (!result.data.length || result.data.length < 10) {
                        this.ifMoreData = true
                    }
                } else {
                    this.ifMoreData = true
                }
            }).finally(e => {
                uni.hideNavigationBarLoading();
                uni.stopPullDownRefresh()
            })
        },
        goRecord(e) {
            uni.navigateTo({
                url: `../create-record/create-record`
            });
        },
        remove(item, index) {
            uni.showModal({
                title: '提示',
                content: '是否删除这篇日记',
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        this.delNote(item, index)
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },
        delNote(item, index) {
            let data = {
                type: "del",
                oldImgUrl: item.imgUrl || [],
                id: item._id
            }
            request("createNote", data).then(({ result = {} }) => {
                if (result.deleted) {
                    this.scheduleLsits.splice(index, 1)
                }
            })
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
