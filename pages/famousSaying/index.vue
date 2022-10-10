<template>
  <view class="famousSaying">
    <template v-if="homeShort.data.length">
      <block v-for="item in homeShort.data" :key="item.id">
        <famous :homeShort="item" @collectShort="collectShort"></famous>
      </block>
      <view class="more iconfont icon-a-weixiaokaixingaoxing-03" v-if="ifMoreData">没有更多了</view>
    </template>
    <view class="emptuData " v-else>
      <text class="iconfont icon-zanwushuju"></text><text> 暂无数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import famous from '@/components/famous/famous';
import { onReachBottom } from "@dcloudio/uni-app";
const homeShort = reactive({
  data: [
    {
      short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
      author: "恩格尔",
      ifCollect: false,
      id: 1
    },
    {
      short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
      author: "恩格尔",
      ifCollect: false,
      id: 2
    },
  ]
})
const loadMore = ref(false)
//false 还有
const ifMoreData = ref(false)
const collectShort = (e) => {
  console.log(e);
}
let id = 12
/**
  * 页面上拉触底事件的处理函数
  */
onReachBottom(() => {
  if (loadMore.value || ifMoreData.value) return
  loadMore.value = true
  setTimeout(() => {
    id++
    homeShort.data.push({
      short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度" + id,
      author: "恩格尔",
      ifCollect: true,
      id: id
    },)
    loadMore.value = false
    if (id == 14) {
      ifMoreData.value = true
    }
  }, 300)
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