"use strict";
var common_vendor = require("../../common/vendor.js");
const reacordList = () => "../../components/reacordList/reacordList.js";
const _sfc_main = {
  components: {
    reacordList,
    reacordList
  },
  data() {
    return {
      _refreshing: false,
      _loadmoreIng: false,
      ifMoreData: false,
      ifTop: false,
      scheduleLsits: [],
      triggered: false
    };
  },
  onLoad: function(options) {
    common_vendor.index.hideShareMenu();
    common_vendor.index.showNavigationBarLoading();
    common_vendor.index.setNavigationBarTitle({
      title: "\u65E5\u8BB0\u672C"
    });
  },
  onReady: function() {
    setTimeout(() => {
      this.triggered = true;
    }, 1e3);
  },
  onShow: function() {
    if (typeof this.$scope.getTabBar === "function" && this.$scope.getTabBar()) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }
    setTimeout(() => {
      common_vendor.index.hideNavigationBarLoading();
    }, 1e3);
  },
  onPageScroll(e) {
    this.ifTop = e.scrollTop >= 400;
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onPullDownRefresh: function() {
  },
  onReachBottom: function() {
  },
  onShareAppMessage: function() {
  },
  methods: {
    onRefresh() {
      if (this._refreshing)
        return;
      this._refreshing = true;
      this.triggered = true;
      setTimeout(() => {
        this.triggered = false;
        this._refreshing = false;
        console.log("onRefresh \u81EA\u5B9A\u4E49\u4E0B\u62C9\u5237\u65B0\u88AB\u89E6\u53D1");
      }, 2e3);
    },
    loadMore(e) {
      if (this._loadmoreIng || this.ifMoreData) {
        return;
      }
      this._loadmoreIng = true;
      setTimeout(() => {
        this._loadmoreIng = false;
        this.ifMoreData = true;
        console.log("loadMore loadMore", e);
      }, 2e3);
    },
    onRestore(e) {
      console.log("onRestore \u81EA\u5B9A\u4E49\u4E0B\u62C9\u5237\u65B0\u88AB\u590D\u4F4D", e);
    },
    goRecord(e) {
      common_vendor.index.navigateTo({
        url: `../create-record/create-record`
      });
    },
    scrollView(e) {
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
          reacordList: item,
          onlyIndex: index
        }),
        c: item.scheduleTime
      };
    }),
    c: common_vendor.o($options.remove),
    d: $data._loadmoreIng || $data.ifMoreData
  }, $data._loadmoreIng || $data.ifMoreData ? common_vendor.e({
    e: $data._loadmoreIng
  }, $data._loadmoreIng ? {} : $data.ifMoreData ? {} : {}, {
    f: $data.ifMoreData
  }) : {}, {
    g: $data.triggered,
    h: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    i: common_vendor.o((...args) => $options.scrollView && $options.scrollView(...args)),
    j: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    k: common_vendor.o((...args) => $options.onRestore && $options.onRestore(...args))
  }) : {
    l: common_vendor.o((...args) => $options.goRecord && $options.goRecord(...args))
  }, {
    m: common_vendor.n("iconfont icon-huidaodingbu addRecord "),
    n: common_vendor.o((...args) => $options.scrollToop && $options.scrollToop(...args)),
    o: common_vendor.n("viewIcon " + ($data.ifTop ? "showTop" : "hideTop"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/xiaocx/reacord-day/pages/square/index.vue"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
