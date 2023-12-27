<template>
  <div class="flex w-full justify-center">
    <div
      class="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white mobile:hidden"
      aria-label="Pagination"
    >
      <button
        class="page-icon rounded-l-md opacity-100 disabled:opacity-60"
        @click="handlePage('prev')"
        :disabled="current === 1"
      >
        <ArrowLeft />
      </button>
      <button
        v-for="page in pages"
        :key="page"
        :aria-current="page === props.modelValue.page && 'page'"
        :class="page === props.modelValue.page
          ? 'current-page' : page === '...'
            ? 'ellipsis-page' : 'nomal-page'
          "
        @click="page !== '...' && updatePage(page)"
      >
        {{ page }}
      </button>
      <button
        class="page-icon rounded-r-md opacity-100 disabled:opacity-60"
        @click="handlePage('next')"
        :disabled="current === props.modelValue.lastPage"
      >
        <ArrowRight />
      </button>
    </div>
    <div class="hidden mobile:flex w-full justify-between items-center p-4">
      <button
        @click="handlePage('prev')"
        class="list-pagination"
        :disabled="current === 1"
      >
        Previous
      </button>
      <button
        @click="handlePage('next')"
        class="list-pagination"
        :disabled="current === props.modelValue.lastPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import ArrowRight from '@/assets/icons/ArrowRight.vue';
import ArrowLeft from '@/assets/icons/ArrowLeft.vue';

/** 
 * @type { page: number; lastPage: number; limit: number; total: number; } pagination
*/
const props = defineProps({
  modelValue: Object,
})
const current = ref(props.modelValue.page)

// NOTE: 참고 https://github.com/mui/material-ui/blob/v5.15.1/packages/mui-material/src/usePagination/usePagination.js
const pages = computed(() => {
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  const boundaryCount = 2;
  const siblingCount = 1;
  const count = props.modelValue.lastPage;
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  const siblingsStart = Math.max(
    Math.min(
      // natural start
      current.value - siblingCount,
      // lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // natural end
      current.value + siblingCount,
      // upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  return [
    ...startPages,

    // start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ['...']
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // sibling pages
    ...range(siblingsStart, siblingsEnd),

    // end ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['...']
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
  ]
})

watch(() => props.modelValue, (newValue) => {
  current.value = newValue.page;
}, { deep: true })

const emits = defineEmits(['update:modelValue']);

/**
 * @param {number} page 
*/
function updatePage(page) {
  emits('update:modelValue', { ...props.modelValue, page });
}

/**
 * @param {'prev' | 'next'} direction 
*/
function handlePage(direction) {
  if (direction === 'next') {
    emits('update:modelValue', { ...props.modelValue, page: ++current.value });

    return;
  }

  emits('update:modelValue', { ...props.modelValue, page: --current.value });
}

</script>
