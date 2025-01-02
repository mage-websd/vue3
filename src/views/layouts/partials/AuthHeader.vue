<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import logo from '@/assets/images/logo.svg';
import { menu } from '@/router/menu';
import { useAuthStore } from '@/stores/auth/auth.store';
import router from '@/router';

const route = useRoute();
const authStore = useAuthStore();
const isClassMenuOpen = ref<boolean>(false);
const menuActiveKey = ref<string | undefined>('');

const handleMenu = () => {
  getActiveMenu();
  isClassMenuOpen.value = !isClassMenuOpen.value;
};

const handleClickItemMenu = async (menuItem: any) => {
  if (menuItem.route) {
    router.push(menuItem.route);
  } else if (menuItem.handleClick) {
    await authStore.logout();
  }

  isClassMenuOpen.value = false;
};

const getActiveMenu = () => {
  menuActiveKey.value = route.meta.menuActiveKey;
};

const handleLogin = () => {
  authStore.login();

  isClassMenuOpen.value = false;
};
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="12" class="jh-logo">
      <el-image
        class="header-logo pointer"
        :src="logo"
        alt="LOGO"
        loading="lazy"
        @click="$router.push({ name: 'home' })"
      />
    </el-col>
    <el-col :span="12" class="jh-menu">
      <div class="jhm-inner pointer" @click="handleMenu">
        <fa :icon="['fas', 'bars']" class="menu-icon item" />
      </div>
    </el-col>
  </el-row>

  <div class="menu-overlay" :class="{ open: isClassMenuOpen }">
    <div class="mo-container">
      <div class="mo-inner">
        <div class="mo-header">
          <div class="mo-close pointer" @click="handleMenu">
            <fa :icon="['fas', 'xmark']" class="moc-icon" />
          </div>
        </div>

        <div class="mo-box">
          <div class="mo-user">
            <fa :icon="['fas', 'circle-user']" class="mo-avatar" />
          </div>

          <div class="mo-content">
            <div v-if="!authStore.isAuth">
              <p
                v-for="(menuItem, index) in menu"
                :key="index"
                class="item pointer"
                :class="{ active: menuItem.key && menuItem.key === menuActiveKey }"
                @click="handleClickItemMenu(menuItem)"
              >
                {{ menuItem.label }}
              </p>
            </div>
            <div v-else>
              <p class="item pointer" @click="handleLogin">Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
