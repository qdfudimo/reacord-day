"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var utils_request = require("../../utils/request.js");
var utils_util = require("../../utils/util.js");
require("../../utils/index.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const defaultAvatarUrl = "";
    const avatarUrl = common_vendor.ref(defaultAvatarUrl);
    const nickName = common_vendor.ref("");
    const disabled = common_vendor.ref(true);
    const oldUrl = common_vendor.ref("");
    common_vendor.onLoad(() => {
      common_vendor.index.hideShareMenu();
      const instance = common_vendor.getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.once("userData", function(data) {
        avatarUrl.value = data.avatarUrl;
        nickName.value = data.nickName;
        oldUrl.value = data.avatarUrl;
      });
    });
    const onChooseAvatar = (e) => {
      const { avatarUrl: avatarLink } = e.detail;
      avatarUrl.value = avatarLink;
      disabled.value = false;
    };
    const submitInfo = async (e) => {
      if (nickName.value.length == 0) {
        utils_util.util.tip("\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u6635\u79F0", "error");
        return;
      }
      let data = {
        type: "update",
        data: {
          nickName: nickName.value,
          avatarUrl: oldUrl.value
        }
      };
      if (oldUrl.value != avatarUrl.value) {
        let res = await utils_upload.uplodFile(avatarUrl.value);
        if (res.success) {
          data.data.avatarUrl = res.fileID;
          data.oldUrl = oldUrl.value;
        }
      }
      getUserInfo(data);
    };
    const getUserInfo = (data) => {
      utils_request.request("getUserInfo", data).then(({ result = {} }) => {
        if (result.updated) {
          common_vendor.index.$emit("updateInfo", {
            nickName: nickName.value,
            avatarUrl: data.data.avatarUrl
          });
          common_vendor.index.switchTab({
            url: "/pages/mine/index",
            success() {
            }
          });
        }
      });
    };
    const focus = (e) => {
      disabled.value = false;
      nickName.value = e.detail.value;
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value || "/static/image/vx.png",
        b: common_vendor.o(onChooseAvatar),
        c: nickName.value,
        d: common_vendor.o(focus),
        e: common_vendor.o(focus),
        f: disabled.value,
        g: common_vendor.o(submitInfo)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727dd115"], ["__file", "E:/xiaocx/reacord-day/pages/userInfo/index.vue"]]);
wx.createPage(MiniProgramPage);
