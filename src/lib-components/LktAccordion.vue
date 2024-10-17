<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {LktObject} from "lkt-ts-interfaces";
import {Settings} from "../settings/Settings";
import {__} from "lkt-i18n";

// Emits
const emits = defineEmits(['update:modelValue', 'first-open', 'click-action-button', 'user-toggle']);

// Slots
const slots = useSlots();

// Props
const props = withDefaults(defineProps<{
    modelValue: boolean
    title: string
    icon: string
    palette: string
    class: string
    contentClass: string
    toggleMode: 'transform' | 'height' | 'display'
    toggleTimeout: number
    toggleIconAtEnd: boolean
    iconAtEnd: boolean
    alwaysOpen: boolean
    showActionButton: boolean
    actionButtonClass: string
    actionButtonText: string
    actionButtonIcon: string
    actionButtonResource: string
    actionButtonConfirm: string
    actionButtonConfirmData: LktObject
    actionButtonData: LktObject
    iconRotation: '90' | '180' | '-90' | '-180'
    minHeight: number | undefined
    toggleOnClickIntro: boolean

    buttonIconClass: string
    buttonIconOn: string
    buttonIconOff: string
    buttonTextOn: string
    buttonTextOff: string
}>(), {
    modelValue: false,
    title: '',
    icon: '',
    palette: '',
    class: '',
    contentClass: '',
    toggleMode: 'height',
    toggleTimeout: 0,
    toggleIconAtEnd: false,
    iconAtEnd: false,
    alwaysOpen: false,
    showActionButton: false,
    actionButtonClass: '',
    actionButtonText: '',
    actionButtonIcon: '',
    actionButtonResource: '',
    actionButtonConfirm: '',
    actionButtonConfirmData: () => ({}),
    actionButtonData: () => ({}),
    iconRotation: '90',
    minHeight: undefined,
    toggleOnClickIntro: false,
    buttonIconClass: '',
    buttonIconOn: '',
    buttonIconOff: '',
    buttonTextOn: '',
    buttonTextOff: '',
});

const isOpen = ref(props.modelValue),
    renderContent = ref(props.modelValue),
    contentInner = ref(null),
    contentInnerObserver = ref(null),
    contentInnerHeight = ref(0),
    atLeastToggledOnce = ref(false),
    contentInnerStyles = ref(''),
    blurLayerRequired = ref(false);

if (props.alwaysOpen && !isOpen.value) {
    isOpen.value = true;
}

if (isOpen.value) atLeastToggledOnce.value = true;

const classes = computed(() => {
        let r = [];

        if (props.palette) r.push(`lkt-accordion--${props.palette}`);
        if (props.class) r.push(props.class);
        if (isOpen.value) r.push('is-open');
        if (props.toggleIconAtEnd) r.push('icon-at-end');
        if (props.toggleMode) r.push(`toggle-mode--${props.toggleMode}`);
        if (props.iconRotation) r.push(`icon-rotation--${props.iconRotation}`);

        return r.join(' ');
    }),
    contentClasses = computed(() => {
        let r = [];
        if (blurLayerRequired.value && !isOpen.value) r.push('lkt-accordion-blur-layer');

        return r.join(' ');
    }),
    contentInnerClasses = computed(() => {
        let r = [];

        if (props.contentClass) r.push(props.contentClass);
        if (isOpen.value && renderContent.value) r.push('is-opened');

        return r.join(' ');
    }),
    contentInnerStyle = computed(() => {
        if (!isOpen.value) {
            if (typeof props.minHeight === 'undefined') return '';

        }
        return contentInnerStyles.value;
    }),
    computedLabel = computed(() => {
        if (props.title.startsWith('__:')) {
            return __(props.title.substring(3));
        }
        return props.title;
    }),
    hasToggleSlot = computed(() => {
        return !!Settings.toggleSlot;
    }),
    toggleSlot = computed(() => {
        return Settings.toggleSlot;
    }),
    computedButtonIcon = computed(() => isOpen.value ? props.buttonIconOn : props.buttonIconOff),
    computedButtonText = computed(() => isOpen.value ? props.buttonTextOn : props.buttonTextOff);

const toggle = () => {
        if (props.alwaysOpen) return;
        if (!isOpen.value && !atLeastToggledOnce.value) {
            atLeastToggledOnce.value = true;
        }
        isOpen.value = !isOpen.value
        calcContentStyle();
    },
    onClickReadMoreIntro = () => {
        if (props.toggleOnClickIntro) {
            toggle();
        }
    },
    onClickUserToggle = () => {
        toggle();
        emits('user-toggle', isOpen.value);
    };

watch(() => props.modelValue, (v) => isOpen.value = v);
watch(isOpen, (v) => {
    if (!v) {
        //@ts-ignore
        contentInnerHeight.value = Number(props.minHeight);
        setTimeout(() => {
            renderContent.value = true;
        }, 1)
    } else {
        //@ts-ignore
        contentInnerHeight.value = contentInner.value.clientHeight;
        setTimeout(() => {
            renderContent.value = true;
        }, 1)
    }
    emits('update:modelValue', v);
});
watch(atLeastToggledOnce, () => emits('first-open'));

