<template>
    <view @tap="scrollToop" :class="'viewIcon ' + (ifTop ? 'showTop' : 'hideTop')">
        <view :class="'iconfont icon-huidaodingbu addRecord '"></view>
    </view>
</template>
<script setup>
import { onPageScroll } from "@dcloudio/uni-app";
import { ref } from 'vue';
const ifTop = ref(false)
onPageScroll((e) => {
    ifTop.value = e.scrollTop >= 400
})
const scrollToop = () => {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
    });
}
</script>
<style lang="scss" scoped>
.viewIcon {
    position: fixed;
    z-index: 6;
    bottom: 100px;
    right: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 3px solid transparent;

    .addRecord {
        width: 28px;
        font-size: 28px;
        border-radius: 50%;
        box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(85, 85, 85, 0.1);
        color: #000;
        margin: 3px auto;
    }
}

.showTop {
    transform: translateX(-20px);
    opacity: 1;
    transition: all 0.4s;
}

.hideTop {
    transform: translateX(40px);
    opacity: 0;
    transition: all 0.4s;
}
</style>