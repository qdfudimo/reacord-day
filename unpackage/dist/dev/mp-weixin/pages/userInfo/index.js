"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const defaultAvatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
    const avatarUrl = common_vendor.ref(defaultAvatarUrl);
    const nickname = common_vendor.ref("");
    const disabled = common_vendor.ref(true);
    common_vendor.onLoad(() => {
      const instance = common_vendor.getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.once("userData", function(data) {
        avatarUrl.value = data.avatarUrl;
        nickname.value = data.nickName;
      });
    });
    const onChooseAvatar = (e) => {
      const { avatarUrl: avatarLink } = e.detail;
      avatarUrl.value = avatarLink;
      disabled.value = false;
    };
    const submitInfo = (e) => {
      common_vendor.index.navigateBack();
    };
    const input = () => {
      disabled.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.o([($event) => nickname.value = $event.detail.value, input]),
        d: nickname.value,
        e: disabled.value,
        f: common_vendor.o(submitInfo)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727dd115"], ["__file", "E:/xiaocx/reacord-day/pages/userInfo/index.vue"]]);
wx.createPage(MiniProgramPage);
