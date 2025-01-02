<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/auth.store';
import __ from '@/helpers/lang';

const authStore = useAuthStore();

onMounted(async () => {
  authStore.checkAuth();
});
</script>

<template>
  <div class="main-content page-home">
    <el-row v-if="authStore.isAuth" class="center">
      <el-button type="primary" @click="authStore.login()">{{ __('common.Login') }}</el-button>
    </el-row>
    <el-row v-else class="ph-btn-list">
      <el-col :span="24" class="item">
        <el-button type="primary" @click="$router.push({ name: 'form.list' })">{{
          __('form.form_list')
        }}</el-button>
      </el-col>
      <el-col :span="24" class="item">
        <el-button type="primary">Menu2</el-button>
      </el-col>
    </el-row>
  </div>
</template>
