<template>
    <view class="content">
        <text class="text" :user-select="true">
            {{props.homeShort.famousContent}}
        </text>
        <view class="name">
            <view :style="`color:${props.homeShort.ifCollect?'#FBBD08':'#ccc'}`"
                class="shoucang iconfont icon-shoucang2" @tap="collectShort"></view>
            <view class="whoSay"> {{"-- " + (props.homeShort.creator||"匿名")}}
            </view>
        </view>
        <view class="shuqian iconfont icon-label"></view>
    </view>
</template>
<script setup>
import { ref, reactive, watch } from 'vue';
// const homeShort = reactive({
//     short: "要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度",
//     author: "恩格尔",
//     ifCollect: false,
// })
const props = defineProps({
    homeShort: {
        type: Object,
        default() {
            return {}
        }
    },
})
const emit = defineEmits(["collectShort"]);
const collectShort = (e) => {
    emit("collectShort", props.homeShort)
}
</script>
<style scoped lang="scss">
.content {
    --overlay-background-color: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%),
        linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-color: #fff;
    width: 100%;
    border-radius: 6px;
    padding: 6px;
    padding-left: 10px;
    box-sizing: border-box;
    background-image: radial-gradient(rgba(107, 107, 107, 0.08) 12%, transparent 0), radial-gradient(rgba(175, 71, 71, 0.1) 12%, transparent 0);
    background-size: 14px 14px;
    background-position: 0 0, 7px 7px;
    box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(85, 85, 85, 0.03);
    margin: 20px 0;
    position: relative;

    .shoucang {
        height: 20px;
        font-size: 20px;
    }

    .text {
        font-weight: 700;
        // background-image: linear-gradient(to left, #586874, #6e6661 10%, #61333f 20%, #7a5c62 30%, #6b6754 40%, #5a7383 50%, #7e6b5e 60%, #884555 70%, #693540 80%, #807959 90%, #5c85a0);
        // color: transparent;
        // background-clip: text;
        // background-size: 200% 100%;
        // animation: slide 5s infinite linear;
    }

    .whoSay {
        height: 20px;
        line-height: 20px;
        text-align: right;
        font-size: 14px;
        padding-right: 10px;
        // background-image: linear-gradient(to left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
        color: transparent;
        background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        background-image: linear-gradient(to left, #5f86a5, #c09a82 10%, #61333f 20%, #7a5c62 30%, #6b6754 40%, #5a7383 50%, #7e6b5e 60%, #884555 70%, #693540 80%, #807959 90%, #5c85a0);
    }

    .name {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    .shuqian {
        position: absolute;
        top: -6px;
        right: -10px;
        font-size: 28px;
    }
}

@keyframes slide {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>