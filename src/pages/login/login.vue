<template>
  <section>
    <Header />
    <main class="bg-gray-back pt-20 mobile:pt-[10px]">
      <LoginForm />
      <Table
      title="Cek Transaksi"
      :cols="colunms"
      :rows="rows"
      :pagination="pagination"
      @update:pagination="(pageInfo) => pagination = pageInfo"
      />
    </main>
    <Footer />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/LoginForm.vue'
import Table from '@/components/Table.vue'
import res from '@/mock/table.json'

const colunms = [
  {
    name: 'Tgl Transaksi',
    field: 'date',
  },
  {
    name: 'Nama Agen',
    field: 'namaAgen',
  },
  {
    name: 'Produk',
    field: 'produk',
  },
  {
    name: 'Denom',
    field: 'denom',
  },
  {
    name: 'Tujuan',
    field: 'tujuan',
  },
  {
    name: 'Status',
    field: 'status',
  },
  {
    name: 'Serial Number',
    field: 'serialNumber',
  },
  {
    name: 'ID Transaksi',
    field: 'idTransaksi',
  },
];

const getLastPage = () => (Math.ceil(rows.value.length / 10))

const rows = ref([]);
const pagination = ref({
  page: 1,
  lastPage: getLastPage(),
  perPage: 10,
  total: rows.value.length,
})

async function getTableData() {
  try {
    // const res = await axios.get('')
    rows.value = res.data;
    pagination.value = {
      ...pagination.value,
      lastPage: getLastPage(),
      total: rows.value.length,
    }
  } catch (error) {
    console.error(error);
  }
}
getTableData();

window.addEventListener('resize', () => {
  pagination.value.page = 1;
})
</script>
