<template>
  <el-date-picker
    class="date-picker"
    :type="type"
    :editable="false"
    :format="format"
    v-bind="$attrs"
    :value-format="format"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: () => 'date',
  },
});

const format = computed(() => {
  switch (props.type) {
    case 'year':
      return 'YYYY';
    case 'month':
      return 'YYYY/MM';
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss';
    case 'date':
    default:
      return 'YYYY-MM-DD';
  }
});
</script>
