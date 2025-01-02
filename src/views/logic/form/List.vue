<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Pagination from '@/views/components/pagination/Pagination.vue';
import { userFormListFilterStore } from '@/stores/list/list.store';
import { PAGE_LIMIT } from '@/helpers/constants';
import type { IListFilter } from '@/api/list/interface';
import { sleep } from '@/helpers/fn';
import __ from '@/helpers/lang';
import FilterList from '@/views/components/FilterList.vue';

const store = userFormListFilterStore();
const tableData = ref<Array<any>>([]);
const tableDataTotal = ref<number>(0);
const initLoad = ref<boolean>(false);
const filterInput = ref<IListFilter>({} as IListFilter);
const showOptionsElement = ref(false);

const mock = (from?: number, to?: number) => {
  const result = [];

  if (!from) {
    from = 1;
  }

  if (!to) {
    to = 100;
  }

  for (let i = from; i <= to; i++) {
    result.push({
      id: i,
      email: `email${i}@example.com`,
    });
  }

  return result;
};

const getApiData = async () => {
  initLoad.value = true;
  try {
    await sleep(1);
    const offset = (store.paginator.page - 1) * PAGE_LIMIT;
    tableData.value = mock(offset, offset + PAGE_LIMIT);
    tableDataTotal.value = 1000;
  } catch (_e) {
    tableData.value = [];
  } finally {
    initLoad.value = false;
  }
};

onMounted(async () => {
  await getApiData();
});
</script>

<template>
  <div class="main-content page-list">
    <el-row>
      <el-col :span="24">
        <h1>{{ __('form.form_list') }}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-loading="initLoad" :span="24">
        <FilterList
          v-model:filter-input="filterInput"
          :total="tableDataTotal.valueOf()"
          :reload-datatable="getApiData"
          :store="store"
          :show-options-element="showOptionsElement"
        >
          <el-form-item label="Email">
            <el-input v-model="filterInput.email" maxlength="255" placeholder="Email" />
          </el-form-item>
        </FilterList>

        <el-table :data="tableData" style="width: 100%">
          <template #empty>
            {{ __('common.empty_data') }}
          </template>
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column label="Email">
            <template #default="scope">
              <p>{{ scope.row.email }}</p>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total="tableDataTotal.valueOf()"
          :reload-datatable="getApiData"
          :store="store"
        />
      </el-col>
    </el-row>
  </div>
</template>
