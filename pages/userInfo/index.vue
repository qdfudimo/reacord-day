<template>
  <view class="userInfo">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <view class="nick_name">
      <text>昵称</text>
      <input v-model="nickname" @input="input" type="nickname" maxlength="10" class="weui-input" placeholder="请输入昵称" />
    </view>
    <button class="write submit" :disabled="disabled" @tap="submitInfo">
      保存修改
    </button>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, getCurrentInstance, watch } from 'vue';
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const avatarUrl = ref(defaultAvatarUrl)
const nickname = ref("")
const disabled = ref(true)
// watch([nickname,avatarUrl],([newX, newY],[oldX, oldY])=>{
// })
onLoad(() => {
  const instance = getCurrentInstance().proxy
  const eventChannel = instance.getOpenerEventChannel();
  eventChannel.once('userData', function (data) {
    avatarUrl.value = data.avatarUrl;
    nickname.value = data.nickName;
  })
})
const onChooseAvatar = (e) => {
  const { avatarUrl: avatarLink } = e.detail
  avatarUrl.value = avatarLink;
  disabled.value = false;
}
const submitInfo = (e) => {
  uni.navigateBack()
}
const input = () => {
  disabled.value = false
}
</script>

<style  lang="scss" scoped>
.userInfo {
  height: 100%;
  width: 100%;
  padding-top: 40px;
  overflow: hidden;
  padding-bottom: calc(48px + constant(safe-area-inset-bottom));
  padding-bottom: calc(48px + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.avatar-wrapper {
  padding: 0;
  width: 56px !important;
  border-radius: 8px;
  margin-bottom: 40px;

  &::after {
    border: none;
  }
}

.avatar {
  display: block;
  width: 56px;
  height: 56px;
}

.container {
  display: flex;
}

.nick_name {
  position: relative;
  display: flex;
  line-height: 36px;
  padding: 8px 4px;

  text {
    padding: 0 10px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #ccc;
    z-index: 2;
    transform: scaleY(.5);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}

.weui-input {
  flex: 1;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 36px;
  line-height: 36px;
}

.submit {
  background-color: rgb(56, 192, 49);
  bottom: 100px;
}
</style>