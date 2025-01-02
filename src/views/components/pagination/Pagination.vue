<template>
  <div v-if="showPagination" class="block-pagination">
    <button
      :class="['btn-icon', 'btn-icon-left', disableBtnFirstPage ? 'btn-disable' : '']"
      :disabled="disableBtnFirstPage"
      @click="handleFirstPage"
    >
      <fa :icon="['fas', 'angle-left']" />
    </button>

    <el-pagination
      :current-page="store.paginator.page"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      prev-text="Prev"
      next-text="Next"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <button
      :class="['btn-icon', 'btn-icon-right', disableBtnLastPage ? 'btn-disable' : '']"
      :disabled="disableBtnLastPage"
      @click="handleLastPage"
    >
      <fa :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { PAGE_LIMIT } from '@/helpers/constants';

// Define props
const props = defineProps({
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: PAGE_LIMIT },
  reloadDatatable: {
    type: Function,
    default: null,
  },
  store: {
    type: Object,
    default() {
      return {};
    },
  },
});

// Define emits
const emit = defineEmits<{
  (e: 'onChange', payload: { pageSize: number; currentPage: number }): void;
}>();

// Reactive state
const disableBtnFirstPage = ref(true);
const disableBtnLastPage = ref(false);

// Computed properties
const showPagination = computed(() => Math.ceil(props.total / props.pageSize) > 1);

const lastPage = () => {
  return Math.ceil(props.total / props.pageSize);
};

const checkDisableFistLastPage = (val: number) => {
  const lp = lastPage();
  disableBtnFirstPage.value = val <= 1;
  disableBtnLastPage.value = val >= lp && val !== 1;
};

// Function to handle page change
const handleCurrentChange = async (val: number) => {
  checkDisableFistLastPage(val);

  if (props.store && props.store.paginator && typeof props.store.$patch === 'function') {
    props.store.$patch({
      paginator: {
        page: val,
      },
    });
  }

  await props.reloadDatatable();

  // Trigger event to call API data list
  emit('onChange', {
    pageSize: props.pageSize,
    currentPage: val,
  });
};

// Function to handle last page
const handleLastPage = () => {
  handleCurrentChange(lastPage());
};

// Function to handle first page
const handleFirstPage = () => {
  handleCurrentChange(1);
};

// Watchers
watch(
  () => props.store.paginator?.page,
  (newVal) => {
    if (newVal === 1) {
      checkDisableFistLastPage(newVal);
    }
  },
  { immediate: true },
);

watch(
  () => props.total,
  (newVal) => {
    if (newVal !== 1) {
      checkDisableFistLastPage(props.store.paginator.page);
    }
  },
  { immediate: true },
);

onMounted(() => {
  checkDisableFistLastPage(props.store.paginator.page);
});
</script>
