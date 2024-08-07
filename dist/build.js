import { defineComponent, useSlots, ref, computed, watch, onMounted, nextTick, onBeforeUnmount, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, unref, renderSlot, Fragment, createBlock, resolveDynamicComponent, createCommentVNode, toDisplayString, createVNode, normalizeStyle } from "vue";
import { __ } from "lkt-i18n";
const _Settings = class _Settings {
};
_Settings.toggleSlot = "";
_Settings.debugEnabled = false;
let Settings = _Settings;
const _hoisted_1 = {
  key: 0,
  class: "lkt-accordion-toggle"
};
const _hoisted_2 = {
  key: 1,
  class: "lkt-accordion-title"
};
const _hoisted_3 = {
  key: 2,
  class: "lkt-accordion-buttons"
};
const _hoisted_4 = {
  key: 3,
  class: "lkt-accordion-toggle"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktAccordion",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { default: "" },
    palette: { default: "" },
    class: { default: "" },
    contentClass: { default: "" },
    toggleMode: { default: "height" },
    toggleTimeout: { default: 0 },
    toggleIconAtEnd: { type: Boolean, default: false },
    showActionButton: { type: Boolean, default: false },
    actionButtonClass: { default: "" },
    actionButtonText: { default: "" },
    actionButtonIcon: { default: "" },
    actionButtonResource: { default: "" },
    actionButtonConfirm: { default: "" },
    actionButtonConfirmData: { default: () => ({}) },
    actionButtonData: { default: () => ({}) }
  },
  emits: ["update:modelValue", "first-open", "click-action-button"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const slots = useSlots();
    const props = __props;
    const isOpen = ref(props.modelValue), renderContent = ref(props.modelValue), contentInner = ref(null), contentInnerObserver = ref(null), contentInnerHeight = ref(0), atLeastToggledOnce = ref(false), contentInnerStyles = ref("");
    if (isOpen.value)
      atLeastToggledOnce.value = true;
    const classes = computed(() => {
      let r = [];
      if (props.palette)
        r.push(`lkt-accordion--${props.palette}`);
      if (props.class)
        r.push(props.class);
      if (isOpen.value)
        r.push("is-open");
      if (props.toggleMode)
        r.push(`toggle-mode--${props.toggleMode}`);
      return r.join(" ");
    }), contentInnerClasses = computed(() => {
      let r = [];
      if (props.contentClass)
        r.push(props.contentClass);
      if (renderContent.value)
        r.push("is-opened");
      return r.join(" ");
    }), contentInnerStyle = computed(() => {
      if (!isOpen.value)
        return "";
      return contentInnerStyles.value;
    }), computedLabel = computed(() => {
      if (props.title.startsWith("__:")) {
        return __(props.title.substring(3));
      }
      return props.title;
    }), hasToggleSlot = computed(() => {
      return !!Settings.toggleSlot;
    }), toggleSlot = computed(() => {
      return Settings.toggleSlot;
    });
    const toggle = () => {
      if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
      }
      isOpen.value = !isOpen.value;
      calcContentStyle();
    };
    watch(() => props.modelValue, (v) => isOpen.value = v);
    watch(isOpen, (v) => {
      if (!v) {
        renderContent.value = false;
      } else {
        contentInnerHeight.value = contentInner.value.clientHeight;
        setTimeout(() => {
          renderContent.value = true;
        }, 1);
      }
      emits("update:modelValue", v);
    });
    watch(atLeastToggledOnce, () => emits("first-open"));
    const onClickActionButton = () => {
      emits("click-action-button", props.actionButtonData);
    };
    const calcContentStyle = () => {
      contentInner.value.getBoundingClientRect();
      contentInnerStyles.value = [
        "display: block",
        "height: " + contentInner.value.offsetHeight + "px"
      ].join(";");
    };
    onMounted(() => {
      nextTick(() => {
        contentInnerHeight.value = contentInner.value.clientHeight;
        const observer = new MutationObserver(() => {
          setTimeout(() => {
            calcContentStyle();
          }, props.toggleTimeout);
        });
        observer.observe(contentInner.value, {
          childList: true,
          subtree: true,
          attributes: true
        });
        contentInnerObserver.value = observer;
      });
    });
    onMounted(() => {
      window.addEventListener("resize", calcContentStyle);
    });
    onBeforeUnmount(() => {
      contentInnerObserver.value.disconnect();
      window.removeEventListener("resize", calcContentStyle);
    });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-accordion", classes.value])
      }, [
        createElementVNode("header", {
          class: "lkt-accordion-header",
          onClick: toggle
        }, [
          !!unref(slots).header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !_ctx.toggleIconAtEnd ? (openBlock(), createElementBlock("div", _hoisted_1, [
              hasToggleSlot.value ? (openBlock(), createBlock(resolveDynamicComponent(toggleSlot.value), {
                key: 0,
                class: normalizeClass(["lkt-accordion-toggle-inner", isOpen.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", isOpen.value ? "is-opened" : ""])
              }, null, 2))
            ])) : createCommentVNode("", true),
            computedLabel.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(computedLabel.value), 1)) : createCommentVNode("", true),
            _ctx.showActionButton && (_ctx.actionButtonText !== "" || _ctx.actionButtonIcon !== "") ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(_component_lkt_button, {
                class: normalizeClass(_ctx.actionButtonClass),
                "confirm-data": _ctx.actionButtonConfirmData,
                "confirm-modal": _ctx.actionButtonConfirm,
                icon: _ctx.actionButtonIcon,
                resource: _ctx.actionButtonResource,
                text: _ctx.actionButtonText,
                onClick: onClickActionButton
              }, null, 8, ["class", "confirm-data", "confirm-modal", "icon", "resource", "text"])
            ])) : createCommentVNode("", true),
            _ctx.toggleIconAtEnd ? (openBlock(), createElementBlock("div", _hoisted_4, [
              hasToggleSlot.value ? (openBlock(), createBlock(resolveDynamicComponent(toggleSlot.value), {
                key: 0,
                class: normalizeClass(["lkt-accordion-toggle-inner", isOpen.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", isOpen.value ? "is-opened" : ""])
              }, null, 2))
            ])) : createCommentVNode("", true)
          ], 64))
        ]),
        createElementVNode("section", {
          class: "lkt-accordion-content",
          style: normalizeStyle(contentInnerStyle.value)
        }, [
          createElementVNode("div", {
            class: normalizeClass(["lkt-accordion-content-inner", contentInnerClasses.value]),
            ref_key: "contentInner",
            ref: contentInner
          }, [
            unref(slots)["content-after-first-open"] && atLeastToggledOnce.value ? renderSlot(_ctx.$slots, "content-after-first-open", { key: 0 }) : renderSlot(_ctx.$slots, "default", { key: 1 })
          ], 2)
        ], 4)
      ], 2);
    };
  }
});
const LktAccordion = {
  install: (app) => {
    if (app.component("lkt-accordion") === void 0)
      app.component("lkt-accordion", _sfc_main);
  }
};
const setAccordionToggleSlot = (component) => {
  Settings.toggleSlot = component;
  return true;
};
export {
  LktAccordion as default,
  setAccordionToggleSlot
};
