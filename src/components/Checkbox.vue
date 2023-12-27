<template>
  <div 
    class="flex items-center w-full cursor-pointer" 
    @click.prevent="() => {
      model = !model;
      $emit('update:modelValue', model)
    }"
  >
    <input
      :id="props.name"
      type="checkbox"
      :value="model"
      :name="props.name"
      class="hidden"
    />
    <span 
      :class="model ? 'border-blue-600 bg-blue-600' : 'border-neutral-300 bg-white'"
      class="mr-2 border rounded-sm block w-4 h-4"
    >
      <Check :class="model ? 'text-white' : 'hidden'" />
    </span>
    <label :for="props.name" class="text-xs leading-3">{{ props.label }}</label>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Check from '@/assets/icons/Check.vue'

const props = defineProps({
  label: String,
  name: String,
  modelValue: Boolean,
})
const model = ref(false)
</script>
