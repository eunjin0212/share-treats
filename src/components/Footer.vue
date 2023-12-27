<template>
  <footer class="relative bottom-0 left-0 bg-neutral-100 w-full py-[15px]">
    <aside class="flex px-5 pb-10 justify-center tablet:px-0 tablet:grid tablet:grid-cols-2">
      <div v-for="menu in menus" :key="menu.title" class="px-[15px] pt-[30px] w-1/6 min-w-24 mobile:w-full">
        <h4  class="text-lg text-main-font pb-[30px]" >
          {{ menu.title }}
        </h4>
        <ul v-for="sub in menu.children" :key="sub.title">
          <li class="ancestor-text">
            <a :href="sub.link" :target="sub.target" :alt="sub.name" class="inline-flex items-center gap-1">
              <img v-if="sub.icon" :src="sub.icon" :alt="sub.name" class="ancestor-icon">
              {{ sub.name }}
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="text-center font-roboto text-main-font px-[15px] text-sm">
      Hak Cipta SHARE TREATS. Hak Cipta dilindungi Undang-undang.
    </div>
  </footer>
</template>

<script setup>
const menus = [
  {
    title: 'Ikuti Kami',
    children: [
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/ShareTreatsID/',
        target: '_blank',
        icon: '/assets/icons/facebook_black.svg',
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/sharetreatsid/',
        target: '_blank',
        icon: '/assets/icons/instagram_black.svg',
      },
    ]
  },
  {
    title: 'Link',
    children: [
      {
        name: 'Tentang Perusahaan',
        link: '/links/aboutUs',
      },
      {
        name: 'Mitra Pedagang',
        link: '/links/merchant',
      },
    ]
  },
  {
    title: 'Bantuan',
    children: [
      {
        name: 'Customer Service',
        link: '/customer/customerService',
      },
      {
        name: 'Pertanyaan yang sering diajukan',
        link: '/customer/frequentlyAskedQuestions',
      },
    ]
  },
  {
    title: 'Ketentuan',
    children: [
      {
        name: 'Ketentuan Layanan',
        link: '/terms/termsOfService',
      },
      {
        name: 'Kebijakan Privacy',
        link: '/terms/privacyPolicy',
      },
    ],
  },
]

</script>
