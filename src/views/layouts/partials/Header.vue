<script setup lang="ts">
import logo from '@/assets/images/logo.svg';
</script>

<template>
  <el-row>
    <el-image
      class="header-logo pointer"
      :src="logo"
      alt="LOGO"
      loading="lazy"
      @click="$router.push({ name: 'home' })"
    />
  </el-row>
</template>
