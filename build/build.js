import { defineComponent as ee, mergeDefaults as te, useSlots as oe, ref as r, watch as b, computed as u, onMounted as M, nextTick as ne, onBeforeUnmount as le, resolveComponent as ae, createElementBlock as l, openBlock as n, createElementVNode as y, createCommentVNode as i, normalizeClass as s, unref as v, createBlock as j, resolveDynamicComponent as D, renderSlot as T, Fragment as ue, createTextVNode as ie, toDisplayString as re, createVNode as N, mergeProps as R, normalizeStyle as se } from "vue";
import { ensureButtonConfig as $, LktSettings as U, extractI18nValue as ce, AccordionType as k, getDefaultValues as de, Accordion as ge } from "lkt-vue-kernel";
const A = class A {
};
A.toggleSlot = "", A.debugEnabled = !1;
let h = A;
const ve = { class: "lkt-accordion-container" }, ke = {
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
  setup(c, { emit: _ }) {
    const f = _, B = oe(), t = c, o = r(t.modelValue), S = r(t.modelValue), d = r(null), C = r(null), I = r(0), g = r(!1), H = r(""), E = r(!1), L = r($(t.toggleButton, U.defaultToggleButton));
    b(() => t.toggleButton, (e) => {
      L.value = $(e, U.defaultToggleButton);
    }, { deep: !0 });
    const q = u(() => {
      var a;
      let e = [];
      return t.class && e.push(t.class), o.value && e.push("is-open"), (a = t.toggleButton) != null && a.iconEnd && e.push("icon-at-end"), t.toggleMode && e.push(`toggle-mode--${t.toggleMode}`), t.iconRotation && e.push(`icon-rotation--${t.iconRotation}`), e.join(" ");
    }), F = u(() => {
      let e = [];
      return E.value && !o.value && e.push("lkt-accordion-blur-layer"), e.join(" ");
    }), P = u(() => {
      let e = [];
      return t.contentClass && e.push(t.contentClass), o.value && S.value && e.push("is-opened"), e.join(" ");
    }), G = u(() => !o.value && typeof t.minHeight == "undefined" ? "" : H.value), w = u(() => ce(t.title)), O = u(() => !!h.toggleSlot), z = u(() => h.toggleSlot), J = u(() => typeof t.actionButton != "undefined" && Object.keys(t.actionButton).length > 0), K = u(() => typeof t.toggleButton != "undefined" && Object.keys(t.toggleButton).length > 0), Q = u(() => t.type === k.Lazy ? g.value : t.type === k.Ever ? o.value : !0), V = (e = !1) => {
      t.type !== k.Always && (!o.value && !g.value && (g.value = !0), e || (o.value = !o.value), p());
    }, W = () => {
      t.toggleOnClickIntro && V();
    }, X = () => {
      V(), f("user-toggle", o.value);
    }, Y = (e) => {
      e && (V(!0), f("user-toggle", o.value));
    };
    b(() => t.modelValue, (e) => o.value = e), b(o, (e) => {
      e ? (I.value = d.value.clientHeight, setTimeout(() => {
        S.value = !0;
      }, 1)) : (I.value = Number(t.minHeight), setTimeout(() => {
        S.value = !0;
      }, 1)), f("update:modelValue", e);
    }), b(g, () => f("first-open"));
    const Z = () => {
      var e;
      f("click-action-button", (e = t.actionButton) == null ? void 0 : e.resourceData);
    }, p = () => {
      if (t.toggleMode === "display" || (E.value = !1, !d.value)) return;
      let e = d.value.offsetHeight, a = Number(t.minHeight), m = e;
      !o.value && a < e && (m = a, E.value = !0), H.value = [
        "display: block",
        "height: " + m + "px"
      ].join(";");
    };
    return M(() => {
      t.type === k.Always && !o.value && (o.value = !0), o.value && (g.value = !0), ne(() => {
        I.value = d.value.clientHeight;
        const e = new MutationObserver(() => {
          setTimeout(() => {
            p();
          }, t.toggleTimeout);
        });
        e.observe(d.value, {
          childList: !0,
          subtree: !0,
          attributes: !0
        }), C.value = e, p();
      });
    }), M(() => {
      window.addEventListener("resize", p);
    }), le(() => {
      typeof C.value != "undefined" && C.value !== null && C.value.disconnect(), window.removeEventListener("resize", p);
    }), (e, a) => {
      const m = ae("lkt-button");
      return n(), l("div", ve, [
        y("div", {
          class: s(["lkt-accordion", q.value])
        }, [
          y("header", {
            class: "lkt-accordion-header",
            onClick: X
          }, [
            !e.toggleIconAtEnd && t.type !== v(k).Always ? (n(), l("div", ke, [
              O.value ? (n(), j(D(z.value), {
                key: 0,
                class: s(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: s(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", o.value ? "is-opened" : ""])
              }, null, 2))
            ])) : i("", !0),
            v(B).header || w.value.length > 0 ? (n(), l("div", fe, [
              v(B).header ? T(e.$slots, "header", { key: 0 }) : w.value.length > 0 ? (n(), l(ue, { key: 1 }, [
                e.icon && !e.iconAtEnd ? (n(), l("i", {
                  key: 0,
                  class: s(e.icon)
                }, null, 2)) : i("", !0),
                ie(" " + re(w.value) + " ", 1),
                e.icon && e.iconAtEnd ? (n(), l("i", {
                  key: 1,
                  class: s(e.icon)
                }, null, 2)) : i("", !0)
              ], 64)) : i("", !0)
            ])) : i("", !0),
            J.value ? (n(), l("div", pe, [
              N(m, R(e.actionButton, { onClick: Z }), null, 16)
            ])) : i("", !0),
            e.toggleIconAtEnd && t.type !== v(k).Always ? (n(), l("div", me, [
              O.value ? (n(), j(D(z.value), {
                key: 0,
                class: s(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: s(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, a[1] || (a[1] = [
                y("i", { class: "lkt-icn-angle-bottom" }, null, -1)
              ]), 2))
            ])) : i("", !0)
          ]),
          y("section", {
            class: s(["lkt-accordion-content", F.value]),
            style: se(G.value)
          }, [
            y("div", {
              class: s(["lkt-accordion-content-inner", P.value]),
              ref_key: "contentInner",
              ref: d
            }, [
              v(B).intro ? (n(), l("section", {
                key: 0,
                class: "lkt-accordion-read-more-intro",
                onClick: W
              }, [
                T(e.$slots, "intro")
              ])) : i("", !0),
              v(B).lazy && g.value ? T(e.$slots, "lazy", { key: 1 }) : Q.value ? T(e.$slots, "default", { key: 2 }) : i("", !0)
            ], 2)
          ], 6)
        ], 2),
        K.value ? (n(), l("nav", ye, [
          N(m, R(L.value, {
            checked: o.value,
            "onUpdate:checked": a[0] || (a[0] = (x) => o.value = x),
            onClick: Y
          }), null, 16, ["checked"])
        ])) : i("", !0)
      ]);
    };
  }
}), be = {
  install: (c) => {
    c.component("lkt-accordion") === void 0 && c.component("lkt-accordion", he);
  }
}, Te = (c) => (h.toggleSlot = c, !0);
export {
  be as default,
  Te as setAccordionToggleSlot
};
