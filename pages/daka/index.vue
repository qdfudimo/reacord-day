<template>
  <view class="section">
    <view class="icon">打卡图标</view>
    <view class="selectPic">
      <image class="currentImg" :style="`background-color: ${currentColor};`" :src="currentImg" mode="aspectFill">
      </image>
    </view>
    <view class="imgContainer">
      <image @tap="selectImg(item)" class="background_image" v-for="item in arrImg" :key="item" :src="item"
        mode="aspectFill"> </image>
    </view>
    <view class="imgContainer">
      <view @tap="selectColor(item)" v-for="item in colorArr" :key="item" :style="`background-color: ${item};`"
        class="background_image color">
      </view>
    </view>
    <view :class="'location ' + (location.name ? 'activePlace' : '')" @tap="choosiePlace">
      <text class="iconfont icon-weizhi placeIcon"></text>
      <text class="place">{{ location.name || '所在位置' }}</text>
      <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
    </view>
    <view class="picker">
      <view class="iconfont icon-yonghuguanli1 placeIcon"></view>
      <text style="padding-left: 24rpx">心情</text>
      <picker class="picker_colmuns" @change="bindPickerChange" range-key="mood" :value="canSee" :range="array">
        <view>{{ array[canSee].mood }}</view>
      </picker>
      <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
    </view>
    <view class="picker">
      <view class="iconfont icon-yonghuguanli1 placeIcon"></view>
      <text style="padding-left: 24rpx">天气</text>
      <picker class="picker_colmuns" @change="changeweatherArray" range-key="weather" :value="weather"
        :range="weatherArray">
        <view>{{ weatherArray[weather].weather }}</view>
      </picker>
      <text class="iconfont icon-youjiantou" style="color: #333; font-size: 18px"></text>
    </view>
    <view class="iconfont icon-yinsi" @tap="goPrivacy" style="padding:10px 0;color:#1296db;"> 隐私保护</view>
    <button @tap="submit"
      style="width: 320rpx; height: 64rpx; padding: 0; line-height: 64rpx; background-color: #25bdce" class="report"
      type="primary">打卡</button>
    <!-- <button @tap="submitq"
      style="width: 320rpx; height: 64rpx; padding: 0; line-height: 64rpx; background-color: #25bdce" class="report"
      type="primary">打卡</button> -->
  </view>
</template>

