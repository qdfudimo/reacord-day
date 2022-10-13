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
    showButton: {
      type: Boolean,
      default() {
        return true;
      }
    },
    width: {
      type: String,
      default() {
        return "90%";
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
  emits: ["cancle", "confirm", "clickDialog"],
  setup(__props, { emit }) {
    const props = __props;
    const visible = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (props.show) {
        visible.value = true;
      }
    });
    common_vendor.watch(() => props.show, (val) => {
      visible.value = !!val;
    });
    const cancle = () => {
      emit("cancle");
    };
    const confirm = () => {
      emit("confirm");
    };
    const handelClick = () => {
      emit("clickDialog");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: visible.value
      }, visible.value ? common_vendor.e({
        b: __props.title
      }, __props.title ? {
        c: common_vendor.t(__props.title)
      } : {}, {
        d: __props.showButton
      }, __props.showButton ? {
        e: common_vendor.o(cancle),
        f: props.confirmDisabled,
        g: common_vendor.o(confirm)
      } : {}, {
        h: common_vendor.s(`width: ${__props.width};`),
        i: common_vendor.o(handelClick)
      }) : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-314db344"], ["__file", "E:/xiaocx/reacord-day/components/diaLog/diaLog.vue"]]);
wx.createComponent(Component);
