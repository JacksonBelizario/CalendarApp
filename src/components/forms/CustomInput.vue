<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  modelValue?: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value?: string): void;
}>();

const onInputChange = (input: HTMLInputElement): void => {
  emit("update:modelValue", input.value);
};

const chars = computed(() => (props.modelValue ? props.modelValue.length : 0));
</script>

<template>
  <label class="font-semibold text-gray-600 py-2">
    {{ label }} <abbr v-if="required" title="required">*</abbr>
  </label>
  <input
    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :maxlength="maxlength"
    @input="onInputChange($event.target as HTMLInputElement)"
  />
  <p v-if="required" class="text-red-500 text-xs hidden">
    Please fill out this field.
  </p>
  <p v-if="maxlength" class="text-xs text-gray-400 text-right my-3">
    {{ chars }} / {{ maxlength }}
  </p>
</template>
