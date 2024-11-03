<template>
  <div>
    <label
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      for=""
      v-if="props.label"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        @input="(event) => emits('update:modelValue', event.target.value)"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
      />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>
