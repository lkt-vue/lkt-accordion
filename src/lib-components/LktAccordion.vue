<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {Settings} from "../settings/Settings";
import {
    Accordion,
    AccordionConfig,
    AccordionType,
    ensureButtonConfig,
    extractI18nValue,
    getDefaultValues,
    LktSettings
} from "lkt-vue-kernel";

// Emits
const emits = defineEmits([
    'update:modelValue',
    'first-open',
    'click-action-button',
    'user-toggle'
]);

// Slots
const slots = useSlots();

// Props
const props = withDefaults(defineProps<AccordionConfig>(), getDefaultValues(Accordion));

const isOpen = ref(props.modelValue),
    renderContent = ref(props.modelValue),
    contentInner = ref(null),
    contentInnerObserver = ref(null),
    contentInnerHeight = ref(0),
    atLeastToggledOnce = ref(false),
    contentInnerStyles = ref(''),
    blurLayerRequired = ref(false);

const safeToggleButton = ref(ensureButtonConfig(props.toggleButton, LktSettings.defaultToggleButton));

watch(() => props.toggleButton, v => {
    safeToggleButton.value = ensureButtonConfig(v, LktSettings.defaultToggleButton);
}, { deep: true });

const classes = computed(() => {
        let r = [];

        if (props.class) r.push(props.class);
        if (isOpen.value) r.push('is-open');
        if (props.toggleButton?.iconEnd) r.push('icon-at-end');
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
    computedTitle = computed(() => {
        return extractI18nValue(props.title);
    }),
    hasToggleSlot = computed(() => {
        return !!Settings.toggleSlot;
    }),
    toggleSlot = computed(() => {
        return Settings.toggleSlot;
    }),
    computedShowActionButton = computed(() => {
        return typeof props.actionButton !== 'undefined' && Object.keys(props.actionButton).length > 0;
    }),
    computedShowToggleButton = computed(() => {
        return typeof props.toggleButton !== 'undefined' && Object.keys(props.toggleButton).length > 0;
    }),
    computedCanRenderDefaultSlot = computed(() => {
        if (props.type === AccordionType.Lazy) return atLeastToggledOnce.value;
        if (props.type === AccordionType.Ever) return isOpen.value;
        return true;
    });

const toggle = (skipIsOpenControl: boolean = false) => {
        if (props.type === AccordionType.Always) return;
        if (!isOpen.value && !atLeastToggledOnce.value) {
            atLeastToggledOnce.value = true;
        }
        if (!skipIsOpenControl) {
            isOpen.value = !isOpen.value
        }
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
    },
    onClickToggleButton = ($event?: PointerEvent|undefined) => {
        if (!$event) return;
        toggle(true);
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
    emits('click-action-button', props.actionButton?.resourceData);
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
    if (props.type === AccordionType.Always && !isOpen.value) {
        isOpen.value = true;
    }

    if (isOpen.value) atLeastToggledOnce.value = true;

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
    if (typeof contentInnerObserver.value !== 'undefined' && contentInnerObserver.value !== null) {
        contentInnerObserver.value.disconnect();
    }
    window.removeEventListener('resize', calcContentStyle);
})
</script>

<template>
    <div class="lkt-accordion-container">
        <div class="lkt-accordion" :class="classes">
            <header class="lkt-accordion-header" @click="onClickUserToggle">
                <div class="lkt-accordion-toggle" v-if="!toggleIconAtEnd && props.type !== AccordionType.Always">
                    <template v-if="hasToggleSlot">
                        <component :is="toggleSlot" class="lkt-accordion-toggle-inner"
                                   :class="isOpen ? 'is-opened' : '' "/>
                    </template>
                    <div v-else class="lkt-accordion-toggle-inner lkt-accordion-toggle-triangle"
                         :class="isOpen ? 'is-opened' : '' "/>
                </div>

                <div class="lkt-accordion-title" v-if="!!slots.header || computedTitle.length > 0">
                    <template v-if="!!slots.header">
                        <slot name="header"/>
                    </template>
                    <template v-else-if="computedTitle.length > 0">
                        <i v-if="icon && !iconAtEnd" :class="icon"/>
                        {{ computedTitle }}
                        <i v-if="icon && iconAtEnd" :class="icon"/>
                    </template>
                </div>

                <div class="lkt-accordion-buttons"
                     v-if="computedShowActionButton">
                    <lkt-button
                        v-bind="actionButton"
                        @click="onClickActionButton"
                    />
                </div>

                <div class="lkt-accordion-toggle" v-if="toggleIconAtEnd && props.type !== AccordionType.Always">
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

                    <template v-if="slots['lazy'] && atLeastToggledOnce">
                        <slot name="lazy"/>
                    </template>
                    <slot v-else-if="computedCanRenderDefaultSlot"/>
                </div>
            </section>
        </div>
        <nav
            class="lkt-accordion-nav"
            v-if="computedShowToggleButton"
        >
            <lkt-button
                v-bind="safeToggleButton"
                v-model:checked="isOpen"
                @click="onClickToggleButton"
            />
        </nav>
    </div>
</template>