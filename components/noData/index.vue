<template>
    <view class="more iconfont icon-a-weixiaokaixingaoxing-03" v-if="props.loadMore||props.ifMoreData">
        <text v-if="props.loadMore">
            正在加载...
        </text>
        <text v-else-if="props.ifMoreData">
            😊没有更多了
        </text>
    </view>
</template>
<script setup>
const props = defineProps({
    loadMore: {
        type: Boolean,
        default() {
            return false
        }
    },
    ifMoreData: {
        type: Boolean,
        default() {
            return false
        }
    },
})
</script>
<style lang="scss" scoped>
.more {
    text-align: center;
    padding: 10px 0;
    color: #8a8a8a;
}
</style>