<script setup>
//填写日记 更换背景 更改昵称头像
// pages/mine/index.js
//   "navigationStyle": "custom"
import { request } from "@/utils/request";
import util from "@/utils/util";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, reactive, watch } from 'vue';
const location = reactive({
  name: "",
  address: "",
  latitude: "",
  longitude: "",
})
const array = [
  {
    mood: "开心"
  },
  {
    mood: "难过"
  },
  {
    mood: "伤心"
  },
  {
    mood: "犯困"
  },
  {
    mood: "幸福"
  },
  {
    mood: "迷茫"
  },
  {
    mood: "emo"
  },
  {
    mood: "累"
  },
]
const weatherArray = [
  {
    weather: "晴天"
  },
  {
    weather: "阴天"
  },
  {
    weather: "雨天"
  },
  {
    weather: "大雪天"
  },
  {
    weather: "有雾"
  },
  {
    weather: "大风"
  },
  {
    weather: "冰雹"
  },
  {
    weather: "沙尘暴"
  },
  {
    weather: "雨夹雪"
  },
]
const app = getApp();
console.log(app.globalData);
const canSee = ref(0)
const weather = ref(0)
const arrImg = ref([])
const colorArr = ref([])
const currentImg = ref("")
const currentColor = ref("")
onShow(() => {
  setTimeout(() => {
    uni.hideNavigationBarLoading();
  }, 1000);
})
const requestPic = () => {
  arrImg.value = app.globalData.arrImg;
  colorArr.value = app.globalData.colorArr;
  currentImg.value = app.globalData.arrImg[0];
  currentColor.value = app.globalData.colorArr[0];
  // request("requestImgUrl",).then(({ result = {} }) => {
  //   console.log(result);
  //   if (result.code === 0) {
  //     arrImg.value = result.data;
  //     currentImg.value = result.data[0]
  //     currentColor.value = result.colorArr[0]
  //     colorArr.value = result.colorArr;
  //   }
  // })
}
const submitq = () => {
  uniCloud.chooseAndUploadFile({
    type: 'image'
  })
    .then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
}
const selectImg = (item) => {
  currentImg.value = item
}
const selectColor = (item) => {
  currentColor.value = item
}
const submit = () => {
  let data = {
    type: "add",
    mood: array[canSee.value].mood,
    weather: weatherArray[weather.value].weather,
    color: currentColor.value,
    weatherUrl: "",
    clockUrl: currentImg.value,
  }
  if (location.latitude && location.latitude) {
    data.name = location.name
    data.address = location.address
    data.latitude = location.latitude
    data.longitude = location.longitude
  }
  request("playClock", data).then(({ result = {} }) => {
    if (result.id) {
      uni.switchTab({
        url: '/pages/home/index'
      });
    }
  })
}
const choosiePlace = () => {
  uni.chooseLocation({
    success(res) {
      //name 位置名称 address 详细地址
      const { address, name, latitude, longitude } = res;
      // const regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
      // const address2 =regex.exec(address);
      // console.log(address2);
      location.address = address
      location.name = name
      location.latitude = latitude
      location.longitude = longitude
    },

    fail(res) {
      console.log(res);
    }
  });
}
const bindPickerChange = (e) => {
  canSee.value = e.detail.value
}
const changeweatherArray = (e) => {
  weather.value = e.detail.value
}
onLoad(() => {
  uni.hideShareMenu()
  uni.showNavigationBarLoading();
  uni.setNavigationBarTitle({
    title: `${util.handelTime()} 打卡 `
  });
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    // 必写项【该字体颜色仅支持 #ffffff 和 #000000 】
    backgroundColor: '#25BDCE',
    // 传递的颜色值【仅支持有效值为十六进制颜色】
    animation: {
      // 可选项
      duration: 1000,
      timingFunc: 'easeIn'
    }
  });
  requestPic()
})
</script>
<style lang="scss" scoped>
.textarea {
  background-color: rgba(204, 204, 204, 0.16);
  width: 100%;
  height: 400rpx;
  padding: 20rpx;
  box-sizing: border-box;
}


.location {
  padding: 28rpx 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: #333;
  border-top: 2rpx solid #eaeaea;
  background-color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
}

.activePlace {
  color: #15ca51;
}

.placeIcon {
  font-size: 18px;
}

.place {
  flex: 1;
  line-height: 18px;
  padding-left: 24rpx;
  font-size: 14px;
}

.section {
  background-color: rgba(233, 241, 248, 0.7);
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.picker {
  width: 100%;
  padding: 28rpx 0;
  padding-left: 10px;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-top: 2rpx solid #eaeaea;
  /* border-top: 2rpx solid #f4f4f4; */
  border-bottom: 2rpx solid #eaeaea;
  background-color: #fff;
  box-sizing: border-box;
}

.picker_colmuns {
  flex: 1;
  text-align: right;
  color: #333;
  font-size: 14px;
  padding-right: 14rpx;
}

.report {
  margin-top: 20rpx;
}

.icon {
  padding: 10px;
  padding-left: 30px;
  font-size: 20px;
  color: #333;
  background-color: #fff;
  position: relative;

  // margin-bottom: 16px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    height: 26px;
    width: 6px;
    border-radius: 6px;
    background-color: #1296db;
  }
}

.selectPic {
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  .currentImg {
    height: 56px;
    width: 56px;
    border-radius: 20px;
    padding: 2px;
  }
}

.imgContainer {
  padding: 10px 10px 0;
  display: flex;
  // margin: 0 10px;
  // justify-content: space-around;
  flex-wrap: wrap;
  background-color: #fff;
  box-sizing: border-box;

  .color {
    border-radius: 50%;
  }

  .background_image {
    // flex: 1;
    height: 56px;
    width: 56px;
    margin-right: calc((100% - 336px) / 5);
    margin-bottom: 10px;

    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
