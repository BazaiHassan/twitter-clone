<template>
  <NuxtLink
    to="#"
    class="flex items-center text-black rounded-full p-3 w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="w-6 h-6 text-dark">
      <slot name="icon"></slot>
    </div>
    <div class="ml-2 hidden xl:block" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </NuxtLink>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>
