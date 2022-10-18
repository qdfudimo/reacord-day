"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../utils/index.js");
var utils_request = require("../../utils/request.js");
require("../../utils/util.js");
require("../../uni_modules/uni-calendar/components/uni-calendar/calendar.js");
const reacordList = () => "../../components/reacordList/reacordList.js";
const _sfc_main = {
  components: {
    reacordList,
    reacordList
  },
  data() {
    return {
      loadMore: false,
      ifMoreData: false,
      currentPage: 1,
      ifTop: false,
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
    this.ifTop = e.scrollTop >= 400;
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
        console.log(result);
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
    remove(e) {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u5220\u9664\u8FD9\u7BC7\u65E5\u8BB0",
        success: function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    },
    scrollToop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
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
  _component_reacord_list();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.scheduleLsits.length
  }, $data.scheduleLsits.length ? common_vendor.e({
    b: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: "7c36b24e-0-" + i0,
        b: common_vendor.p({
          userInfo: $data.userInfo,
          reacordList: item,
          onlyIndex: index
        }),
        c: item._id
      };
    }),
    c: common_vendor.o($options.remove),
    d: $data.loadMore || $data.ifMoreData
  }, $data.loadMore || $data.ifMoreData ? common_vendor.e({
    e: $data.loadMore
  }, $data.loadMore ? {} : $data.ifMoreData ? {} : {}, {
    f: $data.ifMoreData
  }) : {}) : {
    g: common_vendor.o((...args) => $options.goRecord && $options.goRecord(...args))
  }, {
    h: common_vendor.n("iconfont icon-huidaodingbu addRecord "),
    i: common_vendor.o((...args) => $options.scrollToop && $options.scrollToop(...args)),
    j: common_vendor.n("viewIcon " + ($data.ifTop ? "showTop" : "hideTop"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/xiaocx/reacord-day/pages/square/index.vue"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
