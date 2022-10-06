<template>
    <view class="section">
        <textarea class="textarea" :maxlength="400" placeholder="今天,我想说....." name="textarea" />
        <view class="container">
            <view class="uploadNum">
                <text style="font-size: 14px">图片上传</text>
                <text>{{ files.length }}/9</text>
            </view>
            <view class="uploadContainer">
                <block v-if="files.length">
                    <view class="uploader__file" :data-urls="files" v-for="(item, index) in files" :key="index">
                        <image mode="aspectFill" :data-index="index" :src="item.url" style="width: 100%; height: 100%"
                            @tap="onPreviewImage"></image>

                        <view :data-index="index" class="iconfont icon-shanchu uploader_delete"
                            @tap.stop.prevent="deleteItem"></view>
                    </view>
                </block>
                <view v-if="files.length < 9" class="uploader__file uploader__file_add" aria-role="button"
                    aria-label="上传" data-type="img" @tap="chooseImage">
                    <text class="iconfont icon-tianjiatupian addPicture"></text>
                    <text style="color: #888; font-size: 24rpx">添加本地图片</text>
                </view>
                <view v-if="files.length < 9" class="uploader__file uploader__file_add" aria-role="button"
                    aria-label="上传" data-type="image" @tap="chooseImage">
                    <text class="iconfont icon-tianjiatupian1 addPicture"></text>
                    <text style="color: #888; font-size: 24rpx">添加聊天图片</text>
                </view>
            </view>
            <view :class="'location ' + (location.name ? 'activePlace' : '')" @tap="choosiePlace">
                <text class="iconfont icon-weizhi placeIcon"></text>
                <text class="place">{{ location.name || '所在位置' }}</text>
                <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
            </view>
            <view class="picker">
                <view class="iconfont icon-yonghuguanli1 placeIcon"></view>
                <text style="padding-left: 24rpx">谁可以看</text>
                <picker class="picker_colmuns" @change="bindPickerChange" :value="canSee" :range="array">
                    <view>{{ array[canSee] }}</view>
                </picker>
                <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
            </view>
            <button style="width: 320rpx; height: 64rpx; padding: 0; line-height: 64rpx; background-color: #25bdce"
                class="report" type="primary">发表</button>
        </view>
    </view>
</template>

<script>
// pages/mine/index.js
//   "navigationStyle": "custom"
import { chooseFile, isImageFile } from '../../utils/upload';
export default {
    data() {
        return {
            height: 20,
            focus: false,
            maxCount: 9,
            files: [],
            maxSize: 10 * 1024 * 1024,
            address: '请选择位置信息',
            location: {
                name: false
            },
            place: {
                address: '江苏省宿迁市沭阳县智慧树幼儿园东北(小街路东)',
                errMsg: 'chooseLocation:ok',
                latitude: 34.187418,
                longitude: 118.81498,
                name: '黄金物流'
            },
            array: ['公开', '私密'],
            canSee: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        uni.showNavigationBarLoading();
        uni.setNavigationBarTitle({
            title: '写说说'
        });
        uni.setNavigationBarColor({
            frontColor: '#ffffff',
            // 必写项【该字体颜色仅支持 #ffffff 和 #000000 】
            backgroundColor: '#25BDCE',
            // 传递的颜色值【仅支持有效值为十六进制颜色】
            animation: {
                // 可选项
                duration: 1000,
                timingFunc: 'easeIn'
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        setTimeout(() => {
            uni.hideNavigationBarLoading();
        }, 2000);
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
        chooseImage(event) {
            const { type } = event.currentTarget.dataset;
            let files = this.files;
            chooseFile({
                accept: type,
                maxCount: this.maxCount - files.length
            })
                .then((res) => {
                    this.onAfterRead(res);
                })
                .catch((error) => {
                    // wx.showToast({
                    //   title: '图片选择失败',
                    //   icon: 'none'
                    // });
                });
        },

        onAfterRead(file) {
            const { maxSize } = this;
            const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;

            if (oversize) {
                uni.showToast({
                    title: '单个图片大小不能超过10M',
                    icon: 'none'
                });
                return;
            }
            this.files = this.files.concat(Array.isArray(file) ? file : [file])
        },

        onPreviewImage(event) {
            const { index } = event.currentTarget.dataset;
            const { files } = this;
            const item = files[index];
            uni.previewImage({
                urls: files.filter((item) => isImageFile(item)).map((item) => item.url),
                current: item.url,

                fail() {
                    uni.showToast({
                        title: '预览图片失败',
                        icon: 'none'
                    });
                }
            });
        },

        deleteItem(event) {
            const { index } = event.currentTarget.dataset;
            this.files = this.files.filter((item, i) => i !== index)
        },

        choosiePlace() {
            let that = this;
            uni.chooseLocation({
                success(res) {
                    console.log(res);
                    const { address, name, latitude, longitude } = res; // const regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
                    // const address2 =regex.exec(address);
                    that.location = {
                        address,
                        name,
                        latitude,
                        longitude
                    }
                },

                fail(res) {
                    console.log(res);
                }
            });
        },

        choosiePlaces() {
            let { latitude, longitude } = this.place;
            uni.chooseLocation({
                latitude,
                longitude,

                success(res) {
                    console.log(res);
                }
            });
        },

        // 获取地址位置信息
        getLocation() {
            const that = this; // 获取当前位置的经纬度

            uni.getLocation({
                type: 'wgs84',

                success(res) {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    uni.openLocation({
                        latitude: latitude,
                        longitude: longitude,

                        // 在地图上显示当前位置
                        success(res) { },

                        fail() {
                            console.log(res);
                        }
                    });
                }
            });
        },

        bindPickerChange(e) {
            this.canSee = e.detail.value
        }
    }
};
</script>
<style>
@import './create-record.css';
</style>
