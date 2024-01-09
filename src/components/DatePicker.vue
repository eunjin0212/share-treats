<template>
  <div class="border flex items-center border-neutral-200 rounded w-full h-12 p-0 mobile:h-[50px]">
    <img
      src="/assets/icons/date.svg"
      alt="icon"
      class="pl-3 py-[14px]"
    />
    <label
      class="relative left-0 pl-3 z-0 top-0 h-hull w-full leading-[3rem] text-xs select-none"
      :class="{ 'text-gray-input': !model }"
    >
      {{ model || props.placeholder }}
      <input
        type="date"
        :name="props.name"
        class="absolute top-0 left-0 z-0 px-0 h-full border-0 opacity-0 focus:ring-0 focus-visible:outline-0 w-full py-0 m-0 text-xs"
        v-model="date"
        @change="handleDate"
        :min="limitDate"
      /> 
    </label>
  </div>
</template>

<script setup>
import dateFormat from '@/modules/dateFormat'
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

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

const limitDate = computed(() => {
  const today = new Date()
  const daysAgo = 30; 
  const resultDate = new Date(today - (3600000 * 24 * daysAgo))
  return dateFormat(resultDate)
})
</script>