const onClickActionButton = () => {
    emits('click-action-button', props.actionButtonData);
}

const calcContentStyle = () => {
    if (props.toggleMode === 'display') {
        return;
    }

    blurLayerRequired.value = false;

    if (!contentInner.value) return;

    let contentHeight = contentInner.value.offsetHeight,
        minHeight = Number(props.minHeight);
    let height = contentHeight;

    if (!isOpen.value && minHeight < contentHeight) {
        height = minHeight;
        blurLayerRequired.value = true;
    }

    contentInnerStyles.value = [
        'display: block',
        'height: ' + height + 'px',
    ].join(';');
}

onMounted(() => {
    nextTick(() => {
        //@ts-ignore
        contentInnerHeight.value = contentInner.value.clientHeight;

        const observer = new MutationObserver(() => {
            setTimeout(() => {
                calcContentStyle()
            }, props.toggleTimeout);
        });
        observer.observe(contentInner.value, {
            childList: true,
            subtree: true,
            attributes: true,
        });
        contentInnerObserver.value = observer;

        calcContentStyle();
    })
})

onMounted(() => {
    window.addEventListener('resize', calcContentStyle);
})

onBeforeUnmount(() => {
    if (typeof contentInnerObserver.value !== 'undefined') {
        contentInnerObserver.value.disconnect();
    }
    window.removeEventListener('resize', calcContentStyle);
})

if (slots['read-more-content']) {
    console.info('[LktAccordion] Using read-more-content slot');
}

if (slots['content-after-first-open']) {
    console.info('[LktAccordion] Using content-after-first-open slot');
}
</script>

<template>
    <div class="lkt-accordion-container">
        <div class="lkt-accordion" :class="classes">
            <header class="lkt-accordion-header" @click="onClickUserToggle">
                <div class="lkt-accordion-toggle" v-if="!toggleIconAtEnd && !alwaysOpen">
                    <template v-if="hasToggleSlot">
                        <component :is="toggleSlot" class="lkt-accordion-toggle-inner"
                                   :class="isOpen ? 'is-opened' : '' "/>
                    </template>
                    <div v-else class="lkt-accordion-toggle-inner lkt-accordion-toggle-triangle"
                         :class="isOpen ? 'is-opened' : '' "/>
                </div>

                <div class="lkt-accordion-title" v-if="!!slots.header || computedLabel.length > 0">
                    <template v-if="!!slots.header">
                        <slot name="header"/>
                    </template>
                    <template v-else-if="computedLabel.length > 0">
                        <i v-if="icon && !iconAtEnd" :class="icon"/>
                        {{ computedLabel }}
                        <i v-if="icon && iconAtEnd" :class="icon"/>
                    </template>
                </div>

                <div class="lkt-accordion-buttons"
                     v-if="showActionButton && (actionButtonText !== '' || actionButtonIcon !== '')">
                    <lkt-button
                        :class="actionButtonClass"
                        :confirm-data="actionButtonConfirmData"
                        :confirm-modal="actionButtonConfirm"
                        :icon="actionButtonIcon"
                        :resource="actionButtonResource"
                        :text="actionButtonText"
                        @click="onClickActionButton"
                    />
                </div>

                <div class="lkt-accordion-toggle" v-if="toggleIconAtEnd && !alwaysOpen">
                    <template v-if="hasToggleSlot">
                        <component :is="toggleSlot" class="lkt-accordion-toggle-inner"
                                   :class="isOpen ? 'is-opened' : '' "/>
                    </template>
                    <div v-else class="lkt-accordion-toggle-inner lkt-accordion-toggle-triangle"
                         :class="isOpen ? 'is-opened' : '' "/>
                </div>
            </header>
            <section class="lkt-accordion-content" :style="contentInnerStyle" :class="contentClasses">
                <div class="lkt-accordion-content-inner" ref="contentInner" :class="contentInnerClasses">
                    <template v-if="slots['intro']">
                        <section class="lkt-accordion-read-more-intro" @click="onClickReadMoreIntro">
                            <slot name="intro"/>
                        </section>
                    </template>
                    <template v-else-if="slots['read-more-content']">
                        <section class="lkt-accordion-read-more-intro" @click="onClickReadMoreIntro">
                            <slot name="read-more-content"/>
                        </section>
                    </template>

                    <template v-if="slots['lazy'] && atLeastToggledOnce">
                        <slot name="lazy"/>
                    </template>
                    <template v-else-if="slots['content-after-first-open'] && atLeastToggledOnce">
                        <slot name="content-after-first-open"/>
                    </template>
                    <slot v-else/>
                </div>
            </section>
        </div>
        <nav
            class="lkt-accordion-nav"
            v-if="computedButtonText !== '' || computedButtonIcon !== ''"
        >
            <lkt-button
                :class="buttonIconClass"
                :icon="computedButtonIcon"
                :text="computedButtonText"
                @click="onClickUserToggle"
            />
        </nav>
    </div>
</template>