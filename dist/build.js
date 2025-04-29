import { defineComponent as ee, mergeDefaults as te, useSlots as oe, ref as s, watch as T, computed as i, onMounted as M, nextTick as ne, onBeforeUnmount as le, resolveComponent as ae, createElementBlock as l, openBlock as n, normalizeClass as r, createElementVNode as h, createCommentVNode as a, renderSlot as B, unref as c, createBlock as $, resolveDynamicComponent as j, Fragment as ue, createTextVNode as ie, toDisplayString as se, createVNode as D, mergeProps as N, normalizeStyle as re } from "vue";
import { ensureButtonConfig as R, LktSettings as U, extractI18nValue as ce, AccordionType as k, getDefaultValues as de, Accordion as ge } from "lkt-vue-kernel";
const A = class A {
};
A.toggleSlot = "", A.debugEnabled = !1;
let C = A;
const ve = { class: "lkt-accordion-main" }, ke = {
  key: 0,
  class: "lkt-accordion-toggle"
}, fe = {
  key: 1,
  class: "lkt-accordion-title"
}, pe = {
  key: 2,
  class: "lkt-accordion-buttons"
}, me = {
  key: 3,
  class: "lkt-accordion-toggle"
}, ye = {
  key: 0,
  class: "lkt-accordion-nav"
}, he = /* @__PURE__ */ ee({
  __name: "LktAccordion",
  props: /* @__PURE__ */ te({
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
  }, de(ge)),
  emits: [
    "update:modelValue",
    "first-open",
    "click-action-button",
    "user-toggle"
  ],
  setup(d, { emit: _ }) {
    const f = _, p = oe(), t = d, o = s(t.modelValue), S = s(t.modelValue), g = s(null), b = s(null), w = s(0), v = s(!1), H = s(""), I = s(!1), L = s(R(t.toggleButton, U.defaultToggleButton));
    T(() => t.toggleButton, (e) => {
      L.value = R(e, U.defaultToggleButton);
    }, { deep: !0 });
    const q = i(() => {
      var u;
      let e = [];
      return t.class && e.push(t.class), o.value && e.push("is-open"), (u = t.toggleButton) != null && u.iconEnd && e.push("icon-at-end"), t.toggleMode && e.push(`toggle-mode--${t.toggleMode}`), t.iconRotation && e.push(`icon-rotation--${t.iconRotation}`), e.join(" ");
    }), F = i(() => {
      let e = [];
      return I.value && !o.value && e.push("lkt-accordion-blur-layer"), e.join(" ");
    }), P = i(() => {
      let e = [];
      return t.contentClass && e.push(t.contentClass), o.value && S.value && e.push("is-opened"), e.join(" ");
    }), G = i(() => !o.value && typeof t.minHeight == "undefined" ? "" : H.value), E = i(() => ce(t.title)), O = i(() => !!C.toggleSlot), z = i(() => C.toggleSlot), J = i(() => typeof t.actionButton != "undefined" && Object.keys(t.actionButton).length > 0), K = i(() => typeof t.toggleButton != "undefined" && Object.keys(t.toggleButton).length > 0), Q = i(() => t.type === k.Lazy ? v.value : t.type === k.Ever ? o.value : !0), V = (e = !1) => {
      t.type !== k.Always && (!o.value && !v.value && (v.value = !0), e || (o.value = !o.value), m());
    }, W = () => {
      t.toggleOnClickIntro && V();
    }, X = () => {
      V(), f("user-toggle", o.value);
    }, Y = (e) => {
      e && (V(!0), f("user-toggle", o.value));
    };
    T(() => t.modelValue, (e) => o.value = e), T(o, (e) => {
      e ? (w.value = g.value.clientHeight, setTimeout(() => {
        S.value = !0;
      }, 1)) : (w.value = Number(t.minHeight), setTimeout(() => {
        S.value = !0;
      }, 1)), f("update:modelValue", e);
    }), T(v, () => f("first-open"));
    const Z = () => {
      var e;
      f("click-action-button", (e = t.actionButton) == null ? void 0 : e.resourceData);
    }, m = () => {
      if (t.toggleMode === "display" || (I.value = !1, !g.value)) return;
      let e = g.value.offsetHeight, u = Number(t.minHeight), y = e;
      !o.value && u < e && (y = u, I.value = !0), H.value = [
        "display: block",
        "height: " + y + "px"
      ].join(";");
    };
    return M(() => {
      t.type === k.Always && !o.value && (o.value = !0), o.value && (v.value = !0), ne(() => {
        w.value = g.value.clientHeight;
        const e = new MutationObserver(() => {
          setTimeout(() => {
            m();
          }, t.toggleTimeout);
        });
        e.observe(g.value, {
          childList: !0,
          subtree: !0,
          attributes: !0
        }), b.value = e, m();
      });
    }), M(() => {
      window.addEventListener("resize", m);
    }), le(() => {
      typeof b.value != "undefined" && b.value !== null && b.value.disconnect(), window.removeEventListener("resize", m);
    }), (e, u) => {
      const y = ae("lkt-button");
      return n(), l("div", {
        class: r(["lkt-accordion", q.value])
      }, [
        h("div", ve, [
          h("header", {
            class: "lkt-accordion-header",
            onClick: X
          }, [
            !e.toggleIconAtEnd && t.type !== c(k).Always ? (n(), l("div", ke, [
              O.value ? (n(), $(j(z.value), {
                key: 0,
                class: r(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: r(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", o.value ? "is-opened" : ""])
              }, null, 2))
            ])) : a("", !0),
            c(p).header || E.value.length > 0 ? (n(), l("div", fe, [
              e.icon && !e.iconAtEnd ? (n(), l("i", {
                key: 0,
                class: r(e.icon)
              }, null, 2)) : a("", !0),
              c(p).header ? B(e.$slots, "header", { key: 1 }) : E.value.length > 0 ? (n(), l(ue, { key: 2 }, [
                ie(se(E.value), 1)
              ], 64)) : a("", !0),
              e.icon && e.iconAtEnd ? (n(), l("i", {
                key: 3,
                class: r(e.icon)
              }, null, 2)) : a("", !0)
            ])) : a("", !0),
            J.value ? (n(), l("div", pe, [
              D(y, N(e.actionButton, { onClick: Z }), null, 16)
            ])) : a("", !0),
            e.toggleIconAtEnd && t.type !== c(k).Always ? (n(), l("div", me, [
              O.value ? (n(), $(j(z.value), {
                key: 0,
                class: r(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: r(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, u[1] || (u[1] = [
                h("i", { class: "lkt-icn-angle-bottom" }, null, -1)
              ]), 2))
            ])) : a("", !0)
          ]),
          h("section", {
            class: r(["lkt-accordion-content", F.value]),
            style: re(G.value)
          }, [
            h("div", {
              class: r(["lkt-accordion-content-inner", P.value]),
              ref_key: "contentInner",
              ref: g
            }, [
              c(p).intro ? (n(), l("section", {
                key: 0,
                class: "lkt-accordion-read-more-intro",
                onClick: W
              }, [
                B(e.$slots, "intro")
              ])) : a("", !0),
              c(p).lazy && v.value ? B(e.$slots, "lazy", { key: 1 }) : Q.value ? B(e.$slots, "default", { key: 2 }) : a("", !0)
            ], 2)
          ], 6)
        ]),
        K.value ? (n(), l("nav", ye, [
          D(y, N(L.value, {
            checked: o.value,
            "onUpdate:checked": u[0] || (u[0] = (x) => o.value = x),
            onClick: Y
          }), null, 16, ["checked"])
        ])) : a("", !0),
        c(p)["web-element-actions"] ? B(e.$slots, "web-element-actions", { key: 1 }) : a("", !0)
      ], 2);
    };
  }
}), be = {
  install: (d) => {
    d.component("lkt-accordion") === void 0 && d.component("lkt-accordion", he);
  }
}, Te = (d) => (C.toggleSlot = d, !0);
export {
  be as default,
  Te as setAccordionToggleSlot
};
