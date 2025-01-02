<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthHeader from './partials/AuthHeader.vue';
import Footer from './partials/Footer.vue';
import Breadcrumb from './partials/Breadcrumb.vue';
import { useLoadingStore } from '@/stores/loading.store';

const loadingStore = useLoadingStore();
</script>

<template>
  <el-container class="page-container layout-auth">
    <el-header class="jheader">
      <AuthHeader />
    </el-header>

    <Breadcrumb />

    <el-main v-loading="loadingStore.loading" class="jmain">
      <div class="main">
        <RouterView />
      </div>
    </el-main>

    <el-footer class="jfooter">
      <Footer />
    </el-footer>
  </el-container>
</template>
