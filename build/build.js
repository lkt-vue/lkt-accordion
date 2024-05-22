import { defineComponent, useSlots, ref, computed, watch, openBlock, createElementBlock, normalizeClass, createElementVNode, unref, renderSlot, Fragment, createTextVNode, toDisplayString, withDirectives, vShow } from "vue";
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { "data-role": "icon" }, null, -1);
const _hoisted_2 = { class: "lkt-accordion-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktAccordion",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { default: "" },
    palette: { default: "" }
  },
  emits: ["update:modelValue", "first-open"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const slots = useSlots();
    const props = __props;
    const isOpen = ref(props.modelValue), atLeastToggledOnce = ref(false);
    if (isOpen.value)
      atLeastToggledOnce.value = true;
    const classes = computed(() => {
      let r = [];
      if (props.palette)
        r.push(`lkt-accordion--${props.palette}`);
      if (isOpen.value)
        r.push("is-open");
      return r.join(" ");
    });
    const toggle = () => {
      if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
      }
      isOpen.value = !isOpen.value;
    };
    watch(() => props.modelValue, (v) => isOpen.value = v);
    watch(isOpen, (v) => emits("update:modelValue", v));
    watch(atLeastToggledOnce, () => emits("first-open"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-accordion", classes.value])
      }, [
        createElementVNode("header", {
          class: "lkt-accordion-header",
          onClick: toggle
        }, [
          !!unref(slots).header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_ctx.title) + " ", 1),
            _hoisted_1
          ], 64))
        ]),
        withDirectives(createElementVNode("section", _hoisted_2, [
          unref(slots)["content-after-first-open"] && atLeastToggledOnce.value ? renderSlot(_ctx.$slots, "content-after-first-open", { key: 0 }) : renderSlot(_ctx.$slots, "default", { key: 1 })
        ], 512), [
          [vShow, isOpen.value]
        ])
      ], 2);
    };
  }
});
const LktAccordion = {
  install: (app, options) => {
    app.component("lkt-accordion", _sfc_main);
  }
};
export {
  LktAccordion as default
};
