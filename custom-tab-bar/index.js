Component({
  data: {
    selected: 0,
    color: "#2c2c2c",
    selectedColor: "#1296db",
    list: [{
      pagePath: "/pages/home/index",
      iconPath: "/static/image/home.png",
      selectedIconPath: "/static/image/active_home.png",
      text: "首页"
    },
    //  {
    //   pagePath: "/pages/square/index",
    //   iconPath: "/static/image/note.png",
    //   selectedIconPath: "/static/image/active_note.png",
    //   text: "记录圈"
    // },
    {
      pagePath: "/pages/mine/index",
      iconPath: "/static/image/mine.png",
      selectedIconPath: "/static/image/active_mine.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})