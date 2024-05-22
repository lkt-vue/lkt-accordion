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
}>(), {
    modelValue: false,
    title: '',
    palette: '',
});

const isOpen = ref(props.modelValue),
    atLeastToggledOnce = ref(false);
if (isOpen.value) atLeastToggledOnce.value = true;

const classes = computed(() => {
    let r = [];

    if (props.palette) r.push(`lkt-accordion--${props.palette}`);
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
            <div data-role="icon"></div>
        </template>
    </header>
    <section class="lkt-accordion-content" v-show="isOpen">
        <template v-if="slots['content-after-first-open'] && atLeastToggledOnce">
            <slot name="content-after-first-open"/>
        </template>
        <slot v-else/>
    </section>
</div>
</template>

<style scoped>

</style>