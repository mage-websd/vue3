<script setup lang="ts">
import { getNumberFilter } from '@/helpers/fn';
import { onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash';
import PagerNumberInfo from './pagination/PagerNumberInfo.vue';
import __ from '@/helpers/lang';

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
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
  showOptionsElement: {
    type: Boolean,
    default: false,
  },
  filterInput: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(['update:filterInput', 'closed', 'opened', 'afterSubmit', 'clearFilter']);

const numberOfFilter = ref(0);
const showOptions = ref(false);
const loading = ref<boolean>(false);

const clickOutsideSearchCard = () => {
  if (showOptions.value && !props.showOptionsElement) {
    showOptions.value = false;
    onCloseFilterBox();
  }
};

const onClickFilterButton = async () => {
  showOptions.value = !showOptions.value;
  loading.value = false;
  if (!showOptions.value) {
    onCloseFilterBox();
  } else {
    onOpendFilterBox();
  }
};

const onSubmit = async () => {
  console.log(111, props.filterInput, props.store.filter);
  try {
    loading.value = true;
    showOptions.value = false;
    props.store.filter = cloneDeep(props.filterInput);
    props.store.paginator.page = 1;
    numberOfFilter.value = getNumberFilter(props.filterInput);
    await props.reloadDatatable();

    emit('afterSubmit');
    console.log(22222, props.filterInput, props.store.filter);
  } finally {
    loading.value = false;
  }
};

const onClearFilter = () => {
  emit('update:filterInput', {});
  emit('clearFilter');

  // wait for re-render component value
  setTimeout(() => {
    onSubmit();
  }, 10);
};

const onCloseFilterBox = () => {
  emit('closed', {});
};

const onOpendFilterBox = () => {
  emit('opened', {});
};

onMounted(async () => {
  emit('update:filterInput', props.store.filter);
  numberOfFilter.value = getNumberFilter(props.store.filter);
});
</script>

<template>
  <el-row class="table-filter-info" style="margin-top: 15px">
    <div v-click-outside="clickOutsideSearchCard" style="margin-right: 15px">
      <el-button
        type="primary"
        :number-filter="numberOfFilter"
        :is-icon-filter="true"
        @click="onClickFilterButton"
        >{{ __('common.Filter') }}</el-button
      >
      <el-row>
        <el-col :span="24">
          <div class="filter-option__wrapper">
            <el-card v-if="showOptions" class="filter-box-card">
              <el-form>
                <slot />

                <el-row justify="center" style="margin-top: 16px">
                  <el-button @click="onClearFilter">{{ __('common.Clear') }}</el-button>
                  <el-button type="primary" style="margin-right: 16px" @click="onSubmit">{{
                    __('common.Submit')
                  }}</el-button>
                </el-row>
              </el-form>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <PagerNumberInfo :total="total" :current-page="store.paginator.page" />
  </el-row>
</template>
