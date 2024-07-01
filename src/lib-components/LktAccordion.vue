<script setup lang="ts">
import {computed, ref, useSlots, watch} from "vue";

// Emits
const emits = defineEmits(['update:modelValue', 'first-open']);

// Slots
const slots = useSlots();

// Props
const props = withDefaults(defineProps<{
    modelValue: boolean
    title: string
    palette: string
    class: string
    contentClass: string
}>(), {
    modelValue: false,
    title: '',
    palette: '',
    class: '',
    contentClass: '',
});

const isOpen = ref(props.modelValue),
    atLeastToggledOnce = ref(false);
if (isOpen.value) atLeastToggledOnce.value = true;

const classes = computed(() => {
    let r = [];

    if (props.palette) r.push(`lkt-accordion--${props.palette}`);
    if (props.class) r.push(props.class);
    if (isOpen.value) r.push('is-open');

    return r.join(' ');
});

const toggle = () => {
    if (!isOpen.value && !atLeastToggledOnce.value) {
        atLeastToggledOnce.value = true;
    }
    isOpen.value = !isOpen.value
};

watch(() => props.modelValue, (v) => isOpen.value = v);
watch(isOpen, (v) => emits('update:modelValue', v));
watch(atLeastToggledOnce, () => emits('first-open'));
</script>

<template>
<div class="lkt-accordion" :class="classes">
    <header class="lkt-accordion-header" @click="toggle">
        <template v-if="!!slots.header">
            <slot name="header"/>
        </template>
        <template v-else>
            {{ title }}
            <template v-if="slots['icon']">
                <slot name="icon"/>
            </template>
            <div v-else data-role="icon"></div>
        </template>
    </header>
    <section class="lkt-accordion-content" :class="contentClass" v-show="isOpen">
        <template v-if="slots['content-after-first-open'] && atLeastToggledOnce">
            <slot name="content-after-first-open"/>
        </template>
        <slot v-else/>
    </section>
</div>
</template>