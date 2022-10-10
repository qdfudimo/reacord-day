<template>
    <view class="popups" v-if="visible" @tap="handelClick">
        <view class="dialog" :style="`width: ${width};`">
            <view class="title" v-if="title">{{title}}</view>
            <view class="dialog__content">
                <slot></slot>
            </view>
            <view class="dialog__footer" v-if="showButton">
                <button class="btn cancle" @tap="cancle">取消</button>
                <button class="btn confirm" :disabled="props.confirmDisabled" @tap="confirm">确认</button>
            </view>
        </view>
    </view>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
    show: {
        type: Boolean,
        default() {
            return false
        }
    },
    showButton: {
        type: Boolean,
        default() {
            return true
        }
    },
    width: {
        type: String,
        default() {
            return "90%"
        }
    },
    // height: {
    //     type: String,
    //     default() {
    //         return "90%"
    //     }
    // },
    confirmDisabled: {
        type: Boolean,
        default() {
            return false
        }
    },
    title: {
        type: [String, Number],
        default() {
            return ""
        }
    },
})
const visible = ref(false)
const emit = defineEmits(["cancle", "confirm", "clickDialog"]);
onMounted(() => {
    if (props.show) {
        visible.value = true;
    }
})
watch(
    () => props.show,
    (val) => {
        visible.value = !!val
    }
)
const cancle = () => {
    emit("cancle")
}
const confirm = () => {
    emit("confirm")
}
const handelClick = () => {
    emit("clickDialog")
}
</script>
<style lang="scss" scoped>
.popups {
    --overlay-background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    background: var(--overlay-background-color);

    .dialog {
        position: relative;
        top: 45%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background-color: #fff;
        border-radius: 16px;
        overflow: hidden;
        width: 90%;

        .title {
            line-height: 24px;
            padding: 16px 10px;
            text-align: center;
            color: #323233;
        }

        .dialog__content {
            padding: 12px;
            min-height: 104px;
            // border-bottom: 1px solid #ccc;
        }

        .dialog__footer {
            display: flex;
            padding: 12px 0;
            align-items: center;
            justify-content: center;

            .btn {
                line-height: 36px;
                width: 120px;
                font-size: 16px;
                color: #fff;

                &::after {
                    border: none;
                }
            }

            .cancle {
                background-color: #ccc;
            }

            .confirm {
                background-color: #39B54A;
            }

            .confirm[disabled] {
                color: hsla(0, 0%, 100%, .6);
                cursor: not-allowed;
            }
        }
    }

}
</style>