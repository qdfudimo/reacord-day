<template>
  <view class="famousSaying">
    <template v-if="homeShort.data.length">
      <block v-for="item in homeShort.data" :key="item._id">
        <famous :homeShort="item" @collectShort="collectShort"></famous>
      </block>
      <view class="more iconfont icon-a-weixiaokaixingaoxing-03" v-if="loadMore||ifMoreData">
        <text v-if="loadMore">
          正在加载...
        </text>
        <text v-else-if="ifMoreData">
          😊没有更多了
        </text>
      </view>
    </template>
    <view @tap="requests">请求数据</view>
    <view @tap="requests1">请求用户数据</view>
    <!-- <view class="emptuData " v-else>
      <text class="iconfont icon-zanwushuju"></text><text> 暂无数据</text>
    </view> -->
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import famous from '@/components/famous/famous';
import { onReachBottom, onLoad } from "@dcloudio/uni-app";
import util from "@/utils/util";
import { request } from "@/utils/request";
const homeShort = reactive({
  data: []
})

const loadMore = ref(false)
const currentPage = ref(1)
//false 还有
const ifMoreData = ref(false)
const collectShort = (e) => {
  console.log(e._id);
  let data = {
    userId: "1",
    type: e.ifCollect ? "noCollect" : "collect",
    id: e._id
  }
  uni.showModal({
    content: e.ifCollect ? '是否取消收藏' : "是否添加收藏",
    success: function (res) {
      if (res.confirm) {
        request("getFamousSaying", data).then(({ result = {} }) => {
          if (result.updated != 1) {
            util.tip("操作失败", "error")
          } else {
            e.ifCollect = !e.ifCollect
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
  // request("getFamousSaying", data).then(res=>{

  // })
}
const requests = async (e) => {
  getFamousSaying("search")
}
const requests1 = async (e) => {
  getFamousSaying("mySearch")
}
const getFamousSaying = async (type) => {
  let data = {
    userId: "1",
    type
  }
  if (type == "search"||type == "mySearch") {
    data.pageSize = 10
    data.currentPage = currentPage.value
  }
  let { result } = await request("getFamousSaying", data)
  console.log(result);
  if (result.code === 0) {
    if (type == "search") {
      homeShort.data.push(...result.data);
      if (!result.data.length || result.data.length < 10) {
        ifMoreData.value = true
      }
    }
  } else {
    util.tip("请求失败", "error")
  }
}
/**
  * 页面上拉触底事件的处理函数
  */
onReachBottom(async () => {
  if (loadMore.value || ifMoreData.value) return
  loadMore.value = true
  currentPage.value++
  await getFamousSaying("search")
  loadMore.value = false
})
</script>

<style scoped lang="scss">
.famousSaying {
  padding: 14px;
  background-color: rgba(233, 241, 248, 0.7);
  min-height: calc(100vh - 10px - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 10px - env(safe-area-inset-bottom));
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  // background: linear-gradient(90deg, #ffc700 0%, #e91e1e 100%);
  // animation: gradient 3s infinite;
  animation: gradientAn 15s infinite alternate;
}

.more {
  padding-top: 10px;
  text-align: center;
}

.emptuData {
  text-align: center;
  margin-top: 100px;
  font-size: 16px;

  .iconfont {
    font-size: 26px;
  }
}

@keyframes gradientdong {
  100% {
    background: linear-gradient(90deg, #e91e1e 0%, #6f27b0 100%);
  }
}

@keyframes gradientAn {
  25% {
    background: #f0d7e6;
  }

  50% {
    background: #dad2e4;
  }

  75% {
    background: #dae9ee;
  }

  100% {
    background: #d1f0ec;
  }
}
</style>