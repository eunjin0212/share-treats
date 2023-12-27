<template>
  <div class="p-[130px] pt-5 mobile:p-0">
    <div class="mobile:px-2">
      <h1 class="text-main text-2xl font-medium mobile:ml-[14px]">{{ props.title }}</h1>
      <div class="bg-gray-separator w-full h-[2px] mt-3 mb-5 mobile:mt-2 mobile:mb-3"></div>
    </div>
    <div class="min-h-[451px] mb-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mobile:hidden">
      <table class="w-full">
        <thead>
          <tr>
            <th
              v-for="col in cols"
              :key="col.field"
              class="bg-gray-thead font-semibold text-left table-item"
            >
              {{ col.name }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(row, idx) in tableData"
            :key="idx"
            class="max-h-10"
          >
            <td
              v-for="col in cols"
              :key="col.field"
              class="max-h-10 table-item"
            >
              {{ row[col.field] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul
      class="hidden mobile:block pl-5 pr-[10px] py-5 bg-white border-t last-of-type:border-b border-gray-table"
      v-for="(row, idx) in tableData"
      :key="idx"
    >
      <li
        v-for="(col) in cols"
        :key="col.field"
        class="font-medium text-sm mb-2 last-of-type:mb-0 flex gap-2"
      >
        <span class="inline-block text-gray-data-head w-1/3 flex-grow">
          {{ col.name }}
        </span>
        <span class="text-gray-data break-all w-2/3 flex-grow-0 text-left">
          {{ row[col.field] }}
        </span>
      </li>
    </ul>

    <Pagination
      :modelValue="props.pagination"
      @update:modelValue="(pageInfo) => $emit('update:pagination', pageInfo)"
    />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import Pagination from './Pagination.vue';

/** 
 * @type { [cols.field]: any; class?: string; }[] rows
 * @type { name: string; field: string; class?: string; }[] cols
 * @type { page: number; lastPage: number; perPage: number; total: number; } pagination
*/

const props = defineProps({
  title: String,
  rows: Array,
  cols: Array,
  pagination: Object,
})

const tableData = computed(() => {
  const offset = (props.pagination.page - 1) * props.pagination.perPage
  return props.rows.slice(offset, offset + props.pagination.perPage)
})
</script>
