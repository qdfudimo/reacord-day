<template>
  <view class="Privacy">
    <!-- <view class="wrapBox">
      <view class="title">日记是否安全？</view>
      <view class="text">日记内容存储在云服务器中，任何人都无法查看你的日记内容。</view>
    </view> -->
    <view class="wrapBox">
      <view class="title">内容是否会丢失？</view>
      <view class="text">时光记录间账号关联微信号，更换设备重新登录微信账号后，程序会自动同步所有内容。</view>
    </view>
    <view class="wrapBox">
      <view class="title">电脑端是否支持使用？</view>
      <view class="text">可以，安装微信电脑客户端，打开小程序即可。</view>
    </view>
    <!-- <view class="wrapBox">
      <view class="title">软件是否免费试用？</view>
      <view class="text">永久免费。</view>
    </view> -->
    <!-- <view class="wrapBox">
      <view class="title">注意事项？</view>
      <view class="text">《时光记录间》小程序是一个工具软件，软件永久免费，
        仅提供用户“写日记”，查看名言名句相关的功能，严禁利用此软件发布任何违规、违法内容，
        日记内容上传前会上传到微信内容安全检测，如有违规信息，会限制内容上传。
        本软件不发布任何信息，请认真鉴别其它内容，由此带来的损失，本软件不负任何责任。
      </view>
    </view> -->
    <view class="wrapBox">
      <view class="title">更改问题</view>
      <button style="border: 0; padding: 0; width: 100%;color: #3591e2;" :plain="true" class="shareBtn"
        open-type="feedback">点击反馈</button>
    </view>
  </view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.Privacy {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  padding-top: 16px;
  position: relative;
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
  box-sizing: border-box;
  background-color: rgba(204, 204, 204, 0.16);
}

.wrapBox {
  // background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(85, 85, 85, 0.03);
  background-image: radial-gradient(rgba(126, 27, 27, 0.2) 12%, transparent 0), radial-gradient(rgba(60, 181, 202, 0.1) 12%, transparent 0);
  background-size: 14px 14px;
  background-position: 0 0, 7px 7px;
  background-color: #fff;

  .title {
    color: #2c2c2c;
    font-size: 19px;
    // font-weight: 600;
  }

  .text {
    color: #707070;
    font-size: 16px;
  }
}
</style>