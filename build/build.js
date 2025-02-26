import { defineComponent as ee, mergeDefaults as te, useSlots as oe, ref as i, watch as C, computed as a, onMounted as M, nextTick as ne, onBeforeUnmount as le, resolveComponent as ae, createElementBlock as l, openBlock as n, createElementVNode as b, createCommentVNode as u, normalizeClass as r, unref as v, createBlock as j, resolveDynamicComponent as D, renderSlot as T, Fragment as ue, createTextVNode as ie, toDisplayString as re, createVNode as N, mergeProps as R, normalizeStyle as ce } from "vue";
import { ensureButtonConfig as $, LktSettings as _, extractI18nValue as se, AccordionType as k, getDefaultValues as de, Accordion as ge } from "lkt-vue-kernel";
const A = class A {
};
A.toggleSlot = "", A.debugEnabled = !1;
let m = A;
const ve = { class: "lkt-accordion-container" }, ke = {
  key: 0,
  class: "lkt-accordion-toggle"
}, fe = {
  key: 1,
  class: "lkt-accordion-title"
}, pe = {
  key: 2,
  class: "lkt-accordion-buttons"
}, ye = {
  key: 3,
  class: "lkt-accordion-toggle"
}, me = {
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
  setup(s, { emit: U }) {
    const f = U, h = oe(), t = s, o = i(t.modelValue), S = i(t.modelValue), d = i(null), B = i(null), I = i(0), g = i(!1), H = i(""), E = i(!1), L = i($(t.toggleButton, _.defaultToggleButton));
    C(() => t.toggleButton, (e) => {
      L.value = $(e, _.defaultToggleButton);
    }, { deep: !0 });
    const q = a(() => {
      var c;
      let e = [];
      return t.class && e.push(t.class), o.value && e.push("is-open"), (c = t.toggleButton) != null && c.iconEnd && e.push("icon-at-end"), t.toggleMode && e.push(`toggle-mode--${t.toggleMode}`), t.iconRotation && e.push(`icon-rotation--${t.iconRotation}`), e.join(" ");
    }), F = a(() => {
      let e = [];
      return E.value && !o.value && e.push("lkt-accordion-blur-layer"), e.join(" ");
    }), P = a(() => {
      let e = [];
      return t.contentClass && e.push(t.contentClass), o.value && S.value && e.push("is-opened"), e.join(" ");
    }), G = a(() => !o.value && typeof t.minHeight == "undefined" ? "" : H.value), w = a(() => se(t.title)), O = a(() => !!m.toggleSlot), z = a(() => m.toggleSlot), J = a(() => typeof t.actionButton != "undefined" && Object.keys(t.actionButton).length > 0), K = a(() => typeof t.toggleButton != "undefined" && Object.keys(t.toggleButton).length > 0), Q = a(() => t.type === k.Lazy ? g.value : t.type === k.Ever ? o.value : !0), V = (e = !1) => {
      t.type !== k.Always && (!o.value && !g.value && (g.value = !0), e || (o.value = !o.value), p());
    }, W = () => {
      t.toggleOnClickIntro && V();
    }, X = () => {
      V(), f("user-toggle", o.value);
    }, Y = (e) => {
      e && (V(!0), f("user-toggle", o.value));
    };
    C(() => t.modelValue, (e) => o.value = e), C(o, (e) => {
      e ? (I.value = d.value.clientHeight, setTimeout(() => {
        S.value = !0;
      }, 1)) : (I.value = Number(t.minHeight), setTimeout(() => {
        S.value = !0;
      }, 1)), f("update:modelValue", e);
    }), C(g, () => f("first-open"));
    const Z = () => {
      var e;
      f("click-action-button", (e = t.actionButton) == null ? void 0 : e.resourceData);
    }, p = () => {
      if (t.toggleMode === "display" || (E.value = !1, !d.value)) return;
      let e = d.value.offsetHeight, c = Number(t.minHeight), y = e;
      !o.value && c < e && (y = c, E.value = !0), H.value = [
        "display: block",
        "height: " + y + "px"
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
        }), B.value = e, p();
      });
    }), M(() => {
      window.addEventListener("resize", p);
    }), le(() => {
      typeof B.value != "undefined" && B.value !== null && B.value.disconnect(), window.removeEventListener("resize", p);
    }), (e, c) => {
      const y = ae("lkt-button");
      return n(), l("div", ve, [
        b("div", {
          class: r(["lkt-accordion", q.value])
        }, [
          b("header", {
            class: "lkt-accordion-header",
            onClick: X
          }, [
            !e.toggleIconAtEnd && t.type !== v(k).Always ? (n(), l("div", ke, [
              O.value ? (n(), j(D(z.value), {
                key: 0,
                class: r(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: r(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", o.value ? "is-opened" : ""])
              }, null, 2))
            ])) : u("", !0),
            v(h).header || w.value.length > 0 ? (n(), l("div", fe, [
              v(h).header ? T(e.$slots, "header", { key: 0 }) : w.value.length > 0 ? (n(), l(ue, { key: 1 }, [
                e.icon && !e.iconAtEnd ? (n(), l("i", {
                  key: 0,
                  class: r(e.icon)
                }, null, 2)) : u("", !0),
                ie(" " + re(w.value) + " ", 1),
                e.icon && e.iconAtEnd ? (n(), l("i", {
                  key: 1,
                  class: r(e.icon)
                }, null, 2)) : u("", !0)
              ], 64)) : u("", !0)
            ])) : u("", !0),
            J.value ? (n(), l("div", pe, [
              N(y, R(e.actionButton, { onClick: Z }), null, 16)
            ])) : u("", !0),
            e.toggleIconAtEnd && t.type !== v(k).Always ? (n(), l("div", ye, [
              O.value ? (n(), j(D(z.value), {
                key: 0,
                class: r(["lkt-accordion-toggle-inner", o.value ? "is-opened" : ""])
              }, null, 8, ["class"])) : (n(), l("div", {
                key: 1,
                class: r(["lkt-accordion-toggle-inner lkt-accordion-toggle-triangle", o.value ? "is-opened" : ""])
              }, null, 2))
            ])) : u("", !0)
          ]),
          b("section", {
            class: r(["lkt-accordion-content", F.value]),
            style: ce(G.value)
          }, [
            b("div", {
              class: r(["lkt-accordion-content-inner", P.value]),
              ref_key: "contentInner",
              ref: d
            }, [
              v(h).intro ? (n(), l("section", {
                key: 0,
                class: "lkt-accordion-read-more-intro",
                onClick: W
              }, [
                T(e.$slots, "intro")
              ])) : u("", !0),
              v(h).lazy && g.value ? T(e.$slots, "lazy", { key: 1 }) : Q.value ? T(e.$slots, "default", { key: 2 }) : u("", !0)
            ], 2)
          ], 6)
        ], 2),
        K.value ? (n(), l("nav", me, [
          N(y, R(L.value, {
            checked: o.value,
            "onUpdate:checked": c[0] || (c[0] = (x) => o.value = x),
            onClick: Y
          }), null, 16, ["checked"])
        ])) : u("", !0)
      ]);
    };
  }
}), be = {
  install: (s) => {
    s.component("lkt-accordion") === void 0 && s.component("lkt-accordion", he);
  }
}, Te = (s) => (m.toggleSlot = s, !0);
export {
  be as default,
  Te as setAccordionToggleSlot
};
