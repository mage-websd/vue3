<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './partials/Header.vue';
import Footer from './partials/Footer.vue';
</script>

<template>
  <el-container class="page-container layout-guest">
    <el-header class="jheader center">
      <Header />
    </el-header>

    <el-main class="jmain">
      <div class="main">
        <RouterView />
      </div>
    </el-main>

    <el-footer class="jfooter">
      <Footer />
    </el-footer>
  </el-container>
</template>
