<script setup lang="ts">
import __ from '@/helpers/lang';
</script>

<template>
  <div class="page-error">
    <div>
      <p class="pe-title">
        <span class="big">404</span>
        <span class="small">Not Found</span>
      </p>

      <div class="footer-btn">
        <el-button type="primary" @click="$router.push({ name: 'home' })">{{
          __('common.Home')
        }}</el-button>
      </div>
    </div>
  </div>
</template>
