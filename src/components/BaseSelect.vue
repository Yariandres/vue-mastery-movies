<script setup lang="ts">
defineProps<{
  modelValue: string | number;
}>();
</script>
<template>
  <select
    class="border border-gray-300 rounded-md px-2"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
  >
    <option value="">All Genres</option>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Comedy">Comedy</option>
    <option value="Drama">Drama</option>
    <option value="Fantasy">Fantasy</option>
    <option value="Horror">Horror</option>
    <option value="Mystery">Mystery</option>
    <option value="Thriller">Thriller</option>
  </select>
</template>
