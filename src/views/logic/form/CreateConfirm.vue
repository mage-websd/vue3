<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useFormCreateStore } from '@/stores/list/create.store';
import router from '@/router';
import { resetStoreCofirmPage, sleep } from '@/helpers/fn';
import __ from '@/helpers/lang';

const formCreateStore = useFormCreateStore();
resetStoreCofirmPage(['form.create', 'form.create.confirm'], [formCreateStore]);

const loading = ref<boolean>(false);

onMounted(() => {
  if (!formCreateStore.form.email) {
    router.push({ name: 'form.create' });
    return;
  }
});

const onSubmit = async () => {
  loading.value = true;

  try {
    await sleep(2);
    alert(1);
    router.push({ name: 'home' });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="main-content page-form">
    <el-row class="describe-block">
      <el-col :span="24">
        <h1>{{ __('form.create_confirm_page_header') }}</h1>
      </el-col>
    </el-row>
    <el-row class="describe-block">
      <el-col :span="24" class="content-block">
        <div class="item-block">
          <label for="">{{ __('form.Email') }}:</label>
          <p>{{ formCreateStore.form.email }}</p>
        </div>
      </el-col>

      <el-col>
        <el-row class="r-group-btn">
          <el-button @click="$router.push({ name: 'form.create' })">{{
            __('common.Back')
          }}</el-button>
          <el-button type="primary" :loading="loading" @click="onSubmit">{{
            __('common.Submit')
          }}</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
