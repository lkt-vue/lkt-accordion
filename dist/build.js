import { defineComponent, mergeDefaults, useSlots, ref, watch, computed, onMounted, nextTick, onBeforeUnmount, resolveComponent, createElementBlock, openBlock, createElementVNode, createCommentVNode, normalizeClass, unref, createBlock, resolveDynamicComponent, renderSlot, Fragment, createTextVNode, toDisplayString, createVNode, mergeProps, normalizeStyle } from "vue";
import { ensureButtonConfig, LktSettings, extractI18nValue, AccordionType, getDefaultValues, Accordion } from "lkt-vue-kernel";
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
  props: /* @__PURE__ */ mergeDefaults({
    modelValue: { type: Boolean },
    type: {},
    toggleMode: {},
    actionButton: {},
    toggleButton: {},
    toggleOnClickIntro: { type: Boolean },
    toggleTimeout: {},
    title: {},
    icon: {},
    class: {},
    contentClass: {},
    iconRotation: {},
    minHeight: {},
    iconAtEnd: { type: Boolean },
    toggleIconAtEnd: { type: Boolean }
  }, getDefaultValues(Accordion)),
  emits: [
    "update:modelValue",
    "first-open",
    "click-action-button",
    "user-toggle"
  ],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const slots = useSlots();
    const props = __props;
    const isOpen = ref(props.modelValue), renderContent = ref(props.modelValue), contentInner = ref(null), contentInnerObserver = ref(null), contentInnerHeight = ref(0), atLeastToggledOnce = ref(false), contentInnerStyles = ref(""), blurLayerRequired = ref(false);
    const safeToggleButton = ref(ensureButtonConfig(props.toggleButton, LktSettings.defaultToggleButton));
    watch(() => props.toggleButton, (v) => {
      safeToggleButton.value = ensureButtonConfig(v, LktSettings.defaultToggleButton);
    }, { deep: true });
    const classes = computed(() => {
      var _a;
      let r = [];
      if (props.class) r.push(props.class);
      if (isOpen.value) r.push("is-open");
      if ((_a = props.toggleButton) == null ? void 0 : _a.iconEnd) r.push("icon-at-end");
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
    }), computedTitle = computed(() => {
      return extractI18nValue(props.title);
    }), hasToggleSlot = computed(() => {
      return !!Settings.toggleSlot;
    }), toggleSlot = computed(() => {
      return Settings.toggleSlot;
    }), computedShowActionButton = computed(() => {
      return typeof props.actionButton !== "undefined" && Object.keys(props.actionButton).length > 0;
    }), computedShowToggleButton = computed(() => {
      return typeof props.toggleButton !== "undefined" && Object.keys(props.toggleButton).length > 0;
    }), computedCanRenderDefaultSlot = computed(() => {
      if (props.type === AccordionType.Lazy) return atLeastToggledOnce.value;
      if (props.type === AccordionType.Ever) return isOpen.value;
      return true;
    });
    const toggle = (skipIsOpenControl = false) => {
      if (props.type === AccordionType.Always) return;
      if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
      }
      if (!skipIsOpenControl) {
        isOpen.value = !isOpen.value;
      }
      calcContentStyle();
    }, onClickReadMoreIntro = () => {
      if (props.toggleOnClickIntro) {
        toggle();
      }
    }, onClickUserToggle = () => {
      toggle();
      emits("user-toggle", isOpen.value);
    }, onClickToggleButton = ($event) => {
      if (!$event) return;
      toggle(true);
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
      var _a;
      emits("click-action-button", (_a = props.actionButton) == null ? void 0 : _a.resourceData);
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
      if (props.type === AccordionType.Always && !isOpen.value) {
        isOpen.value = true;
      }
      if (isOpen.value) atLeastToggledOnce.value = true;
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
            !_ctx.toggleIconAtEnd && props.type !== unref(AccordionType).Always ? (openBlock(), createElementBlock("div", _hoisted_2, [
              hasToggleSlot.value ? (openBlock(), createBlock(resolveDynamicComponent(toggleSlot.value), {
                key: 0,
                class: normalizeClass(["lkt-accordion-toggle-inner", isOpen.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", isOpen.value ? "is-opened" : ""])
              }, null, 2))
            ])) : createCommentVNode("", true),
            !!unref(slots).header || computedTitle.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
              !!unref(slots).header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : computedTitle.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _ctx.icon && !_ctx.iconAtEnd ? (openBlock(), createElementBlock("i", {
                  key: 0,
                  class: normalizeClass(_ctx.icon)
                }, null, 2)) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(computedTitle.value) + " ", 1),
                _ctx.icon && _ctx.iconAtEnd ? (openBlock(), createElementBlock("i", {
                  key: 1,
                  class: normalizeClass(_ctx.icon)
                }, null, 2)) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            computedShowActionButton.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createVNode(_component_lkt_button, mergeProps(_ctx.actionButton, { onClick: onClickActionButton }), null, 16)
            ])) : createCommentVNode("", true),
            _ctx.toggleIconAtEnd && props.type !== unref(AccordionType).Always ? (openBlock(), createElementBlock("div", _hoisted_5, [
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
              ])) : createCommentVNode("", true),
              unref(slots)["lazy"] && atLeastToggledOnce.value ? renderSlot(_ctx.$slots, "lazy", { key: 1 }) : computedCanRenderDefaultSlot.value ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("", true)
            ], 2)
          ], 6)
        ], 2),
        computedShowToggleButton.value ? (openBlock(), createElementBlock("nav", _hoisted_6, [
          createVNode(_component_lkt_button, mergeProps(safeToggleButton.value, {
            checked: isOpen.value,
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => isOpen.value = $event),
            onClick: onClickToggleButton
          }), null, 16, ["checked"])
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
