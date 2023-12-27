<template>
  <div class="relative border border-neutral-200 rounded w-full h-12 p-0 mobile:h-[50px]">
    <img
      src="/assets/icons/date.svg"
      alt="icon"
      class="pl-3 py-[14px]"
    />
    <label
      class="absolute left-[2.7rem] z-0 top-4 h-4 leading-4 text-xs select-none"
      :class="{ 'text-gray-input': !model }"
    >
      {{ model || props.placeholder }}
    </label>
    <input
      type="date"
      :name="props.name"
      class="absolute top-0 z-10 opacity-0 border-0 focus:ring-0 focus-visible:outline-0 w-full h-full pr-3 py-0 pl-[13px] m-0 text-xs"
      v-model="date"
      @change="handleDate"
    /> 
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  placeholder: String,
  name: String,
  modelValue: String,
})

const model = ref(props.modelValue);

const emits = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  model.value = newValue
})

const date = ref('')
function handleDate(event) {
  if(!event.target.value) {
    emits('update:modelValue', '')
    return;
  }
  const dateArray = event.target.value.split('-')

  const date = dateArray[2]
  const month = dateArray[1]
  const year = dateArray[0]
  emits('update:modelValue', `${date}-${month}-${year}`)
}
</script>
