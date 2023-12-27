<template>
  <div class="relative border border-neutral-200 rounded w-full h-12 flex items-center px-3 py-[14px] mobile:h-[50px]">
    <img :src="props.icon" alt="icon" class="pr-[13px]" />
    <input
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :data-type="props.type"
      class="border-0 focus:ring-0 focus-visible:outline-0 w-full p-0 text-xs placeholder:text-gray-input"
      v-model="model"
      @input="$emit('update:modelValue', model)"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  placeholder: String,
  icon: String,
  name: String,
  type: HTMLInputElement['type'],
  modelValue: String,
})

const model = ref(props.modelValue);
</script>
