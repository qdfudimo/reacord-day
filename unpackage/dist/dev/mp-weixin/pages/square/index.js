"use strict";
var common_vendor = require("../../common/vendor.js");
const reacordList = () => "../../component/reacordList/reacordList.js";
const _sfc_main = {
  components: {
    reacordList
  },
  data() {
    return {
      tabData: [
        {
          name: "\u6211\u7684",
          id: "mine"
        },
        {
          name: "\u5E7F\u573A",
          id: "other"
        }
      ],
      activeTab: "mine",
      movePx: "0px",
      inputValue: "",
      showClose: false,
      _refreshing: false,
      _loadmoreIng: false,
      ifTop: false,
      scheduleLsits: [
        {
          scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
          scheduleTime: "2022-01-12 03:30",
          likeCount: 1,
          ifMyLike: 1,
          commentCount: 0,
          scheduleContent: "\u65B0\u5E74\u5F00\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
          userAvatrImage: "",
          userName: "\u65FA\u4ED4\u679C\u51BB",
          userId: "11321313"
        },
        {
          scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
          scheduleTime: "2022-01-122 03:30",
          likeCount: 1,
          ifMyLike: 1,
          commentCount: 0,
          scheduleContent: "\u65B0\u5E74\u5F00\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
          userAvatrImage: "",
          userName: "\u65FA\u4ED4\u679C\u51BB",
          userId: "11321313"
        },
        {
          scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
          scheduleTime: "2022-01-142 03:30",
          likeCount: 1,
          ifMyLike: 1,
          commentCount: 0,
          scheduleContent: "\u65B0\u5E74\u5F00\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
          userAvatrImage: "",
          userName: "\u65FA\u4ED4\u679C\u51BB",
          userId: "11321313"
        },
        {
          scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
          scheduleTime: "2022-01-182 03:30",
          likeCount: 1,
          ifMyLike: 1,
          commentCount: 0,
          scheduleContent: "\u65B0\u5E74\u5F00\u59CB\u4E86\u554A\u4F60\u5728\u5565\u90FDhi\u6253\u54C8\u4EE3\u53D1\u7528\u4E8E\u5217\u8868\u7684\u7D22\u5F15\u5206\u7C7B\u663E\u793A\u548C\u5FEB\u901F\u5B9A\u4F4D\u3002\u8D27",
          userAvatrImage: "",
          userName: "\u65FA\u4ED4\u679C\u51BB",
          userId: "11321313"
        }
      ],
      triggered: false,
      arr: [1, 2, 3],
      selected: 0
    };
  },
  onLoad: function(options) {
  },
  onReady: function() {
  },
  onShow: function() {
    if (typeof this.$scope.getTabBar === "function" && this.$scope.getTabBar()) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }
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
    switchTab(e) {
      let { dataset, offsetLeft } = e.target;
      this.activeTab = dataset.name;
      this.movePx = `${offsetLeft - 3}px`;
    },
    focusInput(e) {
      this.showClose = e.type == "focus";
    },
    clearInput() {
      this.inputValue = "";
    },
    onRefresh(e) {
      if (this._refreshing) {
        return;
      }
      this._refreshing = true;
      setTimeout(() => {
        this.triggered = false;
        this.arr = [1, 2];
        this._refreshing = false;
      }, 3e3);
      console.log("onRefresh \u81EA\u5B9A\u4E49\u4E0B\u62C9\u5237\u65B0\u88AB\u89E6\u53D1", e);
    },
    onPulling(e) {
      console.log("onPulling \u81EA\u5B9A\u4E49\u4E0B\u62C9\u5237\u65B0\u63A7\u4EF6\u88AB\u4E0B\u62C9", e);
    },
    loadMore(e) {
      console.log("loadMore loadMore", e);
      if (this._loadmoreIng) {
        return;
      }
      this._loadmoreIng = true;
      setTimeout(() => {
        this.arr = [1, 2, 3, 4, 5, 6];
        this._loadmoreIng = false;
      }, 2e3);
    },
    onRestore(e) {
      console.log("onRestore \u81EA\u5B9A\u4E49\u4E0B\u62C9\u5237\u65B0\u88AB\u590D\u4F4D", e);
    },
    scrollView(e) {
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
  }, $data.scheduleLsits.length ? {
    b: common_vendor.f($data.scheduleLsits, (item, index, i0) => {
      return {
        a: "46d61fb6-0-" + i0,
        b: common_vendor.p({
          reacordList: item,
          onlyIndex: index
        }),
        c: item.scheduleTime
      };
    }),
    c: common_vendor.o($options.changeLike),
    d: $data.triggered,
    e: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    f: common_vendor.o((...args) => $options.scrollView && $options.scrollView(...args)),
    g: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    h: common_vendor.o((...args) => $options.onRestore && $options.onRestore(...args))
  } : {}, {
    i: common_vendor.n("iconfont icon-huidaodingbu addRecord "),
    j: common_vendor.o((...args) => $options.scrollToop && $options.scrollToop(...args)),
    k: common_vendor.n("viewIcon " + ($data.ifTop ? "showTop" : "hideTop"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/wx-uni/reacrd-day/pages/square/index.vue"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
