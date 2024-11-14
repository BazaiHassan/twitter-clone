<template>
  <div class="flex items-center ml-4 text-gray-400 cursor-pointer group">
    <div
      :class="`${defaultTransition} p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400`"
    >
      <slot name="icon" classes="w-5 h-5" />
    </div>
    <span
      :class="`ml-1 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20`"
    >
      <slot />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});

const { defaultTransition } = useTailwindConfig();
</script>
