<template>
  <view class="main scrool_square">
    <template v-if="scheduleLsits.length">
      <view style="height: 20px; width: 100%"></view>
      <block v-for="(item, index) in scheduleLsits" :key="item._id">
        <view class="talkList">
          <reacord-list @remove="remove(item,index)" :ifNote="false" :reacordList="item" :onlyIndex="index">
          </reacord-list>
        </view>
      </block>
      <noData :loadMore="loadMore" :ifMoreData="ifMoreData" />
    </template>
    <view v-else class="empty">
      <image class="image"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/6a3cc55f-f376-4ea0-a2a2-eec5f36f7054.png" />
      <button class="write" @tap="goRecord"> 去打卡</button>
    </view>
    <fab-top></fab-top>
  </view>
</template>

<script setup>
import reacordList from '@/components/reacordList/reacordList';
import fabTop from '@/components/fabTop';
import noData from '@/components/noData';
import { request } from "@/utils/request";
import { ref, reactive, watch } from 'vue';
import {
  onLoad,
  onShow,
  onUnload,
  onPullDownRefresh,
  onReachBottom,
} from "@dcloudio/uni-app";
const loadMore = ref(false)
const ifMoreData = ref(false)
const scheduleLsits = ref([
  // {
  //   create_time: "",
  //   clockUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a42471b-0c50-4781-a564-186c52631541/de94e8ec-dc64-4a3e-99b8-cb3653bd5379.png",
  //   mood: "开心",
  //   color: "#eac4f2",
  //   point: { type: "Point", coordinates: [118.7787, 31.99226] },
  //   weather: "大雪",
  //   weatherUrl: "",
  //   name: "雨花台风景区",
  //   _id: "634d6290737e2800013797fa"
  // }
])
const currentPage = ref(1)
const goRecord = () => {
  uni.navigateTo({
    url: `../daka/index`
  });
}
const remove = (item, index) => {
  uni.showModal({
    title: '提示',
    content: '是否删除这个打卡记录',
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定');
        let data = {
          type: "del",
          id: item._id
        }
        request("playClock", data).then(({ result = {} }) => {
          if (result.deleted) {
            scheduleLsits.value.splice(index, 1)
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const getClock = async (type) => {
  let data = {
    type: "read",
    pageSize: 10,
    currentPage: currentPage.value
  }
  try {
    let { result = {} } = await request("playClock", data)
    if (result.affectedDocs) {
      type == "refersh" && (scheduleLsits.value = [])
      scheduleLsits.value.push(...result.data);
      if (!result.data.length || result.data.length < 10) {
        ifMoreData.value = true
      }
      uni.stopPullDownRefresh();
      return
    }
    uni.stopPullDownRefresh();
    ifMoreData.value = true
  } catch (error) {
    uni.stopPullDownRefresh();
    util.tip("请求失败", "error")
  }
}
onLoad(() => {
  getClock()
})
onPullDownRefresh(() => {
  currentPage.value = 1
  ifMoreData.value = false
  loadMore.value = false;
  getClock("refersh")
})
onReachBottom(async () => {
  if (loadMore.value || ifMoreData.value) return
  loadMore.value = true
  currentPage.value++
  await getClock()
  loadMore.value = false
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  background-color: rgba(233, 241, 248, 0.7);
  min-height: calc(100vh - 10px - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 10px - env(safe-area-inset-bottom));
}

.scrool_square {
  width: 100%;
  /* height: calc(100vh - 10px - constant(safe-area-inset-bottom));
    height: calc(100vh - 10px - env(safe-area-inset-bottom)); */
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
}

.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image {
  width: 300px;
  height: 300px;
}

.write {
  margin-top: 6px;
  height: 40px;
  width: 160px;
  line-height: 40px;
  border-radius: 18px;
  font-weight: 800;
  background-image: linear-gradient(to right, rgb(220, 194, 11), rgb(10, 185, 156), rgb(4, 151, 99));
  color: #fff;
  bottom: 160px;
}

.talkList {
  background-color: #fff;
  margin: 0 8px 16px 8px;
  padding: 12px;
  border-radius: 10px;
  overflow: hidden;
  /* box-sizing: border-box; */
  box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(85, 85, 85, 0.03);
}

.talkList:last-child {
  margin-bottom: 26px;
}
</style>