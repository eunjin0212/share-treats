<template>
  <form @submit="handleSubmit" class="bg-white max-w-[382px] mx-auto mb-6 min-w-64 px-[30px] pt-[35px] pb-8 border border-main-light rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,.10);] -z-10 mobile:px-8 mobile:mb-[22px]">
    <div class="flex flex-col justify-center items-center mb-6">
      <h1 class="text-main text-2xl font-bold">Cek Transaksi</h1>
      <small class="text-gray-description mt-[10px]">e-wallet mu</small>
    </div>
    <div class="flex flex-col gap-2">
      <Input
        v-model="phone"
        type="text"
        icon="/assets/icons/telephone.svg"
        placeholder="No Telpon / ID Pelanggan"
        name="telephone"
      />
      <DatePicker
        v-model="date"
        name="date"
        placeholder="DD-MM-YYYY"
      />
      <div class="h-[50px] rounded bg-gray border border-neutral-300 flex justify-between items-center pl-[13px] pr-[21px] py-2">
        <Checkbox 
          v-model="reCaptcha"
          label="I'm not a robot"
          name="robot"
        />
        <img
          src="/assets/images/reCAPTCHA_logo.svg"
          alt="reCAPTCHA_logo"
          class="h-8"
        />
      </div>
    </div>
    <button 
      :disabled="!phone || !date || !reCaptcha" 
      type="submit" 
      class="w-full py-[14px] text-white bg-main opacity-100 rounded mt-[25px] disabled:opacity-60"
    >
      Cek Transaksi
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';
import Input from './Input.vue'
import DatePicker from './DatePicker.vue';


const phone = ref('')
const date = ref('')
const reCaptcha = ref(false)
function handleSubmit() {
  // submit
}


</script>
