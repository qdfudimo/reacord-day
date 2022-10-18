<template>
  <view class="userInfo">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" mode="aspectFill" :src="avatarUrl||'/static/image/vx.png'"></image>
    </button>
    <view class="nick_name">
      <text>昵称</text>
      <input :value="nickName" @input="input" type="nickname" maxlength="10" class="weui-input" placeholder="请输入昵称" />
    </view>
    <button class="write submit" :disabled="disabled" @tap="submitInfo">
      保存修改
    </button>
  </view>
</template>
<!-- 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/da5f56fe-c939-4168-9c49-ae76ed29d0d0.png' -->
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, getCurrentInstance, watch } from 'vue';
import { uplodFile } from '@/utils/upload';
import { request } from "@/utils/request";
import util from "@/utils/util";
const defaultAvatarUrl = ''
const avatarUrl = ref(defaultAvatarUrl)
const nickName = ref("")
const disabled = ref(true)
const oldUrl = ref("")
// watch([nickName,avatarUrl],([newX, newY],[oldX, oldY])=>{
// })
onLoad(() => {
  uni.hideShareMenu()
  const instance = getCurrentInstance().proxy
  const eventChannel = instance.getOpenerEventChannel();
  eventChannel.once('userData', function (data) {
    avatarUrl.value = data.avatarUrl;
    nickName.value = data.nickName;
    oldUrl.value = data.avatarUrl;
  })
})
const onChooseAvatar = (e) => {
  const { avatarUrl: avatarLink } = e.detail
  avatarUrl.value = avatarLink;
  disabled.value = false;
}
const submitInfo = async (e) => {
  if (nickName.value.length == 0) {
    util.tip("请输入合法的昵称", "error")
    return
  }
  if ((/[^/a-zA-Z0-9\u4E00-\u9FA5]/g).test(nickName.value)) {
    util.tip("请输入中英文和数字", "error")
    return
  }
  let data = {
    type: "update",
    data: {
      nickName: nickName.value,
      avatarUrl: oldUrl.value,
    }
  }
  if (oldUrl.value != avatarUrl.value) {
    let res = await uplodFile(avatarUrl.value);
    if (res.success) {
      data.data.avatarUrl = res.fileID
      data.oldUrl = oldUrl.value
    }
  }
  getUserInfo(data)
}
const getUserInfo = (data) => {
  request("getUserInfo", data).then(({ result = {} }) => {
    if (result.updated) {
      uni.$emit('updateInfo', {
        nickName: nickName.value,
        avatarUrl: data.data.avatarUrl
      })
      uni.switchTab({
        url: '/pages/mine/index',
        success() {
        }
      });
    }
  })
}
const input = (e) => {
  disabled.value = false
  nickName.value = e.detail.value;
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