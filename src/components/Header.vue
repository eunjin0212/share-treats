<template>
  <header class="h-[70px] w-full z-50 bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,.2)] flex justify-between items-center sticky top-0 left-0 px-[52px] mobile:h-[50px] mobile:px-5 mobile:border mobile:border-b-gray-light mobile:shadow-none">
    <!-- Logo -->
    <div class="w-fit inline-flex items-center">
      <a href="/">
        <img class="h-[57px] mobile:h-10" src="/assets/images/share_treats_logo.png" alt="share_treats_logo">
      </a>
    </div>

    <!-- PC Menu -->
    <Menu class="mobile:hidden mobile:h-0 mobile:w-0" />

    <!-- Mobile Menu Button  -->
    <button @click="isOpen = !isOpen" class="hidden h-0 w-0 cursor-pointer mobile:block mobile:h-auto mobile:w-8">
      <img v-if="!isOpen" src="/assets/icons/bar.svg" alt="menu_open" />
      <img v-else src="/assets/icons/close.svg" alt="menu_close" />
    </button>
  </header>
  <!-- Mobile Menu -->
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <Menu
    class="hidden mobile:duration-300 mobile:transition-all mobile:relative mobile:left-0 mobile:z-10 mobile:w-full mobile:bg-white mobile:flex mobile:flex-col" 
    :class="isOpen ? 'top-0 h-auto' : 'top-[-316px] h-0'"
  />
</template>

<script setup>
import { ref } from 'vue'
import Menu from './Menu.vue'

const isOpen = ref(false)
</script>
