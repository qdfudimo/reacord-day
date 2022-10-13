<template>
    <view class="section">
        <textarea class="textarea" v-model="textareaValue" :maxlength="400" placeholder="今天,我想说....." name="textarea" />
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

                        <view :data-index="index" class="uploader_delete" @tap.stop.prevent="deleteItem">
                            <view class="iconfont icon-chahao shanchu"></view>
                        </view>
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
                <text style="padding-left: 24rpx">心情</text>
                <picker class="picker_colmuns" @change="bindPickerChange" range-key="mood" :value="canSee"
                    :range="array">
                    <view>{{ array[canSee].mood }}</view>
                </picker>
                <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
            </view>
            <button :class="['yuyin',recordState?'yuyinBtnBg':'']" @touchstart="touchStart" @touchend="touchEnd">
                <view class="iconfont icon-saying" style=" margin-right: 4rpx;"></view> {{!recordState?" 按住语音识别":
                "松开结束"}}
            </button>
            <button :disabled="!files.length&&!textareaValue"
                style="width: 320rpx; height: 64rpx; padding: 0; line-height: 64rpx; background-color: #25bdce"
                class="report" type="primary">发表</button>
        </view>
        <!-- 开始语音 弹出语音图标表示正在录音 -->
        <cover-view class="startYuyinImage" v-if="recordState">
            <cover-image src="../../static/image/yuyin.png"></cover-image>
            <cover-view>开始语音</cover-view>
        </cover-view>
    </view>
</template>

<script>
// pages/mine/index.js
//   "navigationStyle": "custom"
import { chooseFile, isImageFile } from '@/utils/upload';
import { authorize, getSetting, openSetting } from '@/utils/authorPre';

//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
export default {
    data() {
        return {
            height: 20,
            focus: false,
            timer: null,
            maxCount: 9,
            textareaValue: "",
            files: [],
            maxSize: 10 * 1024 * 1024,
            address: '请选择位置信息',
            location: {
                name: false
            },
            //语音
            recordState: false, //录音状态
            //是否授权
            recordAuthorStatus: false,
            place: {
                address: '江苏省宿迁市沭阳县智慧树幼儿园东北(小街路东)',
                errMsg: 'chooseLocation:ok',
                latitude: 34.187418,
                longitude: 118.81498,
                name: '黄金物流'
            },
            array: [
                {
                    mood: "开心"
                },
                {
                    mood: "难过"
                },
                {
                    mood: "伤心"
                },
                {
                    mood: "犯困"
                },
                {
                    mood: "幸福"
                },
                {
                    mood: "迷茫"
                },
                {
                    mood: "emo"
                },
                {
                    mood: "累"
                },
            ],
            canSee: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
        //识别语音
        this.initRecord();
        this.handleRecord().then(res => {
            this.recordAuthorStatus = res
        })
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
        }, 1000);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
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
        //识别语音 -- 初始化
        initRecord: function () {
            const that = this;
            // 有新的识别内容返回，则会调用此事件
            manager.onRecognize = function (res) {
                console.log(res)
            }
            // 正常开始录音识别时会调用此事件
            manager.onStart = function (res) {
                console.log("成功开始录音识别", res)
            }
            // 识别错误事件
            manager.onError = function (res) {
                that.recordState = false;
                uni.showToast({
                    title: "语音识别失败",
                    icon: "error",
                    duration: 1000
                });
                console.error("error msg", res)
            }
            //识别结束事件
            manager.onStop = function (res) {
                console.log('..............结束录音')
                console.log('录音临时文件地址 -->' + res.tempFilePath);
                console.log('录音总时长 -->' + res.duration + 'ms');
                console.log('文件大小 --> ' + res.fileSize + 'B');
                console.log('语音内容 --> ' + res.result);
                if (res.result == '') {
                    uni.showModal({
                        title: '提示',
                        content: '听不清楚，请重新说一遍！',
                        showCancel: false,
                        success: function (res) { }
                    })
                    return;
                }
                var text = that.textareaValue + res.result;
                that.textareaValue = text
            }
        },
        //语音  --按住说话
        touchStart(e) {
            if (!this.recordAuthorStatus) return
            //录音状态
            this.recordState = true
            // 语音开始识别
            manager.start({
                lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
            })
        },
        //语音  --松开结束
        touchEnd(e) {
            console.log("结束了");
            if (this.recordAuthorStatus) {
                manager.stop();
                this.recordState = false;
            }
            // 语音结束识别
        },
        // 用户是否授权录音 true 授权
        async handleRecord() {
            let scoped = false;
            let scopedRecord = await getSetting("scope.record");
            if (scopedRecord === undefined) {
                scoped = await authorize("scope.record", '语音授权失败')
            }
            if (scopedRecord === false) {
                scoped = await this.openShowSetting("scope.record");
            }
            if (scopedRecord === true) {
                scoped = true
            }
            return scoped
        },
        openShowSetting(name) {
            return new Promise((resolve, reject) => {
                uni.showModal({
                    title: '提示', //提示的标题,
                    content: '请打开录音权限', //提示的内容,
                    showCancel: true, //是否显示取消按钮,
                    cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
                    cancelColor: '#000000', //取消按钮的文字颜色,
                    confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
                    confirmColor: '#3CC51F', //确定按钮的文字颜色,
                    success: res => {
                        if (res.confirm) {
                            // openSetting 是需要事件驱动的，保证它的同步性。
                            openSetting(name).then(res => {
                                resolve(res)
                            }).catch(error => {
                                reject(error)
                            })
                        } else if (res.cancel) {
                            reject(false)
                            uni.showToast({
                                title: '需要语音权限',
                                icon: 'none',
                                duration: 2000,
                            })
                        }
                    }
                });
            })
        },
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
