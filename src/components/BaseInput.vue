<script lang="ts" setup>
defineProps<{
  modelValue: string | number;
  label?: string;
}>();
</script>
<template>
  <label v-if="label" class="font-medium">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
  />
</template>
