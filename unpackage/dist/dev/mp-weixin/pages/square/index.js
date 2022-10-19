"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
require("../../utils/util.js");
require("../../utils/index.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
const reacordList = () => "../../components/reacordList/reacordList.js";
const fabTop = () => "../../components/fabTop/index.js";
const noData = () => "../../components/noData/index.js";
const _sfc_main = {
  components: {
    reacordList,
    noData,
    fabTop
  },
  data() {
    return {
      loadMore: false,
      ifMoreData: false,
      currentPage: 1,
      userInfo: {
        nickName: "",
        avatarUrl: ""
      },
      scheduleLsits: []
    };
  },
  onLoad: function(options) {
    common_vendor.index.hideShareMenu();
    common_vendor.index.showNavigationBarLoading();
    common_vendor.index.setNavigationBarTitle({
      title: "\u65E5\u8BB0\u672C"
    });
    common_vendor.index.getStorage({
      key: "userInfo",
      success: ({ data }) => {
        this.userInfo.avatarUrl = data.avatarUrl || "";
        this.userInfo.nickName = data.nickName || "";
        this.getSquare();
      },
      fail: (error) => {
        this.getSquare();
        console.log(error);
      }
    });
  },
  onReady: function() {
  },
  onShow: function() {
  },
  onPageScroll(e) {
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
    this.currentPage = 1;
    this.ifMoreData = false;
    this.loadMore = false;
    this.getSquare("refersh");
  },
  onReachBottom: async function() {
    if (this.loadMore || this.ifMoreData)
      return;
    this.loadMore = true;
    this.currentPage++;
    await this.getSquare();
    this.loadMore = false;
  },
  onShareAppMessage: function() {
  },
  methods: {
    async getSquare(whoType) {
      let data = {
        type: "read",
        pageSize: 10,
        currentPage: this.currentPage
      };
      data.ifRequestInfo = !this.userInfo.avatarUrl.length;
      utils_request.request("createNote", data).then(({ result = {} }) => {
        if (result.affectedDocs) {
          whoType == "refersh" && (this.scheduleLsits = []);
          if (data.ifRequestInfo) {
            this.userInfo.avatarUrl = result.avatarUrl || "";
            this.userInfo.nickName = result.nickName || "";
          }
          this.scheduleLsits.push(...result.data);
          if (!result.data.length || result.data.length < 10) {
            this.ifMoreData = true;
          }
        } else {
          this.ifMoreData = true;
        }
      }).finally((e) => {
        common_vendor.index.hideNavigationBarLoading();
        common_vendor.index.stopPullDownRefresh();
      });
    },
    goRecord(e) {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
    },
    remove(item, index) {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u5220\u9664\u8FD9\u7BC7\u65E5\u8BB0",
        success: (res) => {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
            this.delNote(item, index);
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    },
    delNote(item, index) {
      let data = {
        type: "del",
        oldImgUrl: item.imgUrl || [],
        id: item._id
      };
      utils_request.request("createNote", data).then(({ result = {} }) => {
        if (result.deleted) {
          this.scheduleLsits.splice(index, 1);
        }
      });
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
if (!Array) {
  const _component_reacord_list = common_vendor.resolveComponent("reacord-list");
  const _component_noData = common_vendor.resolveComponent("noData");
  const _component_fab_top = common_vendor.resolveComponent("fab-top");
  (_component_reacord_list + _component_noData + _component_fab_top)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.scheduleLsits.length
  }, $data.scheduleLsits.length ? {
    b: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.remove(item, index)),
        b: "7c36b24e-0-" + i0,
        c: common_vendor.p({
          userInfo: $data.userInfo,
          reacordList: item,
          onlyIndex: index
        }),
        d: item._id
      };
    }),
    c: common_vendor.p({
      loadMore: $data.loadMore,
      ifMoreData: $data.ifMoreData
    })
  } : {
    d: common_vendor.o((...args) => $options.goRecord && $options.goRecord(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/xiaocx/reacord-day/pages/square/index.vue"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
