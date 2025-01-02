<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import type { IFormCreate } from '@/api/list/interface';
import { useFormCreateStore } from '@/stores/list/create.store';
import { useFormRules } from './validate/form.rule';
import router from '@/router';
import { resetStoreCofirmPage, sleep } from '@/helpers/fn';
import { useRoute } from 'vue-router';
import __ from '@/helpers/lang';

const formCreateStore = useFormCreateStore();
const route = useRoute();
const loading = ref<boolean>(false);
resetStoreCofirmPage(['form.create', 'form.create.confirm'], [formCreateStore]);

const rules = useFormRules();
const form = ref<FormInstance>({} as FormInstance);
const formInput = reactive<IFormCreate>(formCreateStore.form);

onMounted(() => {
  if (route.query?.email) {
    formInput.email = String(route.query.email);
  }
});

const onSubmit = async () => {
  form.value?.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    await sleep(1);
    formCreateStore.form = formInput;
    router.push({ name: 'form.create.confirm' });
  });
};
</script>

<template>
  <div class="main-content page-form">
    <el-row class="describe-block mgb12">
      <el-col :span="24">
        <h1>{{ __('form.create_page_header') }}</h1>
      </el-col>
    </el-row>
    <el-row class="describe-block">
      <el-form ref="form" style="width: 100%" :model="formInput" :rules="rules">
        <el-form-item label="Email" prop="email">
          <el-input v-model="formInput.email" placeholder="soda@example.com"></el-input>
        </el-form-item>

        <el-row class="r-group-btn">
          <el-button @click="$router.push({ name: 'home' })">{{ __('common.Back') }}</el-button>
          <el-button type="primary" :loading="loading" @click="onSubmit">{{
            __('common.Confirm')
          }}</el-button>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
