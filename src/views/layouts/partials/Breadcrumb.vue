<script lang="ts" setup>
import { type RouteLocation, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const matchedRouteList = computed(() => {
  const matchedRouteList = [] as Array<RouteLocation>;
  const homeRoute = findRoute('home');

  if (homeRoute) {
    matchedRouteList.push(homeRoute);
  }
  const otherRoute = findRoute(route.name?.toString() ?? '');
  if (otherRoute !== null) {
    matchedRouteList.push(otherRoute);
  }

  return matchedRouteList;
});

const findRoute = (name: string): RouteLocation | null => {
  try {
    return router.resolve({
      name: name,
    });
  } catch (_e) {
    return null;
  }
};
</script>

<template>
  <el-row class="indent-content breadcrumb">
    <el-breadcrumb separator-icon="no-icon">
      <el-breadcrumb-item v-for="(routeItem, index) in matchedRouteList" :key="routeItem">
        <span
          v-if="index < matchedRouteList.length - 1"
          class="breadcrumb__item breadcrumb__link"
          @click="$router.push(routeItem)"
        >
          {{ routeItem.meta.title }}
        </span>
        <span v-else class="breadcrumb__item breadcrumb__current-page">{{
          routeItem.name == 'home' ? '' : routeItem.meta.title
        }}</span>

        <span v-if="index < matchedRouteList.length - 1" class="breadcrumb__separator">
          <fa v-if="matchedRouteList[1].name != 'home'" :icon="['fas', 'angle-right']" />
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>
