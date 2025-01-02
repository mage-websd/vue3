<template>
  <div v-if="total > 0" class="datatable-info">
    total {{ total }} from {{ displayedItemsStart }} to {{ displayedItemsEnd }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PAGE_LIMIT } from '@/helpers/constants';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: PAGE_LIMIT,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const displayedItemsStart = computed(() => {
  return props.total > 0 ? (props.currentPage - 1) * props.pageSize + 1 : 0;
});

const displayedItemsEnd = computed(() => {
  const end = props.currentPage * props.pageSize;
  return end > props.total ? props.total : end;
});
</script>
