<template>
  <div class="date-range-picker">
    <el-row class="filter-special">
      <el-col :xs="22" :sm="11" style="width: 100%">
        <el-form-item :prop="getPropStateDate" :label="startDateLabel" :required="required">
          <date-picker
            :editable="false"
            :model-value="startDate"
            :type="type"
            :disabled-date="disabledStartDates"
            v-bind="$attrs"
            placeholder="from date 2025/01/01"
            @update:model-value="(date) => $emit('startDateChange', date)"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="2" :sm="2">
        <div class="custom-tilde">{{ separator }}</div>
      </el-col>
      <el-col :xs="22" :sm="11" class="" style="width: 100%">
        <el-form-item :prop="getPropEndDate" :label="endDateLabel" :required="requiredEndDate">
          <date-picker
            :editable="false"
            :model-value="endDate"
            :type="type"
            :disabled-date="disabledEndDates"
            v-bind="$attrs"
            placeholder="to date 2025/12/31"
            @update:model-value="(date) => $emit('endDateChange', date)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import DatePicker from '@/views/components/DatePicker.vue';
import { date } from '@/helpers/date';

const props = defineProps({
  startDateLabel: {
    type: String,
    default: '',
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDateLabel: {
    type: String,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  separator: {
    type: String,
    default: '〜',
  },
  type: {
    type: String,
    default: 'date',
  },
  ignoreEqualDate: {
    type: Boolean,
    default: false,
  },
  propStartDate: {
    type: String,
    default: '',
  },
  propEndDate: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  requiredEndDate: {
    type: Boolean,
    default: false,
  },
  separatorStyle: {
    type: String,
    default: '',
  },
});

defineEmits(['startDateChange', 'endDateChange']);

const getPropStateDate = computed(() => {
  return props.propStartDate ?? '';
});

const getPropEndDate = computed(() => {
  return props.propEndDate ?? '';
});

const disabledStartDates = (time: Date) => {
  const startDate = date(time);
  return (
    props.endDate &&
    (props.ignoreEqualDate ? startDate >= props.endDate : startDate > props.endDate)
  );
};
const disabledEndDates = (time: Date) => {
  const endDate = date(time);
  return (
    props.startDate &&
    (props.ignoreEqualDate ? endDate <= props.startDate : endDate < props.startDate)
  );
};
</script>
