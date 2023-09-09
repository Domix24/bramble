<script setup lang="ts">
import { DayComponent } from '.'
import { Display } from '../functions'
import { IWeekItemProps } from '../types'

defineProps<IWeekItemProps>()
</script>

<template>
  <div class="px-4 py-5 my-5">
    <h1 class="display-5 fw-bold text-body-emphasis">
      Week ({{ Display.showHourMinute(week.hour) }})
    </h1>
    <div class="my-3 d-flex gap-2 flex-wrap">
      <button class="btn btn-warning">
        <i class="bi bi-pencil"></i>
        <span class="d-none d-md-inline">Edit</span>
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <DayComponent v-for="(day, index) in week.days" :key="index" :day="day" />
    </div>
  </div>
</template>
