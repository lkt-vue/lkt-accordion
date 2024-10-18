import { defineComponent, useSlots, ref, computed, watch, onMounted, nextTick, onBeforeUnmount, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, createBlock, resolveDynamicComponent, createCommentVNode, unref, renderSlot, Fragment, createTextVNode, toDisplayString, createVNode, normalizeStyle } from "vue";
import { __ } from "lkt-i18n";
const _Settings = class _Settings {
};
_Settings.toggleSlot = "";
_Settings.debugEnabled = false;
let Settings = _Settings;
const _hoisted_1 = { class: "lkt-accordion-container" };
const _hoisted_2 = {
  key: 0,
  class: "lkt-accordion-toggle"
};
const _hoisted_3 = {
  key: 1,
  class: "lkt-accordion-title"
};
const _hoisted_4 = {
  key: 2,
  class: "lkt-accordion-buttons"
};
const _hoisted_5 = {
  key: 3,
  class: "lkt-accordion-toggle"
};
const _hoisted_6 = {
  key: 0,
  class: "lkt-accordion-nav"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktAccordion",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { default: "" },
    icon: { default: "" },
    palette: { default: "" },
    class: { default: "" },
    contentClass: { default: "" },
    toggleMode: { default: "height" },
    toggleTimeout: { default: 0 },
    toggleIconAtEnd: { type: Boolean, default: false },
    iconAtEnd: { type: Boolean, default: false },
    alwaysOpen: { type: Boolean, default: false },
    showActionButton: { type: Boolean, default: false },
    actionButtonClass: { default: "" },
    actionButtonText: { default: "" },
    actionButtonIcon: { default: "" },
    actionButtonResource: { default: "" },
    actionButtonConfirm: { default: "" },
    actionButtonConfirmData: { default: () => ({}) },
    actionButtonData: { default: () => ({}) },
    iconRotation: { default: "90" },
    minHeight: { default: void 0 },
    toggleOnClickIntro: { type: Boolean, default: false },
    buttonIconClass: { default: "" },
    buttonIconOn: { default: "" },
    buttonIconOff: { default: "" },
    buttonTextOn: { default: "" },
    buttonTextOff: { default: "" }
  },
  emits: ["update:modelValue", "first-open", "click-action-button", "user-toggle"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const slots = useSlots();
    const props = __props;
    const isOpen = ref(props.modelValue), renderContent = ref(props.modelValue), contentInner = ref(null), contentInnerObserver = ref(null), contentInnerHeight = ref(0), atLeastToggledOnce = ref(false), contentInnerStyles = ref(""), blurLayerRequired = ref(false);
    if (props.alwaysOpen && !isOpen.value) {
      isOpen.value = true;
    }
    if (isOpen.value) atLeastToggledOnce.value = true;
    const classes = computed(() => {
      let r = [];
      if (props.palette) r.push(`lkt-accordion--${props.palette}`);
      if (props.class) r.push(props.class);
      if (isOpen.value) r.push("is-open");
      if (props.toggleIconAtEnd) r.push("icon-at-end");
      if (props.toggleMode) r.push(`toggle-mode--${props.toggleMode}`);
      if (props.iconRotation) r.push(`icon-rotation--${props.iconRotation}`);
      return r.join(" ");
    }), contentClasses = computed(() => {
      let r = [];
      if (blurLayerRequired.value && !isOpen.value) r.push("lkt-accordion-blur-layer");
      return r.join(" ");
    }), contentInnerClasses = computed(() => {
      let r = [];
      if (props.contentClass) r.push(props.contentClass);
      if (isOpen.value && renderContent.value) r.push("is-opened");
      return r.join(" ");
    }), contentInnerStyle = computed(() => {
      if (!isOpen.value) {
        if (typeof props.minHeight === "undefined") return "";
      }
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
    }), computedButtonIcon = computed(() => isOpen.value ? props.buttonIconOn : props.buttonIconOff), computedButtonText = computed(() => isOpen.value ? props.buttonTextOn : props.buttonTextOff);
    const toggle = () => {
      if (props.alwaysOpen) return;
      if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
      }
      isOpen.value = !isOpen.value;
      calcContentStyle();
    }, onClickReadMoreIntro = () => {
      if (props.toggleOnClickIntro) {
        toggle();
      }
    }, onClickUserToggle = () => {
      toggle();
      emits("user-toggle", isOpen.value);
    };
    watch(() => props.modelValue, (v) => isOpen.value = v);
    watch(isOpen, (v) => {
      if (!v) {
        contentInnerHeight.value = Number(props.minHeight);
        setTimeout(() => {
          renderContent.value = true;
        }, 1);
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
      if (props.toggleMode === "display") {
        return;
      }
      blurLayerRequired.value = false;
      if (!contentInner.value) return;
      let contentHeight = contentInner.value.offsetHeight, minHeight = Number(props.minHeight);
      let height = contentHeight;
      if (!isOpen.value && minHeight < contentHeight) {
        height = minHeight;
        blurLayerRequired.value = true;
      }
      contentInnerStyles.value = [
        "display: block",
        "height: " + height + "px"
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
        calcContentStyle();
      });
    });
    onMounted(() => {
      window.addEventListener("resize", calcContentStyle);
    });
    onBeforeUnmount(() => {
      if (typeof contentInnerObserver.value !== "undefined" && contentInnerObserver.value !== null) {
        contentInnerObserver.value.disconnect();
      }
      window.removeEventListener("resize", calcContentStyle);
    });
    if (slots["read-more-content"]) {
      console.info("[LktAccordion] Using read-more-content slot");
    }
    if (slots["content-after-first-open"]) {
      console.info("[LktAccordion] Using content-after-first-open slot");
    }
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: normalizeClass(["lkt-accordion", classes.value])
        }, [
          createElementVNode("header", {
            class: "lkt-accordion-header",
            onClick: onClickUserToggle
          }, [
            !_ctx.toggleIconAtEnd && !_ctx.alwaysOpen ? (openBlock(), createElementBlock("div", _hoisted_2, [
              hasToggleSlot.value ? (openBlock(), createBlock(resolveDynamicComponent(toggleSlot.value), {
                key: 0,
                class: normalizeClass(["lkt-accordion-toggle-inner", isOpen.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", isOpen.value ? "is-opened" : ""])
              }, null, 2))
            ])) : createCommentVNode("", true),
            !!unref(slots).header || computedLabel.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
              !!unref(slots).header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : computedLabel.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _ctx.icon && !_ctx.iconAtEnd ? (openBlock(), createElementBlock("i", {
                  key: 0,
                  class: normalizeClass(_ctx.icon)
                }, null, 2)) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(computedLabel.value) + " ", 1),
                _ctx.icon && _ctx.iconAtEnd ? (openBlock(), createElementBlock("i", {
                  key: 1,
                  class: normalizeClass(_ctx.icon)
                }, null, 2)) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            _ctx.showActionButton && (_ctx.actionButtonText !== "" || _ctx.actionButtonIcon !== "") ? (openBlock(), createElementBlock("div", _hoisted_4, [
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
            _ctx.toggleIconAtEnd && !_ctx.alwaysOpen ? (openBlock(), createElementBlock("div", _hoisted_5, [
              hasToggleSlot.value ? (openBlock(), createBlock(resolveDynamicComponent(toggleSlot.value), {
                key: 0,
                class: normalizeClass(["lkt-accordion-toggle-inner", isOpen.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", isOpen.value ? "is-opened" : ""])
              }, null, 2))
            ])) : createCommentVNode("", true)
          ]),
          createElementVNode("section", {
            class: normalizeClass(["lkt-accordion-content", contentClasses.value]),
            style: normalizeStyle(contentInnerStyle.value)
          }, [
            createElementVNode("div", {
              class: normalizeClass(["lkt-accordion-content-inner", contentInnerClasses.value]),
              ref_key: "contentInner",
              ref: contentInner
            }, [
              unref(slots)["intro"] ? (openBlock(), createElementBlock("section", {
                key: 0,
                class: "lkt-accordion-read-more-intro",
                onClick: onClickReadMoreIntro
              }, [
                renderSlot(_ctx.$slots, "intro")
              ])) : unref(slots)["read-more-content"] ? (openBlock(), createElementBlock("section", {
                key: 1,
                class: "lkt-accordion-read-more-intro",
                onClick: onClickReadMoreIntro
              }, [
                renderSlot(_ctx.$slots, "read-more-content")
              ])) : createCommentVNode("", true),
              unref(slots)["lazy"] && atLeastToggledOnce.value ? renderSlot(_ctx.$slots, "lazy", { key: 2 }) : unref(slots)["content-after-first-open"] && atLeastToggledOnce.value ? renderSlot(_ctx.$slots, "content-after-first-open", { key: 3 }) : renderSlot(_ctx.$slots, "default", { key: 4 })
            ], 2)
          ], 6)
        ], 2),
        computedButtonText.value !== "" || computedButtonIcon.value !== "" ? (openBlock(), createElementBlock("nav", _hoisted_6, [
          createVNode(_component_lkt_button, {
            class: normalizeClass(_ctx.buttonIconClass),
            icon: computedButtonIcon.value,
            text: computedButtonText.value,
            onClick: onClickUserToggle
          }, null, 8, ["class", "icon", "text"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const LktAccordion = {
  install: (app) => {
    if (app.component("lkt-accordion") === void 0) app.component("lkt-accordion", _sfc_main);
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
