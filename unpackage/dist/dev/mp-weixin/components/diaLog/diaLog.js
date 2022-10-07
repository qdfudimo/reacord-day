"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "diaLog",
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    },
    confirmDisabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    title: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  emits: ["cancle", "confirm"],
  setup(__props, { emit }) {
    const props = __props;
    const visible = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (props.show) {
        visible.value = true;
      }
    });
    common_vendor.watch(() => props.show, (val) => {
      if (val) {
        visible.value = true;
      } else {
        if (visible.value) {
          visible.value = false;
        }
      }
    });
    const cancle = () => {
      emit("cancle");
    };
    const confirm = () => {
      emit("confirm");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: visible.value
      }, visible.value ? common_vendor.e({
        b: __props.title
      }, __props.title ? {
        c: common_vendor.t(__props.title)
      } : {}, {
        d: common_vendor.o(cancle),
        e: props.confirmDisabled,
        f: common_vendor.o(confirm)
      }) : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-314db344"], ["__file", "F:/wx-uni/reacrd-day/components/diaLog/diaLog.vue"]]);
wx.createComponent(Component);
