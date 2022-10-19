<template>
  <view class="famousSaying">
    <template v-if="homeShort.data.length">
      <block v-for="item in homeShort.data" :key="item._id">
        <famous :homeShort="item" @collectShort="collectShort"></famous>
      </block>
      <noData :loadMore="loadMore" :ifMoreData="ifMoreData" />
    </template>
    <!-- <view @tap="requests">请求数据</view>
    <view @tap="requests1">请求用户数据</view> -->
    <view class="emptuData " v-else>
      <text class="iconfont icon-zanwushuju"></text><text> 暂无数据</text>
    </view>
    <fab-top></fab-top>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import famous from '@/components/famous/famous';
import fabTop from '@/components/fabTop';
import noData from '@/components/noData';
import { onReachBottom, onLoad, onPageScroll } from "@dcloudio/uni-app";
import util from "@/utils/util";
import { request } from "@/utils/request";
const homeShort = reactive({
  data: []
})
onLoad(() => {
  getFamousSaying("search")
})
onPageScroll(() => {
})
const loadMore = ref(false)
const currentPage = ref(1)
//false 还有
const ifMoreData = ref(false)
const collectShort = (e) => {
  util.collectFamous(e)
}
const getFamousSaying = async (type) => {
  let data = {
    type
  }
  data.pageSize = 10
  data.currentPage = currentPage.value
  let { result } = await request("getFamousSaying", data)
  if (result.code == 0) {
    if (result.affectedDocs && result.data.length) {
      homeShort.data.push(...result.data);
      if (result.data.length < 10) {
        ifMoreData.value = true
      }
      return
    }
    ifMoreData.value = true
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