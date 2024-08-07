<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {LktObject} from "lkt-ts-interfaces";
import {Settings} from "../settings/Settings";
import {__} from "lkt-i18n";

// Emits
const emits = defineEmits(['update:modelValue', 'first-open', 'click-action-button']);

// Slots
const slots = useSlots();

// Props
const props = withDefaults(defineProps<{
    modelValue: boolean
    title: string
    palette: string
    class: string
    contentClass: string
    toggleMode: 'transform' | 'height'
    toggleTimeout: number
    toggleIconAtEnd: boolean
    showActionButton: boolean
    actionButtonClass: string
    actionButtonText: string
    actionButtonIcon: string
    actionButtonResource: string
    actionButtonConfirm: string
    actionButtonConfirmData: LktObject
    actionButtonData: LktObject
}>(), {
    modelValue: false,
    title: '',
    palette: '',
    class: '',
    contentClass: '',
    toggleMode: 'height',
    toggleTimeout: 0,
    toggleIconAtEnd: false,
    showActionButton: false,
    actionButtonClass: '',
    actionButtonText: '',
    actionButtonIcon: '',
    actionButtonResource: '',
    actionButtonConfirm: '',
    actionButtonConfirmData: () => ({}),
    actionButtonData: () => ({}),
});

const isOpen = ref(props.modelValue),
    renderContent = ref(props.modelValue),
    contentInner = ref(null),
    contentInnerObserver = ref(null),
    contentInnerHeight = ref(0),
    atLeastToggledOnce = ref(false),
    contentInnerStyles = ref('');

if (isOpen.value) atLeastToggledOnce.value = true;

const classes = computed(() => {
        let r = [];

        if (props.palette) r.push(`lkt-accordion--${props.palette}`);
        if (props.class) r.push(props.class);
        if (isOpen.value) r.push('is-open');
        if (props.toggleMode) r.push(`toggle-mode--${props.toggleMode}`);

        return r.join(' ');
    }),
    contentInnerClasses = computed(() => {
        let r = [];

        if (props.contentClass) r.push(props.contentClass);
        if (renderContent.value) r.push('is-opened');

        return r.join(' ');
    }),
    contentInnerStyle = computed(() => {
        if (!isOpen.value) return '';
        return contentInnerStyles.value;
        // return 'max-height: ' + contentInnerHeight.value;
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
    });

const toggle = () => {
    if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
    }
    isOpen.value = !isOpen.value
    calcContentStyle();
};

watch(() => props.modelValue, (v) => isOpen.value = v);
watch(isOpen, (v) => {
    if (!v) {
        renderContent.value = false;
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
    const rect = contentInner.value.getBoundingClientRect();
    contentInnerStyles.value = [
        'display: block',
        'height: ' + contentInner.value.offsetHeight + 'px',
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
    })
})

onMounted(() => {
    window.addEventListener('resize', calcContentStyle);
})

onBeforeUnmount(() => {
    contentInnerObserver.value.disconnect();
    window.removeEventListener('resize', calcContentStyle);
})
</script>

<template>
    <div class="lkt-accordion" :class="classes">
        <header class="lkt-accordion-header" @click="toggle">

            <template v-if="!!slots.header">
                <slot name="header"/>
            </template>

            <template v-else>
                <div class="lkt-accordion-toggle" v-if="!toggleIconAtEnd">
                    <template v-if="hasToggleSlot">
                        <component :is="toggleSlot" class="lkt-accordion-toggle-inner" :class="isOpen ? 'is-opened' : '' "/>
                    </template>
                    <div v-else class="lkt-accordion-toggle-inner lkt-accordion-toggle-triangle" :class="isOpen ? 'is-opened' : '' "/>
                </div>

                <div class="lkt-accordion-title" v-if="computedLabel.length > 0">
                    {{computedLabel}}
                </div>

                <div class="lkt-accordion-buttons" v-if="showActionButton && (actionButtonText !== '' || actionButtonIcon !== '')">
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

                <div class="lkt-accordion-toggle" v-if="toggleIconAtEnd">
                    <template v-if="hasToggleSlot">
                        <component :is="toggleSlot" class="lkt-accordion-toggle-inner" :class="isOpen ? 'is-opened' : '' "/>
                    </template>
                    <div v-else class="lkt-accordion-toggle-inner lkt-accordion-toggle-triangle" :class="isOpen ? 'is-opened' : '' "/>
                </div>
            </template>
        </header>
        <section class="lkt-accordion-content" :style="contentInnerStyle">
            <div class="lkt-accordion-content-inner" ref="contentInner" :class="contentInnerClasses">
                <template v-if="slots['content-after-first-open'] && atLeastToggledOnce">
                    <slot name="content-after-first-open"/>
                </template>
                <slot v-else/>
            </div>
        </section>
    </div>
</template>