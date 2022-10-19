<template>
  <view class="section">
    <textarea class="textarea" v-model="textareaValue" :maxlength="400" placeholder="语音识别文字内容复制" name="textarea" />
    
    <button :class="['yuyin',recordState?'yuyinBtnBg':'']" @touchstart="touchStart" @touchend="touchEnd">
      <view class="iconfont icon-saying" style=" margin-right: 4rpx;"></view> {{!recordState?" 按住语音识别文字":
      "松开结束"}}
    </button>
    <!-- 开始语音 弹出语音图标表示正在录音 -->
    <cover-view class="startYuyinImage" v-if="recordState">
      <cover-image src="../../static/image/yuyin.png"></cover-image>
      <cover-view>开始语音</cover-view>
    </cover-view>
  </view>
</template>

<script>
//填写日记 更换背景 更改昵称头像
// pages/mine/index.js
//   "navigationStyle": "custom"
import { authorize, getSetting, openSetting } from '@/utils/authorPre';
import util from "@/utils/util";
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
export default {
  data() {
    return {
      textareaValue: "",
      //语音
      recordState: false, //录音状态
      //是否授权
      recordAuthorStatus: false,
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uni.hideShareMenu()
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
  }
};
</script>
<style lang="scss" scoped>
.textarea {
  background-color: rgba(204, 204, 204, 0.16);
  width: 100%;
  height: 400rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.yuyin {
    width: 160px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    color: #2c2c2c;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto 0;
    background-color: #e6e6e6;
}

.yuyinBtnBg {
    background: #eee;
}

.yuyinBtn::after {
    border-radius: 0;
    border: none;
}

.startYuyinImage {
    position: fixed;
    top: 210rpx;
    left: 50%;
    width: 190rpx;
    height: 240rpx;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20rpx;
    color: #fff;
    text-align: center;
    margin-left: -95rpx;
}

.startYuyinImage cover-view {
    margin-top: 25rpx;
}

.startYuyinImage cover-image {
    margin: 30rpx auto;
    width: 100rpx;
    height: 100rpx;
}

.startYuyinImage .iconfont {
    font-size: 32px;
}
</style>
