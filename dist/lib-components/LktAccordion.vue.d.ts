import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: boolean;
    title: string;
    icon: string;
    palette: string;
    class: string;
    contentClass: string;
    toggleMode: "height" | "display" | "transform";
    toggleTimeout: number;
    toggleIconAtEnd: boolean;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    showActionButton: boolean;
    actionButtonClass: string;
    actionButtonText: string;
    actionButtonIcon: string;
    actionButtonResource: string;
    actionButtonConfirm: string;
    actionButtonConfirmData: LktObject;
    actionButtonData: LktObject;
    iconRotation: "90" | "180" | "-90" | "-180";
}>, {
    modelValue: boolean;
    title: string;
    icon: string;
    palette: string;
    class: string;
    contentClass: string;
    toggleMode: string;
    toggleTimeout: number;
    toggleIconAtEnd: boolean;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    showActionButton: boolean;
    actionButtonClass: string;
    actionButtonText: string;
    actionButtonIcon: string;
    actionButtonResource: string;
    actionButtonConfirm: string;
    actionButtonConfirmData: () => {};
    actionButtonData: () => {};
    iconRotation: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "first-open": (...args: any[]) => void;
    "click-action-button": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: boolean;
    title: string;
    icon: string;
    palette: string;
    class: string;
    contentClass: string;
    toggleMode: "height" | "display" | "transform";
    toggleTimeout: number;
    toggleIconAtEnd: boolean;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    showActionButton: boolean;
    actionButtonClass: string;
    actionButtonText: string;
    actionButtonIcon: string;
    actionButtonResource: string;
    actionButtonConfirm: string;
    actionButtonConfirmData: LktObject;
    actionButtonData: LktObject;
    iconRotation: "90" | "180" | "-90" | "-180";
}>, {
    modelValue: boolean;
    title: string;
    icon: string;
    palette: string;
    class: string;
    contentClass: string;
    toggleMode: string;
    toggleTimeout: number;
    toggleIconAtEnd: boolean;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    showActionButton: boolean;
    actionButtonClass: string;
    actionButtonText: string;
    actionButtonIcon: string;
    actionButtonResource: string;
    actionButtonConfirm: string;
    actionButtonConfirmData: () => {};
    actionButtonData: () => {};
    iconRotation: string;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onFirst-open"?: ((...args: any[]) => any) | undefined;
    "onClick-action-button"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    class: string;
    icon: string;
    modelValue: boolean;
    palette: string;
    contentClass: string;
    toggleMode: "height" | "display" | "transform";
    toggleTimeout: number;
    toggleIconAtEnd: boolean;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    showActionButton: boolean;
    actionButtonClass: string;
    actionButtonText: string;
    actionButtonIcon: string;
    actionButtonResource: string;
    actionButtonConfirm: string;
    actionButtonConfirmData: LktObject;
    actionButtonData: LktObject;
    iconRotation: "90" | "180" | "-90" | "-180";
}, {}>, {
    header?(_: {}): any;
    "content-after-first-open"?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
