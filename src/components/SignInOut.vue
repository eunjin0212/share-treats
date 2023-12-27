<template>
  <ul class="flex flex-row w-1/2 justify-end items-center mobile:flex-col mobile:w-full mobile:items-start mobile:py-[7px] mobile:px-5">
    <li v-if="!props.isLogin" class="mobile:w-full">
      <a 
        href="#" 
        @mouseenter.prevent="isHover = true" 
        @mouseleave.prevent="isHover = false" 
        @click="faceBookSignIn" 
        class="flex items-center p-[10px] bg-facebook text-white rounded ease-in-out duration-500 border border-facebook hover:bg-white hover:text-facebook mobile:w-full mobile:justify-center mobile:py-[13px]"
      >
        <img v-if="!isHover" src="/assets/icons/facebook_white.svg" alt="sign in" class="rounded-full w-4 h-4 object-cover mr-1">
        <img v-else src="/assets/icons/facebook_blue.svg" alt="sign in" class="rounded-full w-4 h-4 object-cover mr-1">
        <span class="text-[15px] leading-[15px]">Masuk dengan Facebook</span>
      </a>
    </li>
    <template v-else>
      <li class="px-4 text-main-font hover:text-main border-r border-r-neutral-200 mobile:border-0">
        <a href="/my_account" alt="my account">
          Profil Saya
        </a>
      </li>
      <li class="hidden mobile:block">
        <a href="/myAccount/notice">
          Notifikasi (<span class="notice_size">0</span>)
        </a>
      </li>
      <li class="px-4 text-main-font hover:text-main">
        <button @click="signOut">
          Keluar
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { faceBookSignIn, signOut } from '@/hooks/useSignInOut.js'

const props = defineProps({
  isLogin: Boolean, // 로그인 여부
})
const isHover = ref(false)
</script>
