<script setup lang="ts">
import {computed, ref, useSlots, watch} from "vue";

// Emits
const emits = defineEmits(['update:modelValue']);

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

const isOpen = ref(props.modelValue);
const classes = computed(() => {
    let r = [];

    if (props.palette) r.push(`lkt-accordion--${props.palette}`);
    if (isOpen.value) r.push('is-open');

    return r.join(' ');
});

const toggle = () => isOpen.value = !isOpen.value;

watch(() => props.modelValue, (v) => isOpen.value = v);
watch(isOpen, (v) => emits('update:modelValue', v));
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
        <slot/>
    </section>
</div>
</template>

<style scoped>

</style>