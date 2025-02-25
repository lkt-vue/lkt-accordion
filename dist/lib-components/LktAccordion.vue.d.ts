import { AccordionConfig, AccordionType } from "lkt-vue-kernel";
declare const slots: Readonly<{
    [name: string]: import("vue").Slot<any> | undefined;
}>;
declare const isOpen: import("vue").Ref<boolean, boolean>, contentInner: import("vue").Ref<null, null>, atLeastToggledOnce: import("vue").Ref<boolean, boolean>;
declare const classes: import("vue").ComputedRef<string>, contentClasses: import("vue").ComputedRef<string>, contentInnerClasses: import("vue").ComputedRef<string>, contentInnerStyle: import("vue").ComputedRef<string>, computedLabel: import("vue").ComputedRef<any>, hasToggleSlot: import("vue").ComputedRef<boolean>, toggleSlot: import("vue").ComputedRef<string | import("vue").Component>, computedShowActionButton: import("vue").ComputedRef<boolean>, computedShowToggleButton: import("vue").ComputedRef<boolean>, computedCanRenderDefaultSlot: import("vue").ComputedRef<boolean>;
declare const onClickReadMoreIntro: () => void, onClickUserToggle: () => void;
declare const onClickActionButton: () => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_5: {}, __VLS_19: {}, __VLS_21: {}, __VLS_23: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    header?: (props: typeof __VLS_5) => any;
} & {
    intro?: (props: typeof __VLS_19) => any;
} & {
    lazy?: (props: typeof __VLS_21) => any;
} & {
    default?: (props: typeof __VLS_23) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<AccordionConfig, {
    AccordionType: typeof AccordionType;
    slots: typeof slots;
    isOpen: typeof isOpen;
    contentInner: typeof contentInner;
    atLeastToggledOnce: typeof atLeastToggledOnce;
    classes: typeof classes;
    contentClasses: typeof contentClasses;
    contentInnerClasses: typeof contentInnerClasses;
    contentInnerStyle: typeof contentInnerStyle;
    computedLabel: typeof computedLabel;
    hasToggleSlot: typeof hasToggleSlot;
    toggleSlot: typeof toggleSlot;
    computedShowActionButton: typeof computedShowActionButton;
    computedShowToggleButton: typeof computedShowToggleButton;
    computedCanRenderDefaultSlot: typeof computedCanRenderDefaultSlot;
    onClickReadMoreIntro: typeof onClickReadMoreIntro;
    onClickUserToggle: typeof onClickUserToggle;
    onClickActionButton: typeof onClickActionButton;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "first-open": (...args: any[]) => void;
    "click-action-button": (...args: any[]) => void;
    "user-toggle": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<AccordionConfig> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onFirst-open"?: ((...args: any[]) => any) | undefined;
    "onClick-action-button"?: ((...args: any[]) => any) | undefined;
    "onUser-toggle"?: ((...args: any[]) => any) | undefined;
}>, {
    minHeight: number;
    title: string;
    class: string;
    icon: string;
    modelValue: boolean;
    iconAtEnd: boolean;
    toggleMode: import("lkt-vue-kernel").AccordionToggleMode;
    toggleOnClickIntro: boolean;
    toggleTimeout: number;
    contentClass: string;
    iconRotation: "90" | "180" | "-90" | "-180";
    toggleIconAtEnd: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<AccordionConfig, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "first-open": (...args: any[]) => void;
    "click-action-button": (...args: any[]) => void;
    "user-toggle": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<AccordionConfig> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onFirst-open"?: ((...args: any[]) => any) | undefined;
    "onClick-action-button"?: ((...args: any[]) => any) | undefined;
    "onUser-toggle"?: ((...args: any[]) => any) | undefined;
}>, {
    minHeight: number;
    title: string;
    class: string;
    icon: string;
    modelValue: boolean;
    iconAtEnd: boolean;
    toggleMode: import("lkt-vue-kernel").AccordionToggleMode;
    toggleOnClickIntro: boolean;
    toggleTimeout: number;
    contentClass: string;
    iconRotation: "90" | "180" | "-90" | "-180";
    toggleIconAtEnd: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
