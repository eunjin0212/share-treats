<template>
  <div class="border flex items-center border-neutral-200 rounded w-full h-12 p-0 mobile:h-[50px]">
    <img
      src="/assets/icons/date.svg"
      alt="icon"
      class="pl-3 py-[14px]"
    />
    <VueDatePicker
      v-model="date"
      name="date"
      class="flex h-full date-picker-component"
      model-type="dd-MM-yyyy"
      format="dd-MM-yyyy"
      preview-format="dd-MM-yyyy"
      :min-date="limitDate"
      :placeholder="props.placeholder"
      hide-input-icon
      auto-apply
      input-class-name="h-full border-0 text-xs focus:ring-0 focus-visible:outline-0 placeholder:text-gray-input placeholder:opacity-[1]"
      @update:model-value="handleDate"
      :enable-time-picker="false"
      :action-row="{
        showNow: false,
        showPreview: false,
        showSelect: false,
        showCancel: false,
      }"
    />
  </div>
</template>

<script setup>
import dateFormatWithStartYear from '@/modules/dateFormat'
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  placeholder: String,
  name: String,
  modelValue: String,
  limited: Number,
})

const model = ref(props.modelValue);

const emits = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
  model.value = newValue
})

const date = ref('')
function handleDate(value) {
  if (!value) {
    emits('update:modelValue', '')
    return;
  }

  emits('update:modelValue', value)
}

const limitDate = computed(() => {
  const today = new Date()
  const daysAgo = props.limited || 30;
  const resultDate = new Date(today - (3600000 * 24 * daysAgo))
  return dateFormatWithStartYear(resultDate)
})
</script>
<style lang="scss">
.date-picker-component {
  >div {
    width: 100%;

    >.dp__input_wrap {
      height: 100%;
    }
  }
}
</style>