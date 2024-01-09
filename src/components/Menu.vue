<template>
  <nav class="flex w-2/3 justify-between items-center">
    <ul class="flex flex-row flex-nowrap w-1/2 justify-center mobile:flex-col mobile:w-full">
      <li class="h-0 w-0 hidden mobile:flex mobile:h-auto mobile:w-full mobile:bg-main mobile:px-[10px]">
        <a target="_blank" href="https://www.facebook.com/ShareTreatsID/">
          <img src="/assets/icons/facebook_white.svg" alt="facebook" class="h-[38px] object-cover py-[10px] px-2">
        </a>
        <a target="_blank" href="https://www.instagram.com/sharetreatsid//">
          <img src="/assets/icons/instagram_white.svg" alt="instagram" class="h-[38px] object-cover px-[10px] py-1.5">
        </a>
      </li>
      <li v-for="menu in menus" :key="menu.name" :class="menu.class">
        <a :href="menu.link" :title="menu.title">{{ menu.name }}</a>
      </li>
    </ul>
    <SignInOut />
  </nav>
</template>

<script setup>
import SignInOut from './SignInOut.vue'

const menus = [
  {
    name: 'Home',
    link: '/',
    title: 'home',
    class: 'hidden mobile:block menu',
  },
  {
    name: 'Petunjuk Penggunaan',
    link: '/how_it_work',
    title: 'how it work',
    class: 'menu whitespace-nowrap',
  },
  {
    name: 'Kategori',
    link: '/category',
    title: 'category',
    class: 'menu',
  },
  {
    name: 'Brands',
    link: '/partners',
    title: 'partners',
    class: 'menu',
  },
]

</script>
