<script setup lang="ts">
import { DayComponent, WeekFunctions } from '.'
import { Display } from '../functions'
import { IWeekItemEmits, IWeekItemProps } from '../types'

const props = defineProps<IWeekItemProps>()
const emits = defineEmits<IWeekItemEmits>()

const main = WeekFunctions.main(props, emits)
const { daysC: days, hourC: hour } = main
</script>

<template>
  <div class="px-4 py-5 my-5">
    <h1
      v-if="main.getHours() != hour && main.getDifference() != hour"
      class="display-5 fw-bold text-body-emphasis"
    >
      Week {{ Display.showHourMinute(main.getHours()) }} /
      {{ Display.showHourMinute(hour) }} ({{ main.getSign()
      }}{{ Display.showHourMinute(main.getDifference()) }})
    </h1>
    <h1
      v-else-if="main.getHours() != hour"
      class="display-5 fw-bold text-body-emphasis"
    >
      Week {{ Display.showHourMinute(main.getHours()) }} /
      {{ Display.showHourMinute(hour) }}
    </h1>
    <h1 v-else class="display-5 fw-bold text-body-emphasis">
      Week {{ Display.showHourMinute(hour) }}
    </h1>
    <div class="my-3 d-flex gap-2 flex-wrap">
      <button class="btn btn-warning">
        <i class="bi bi-pencil"></i>
        <span class="d-none d-md-inline ps-1">Edit</span>
      </button>
      <button class="btn btn-primary">
        <i class="bi bi-plus"></i>
        <span class="d-none d-md-inline ps-1">Add</span>
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <DayComponent
        v-for="(_day, index) in days"
        :key="index"
        :day="days[index]"
      />
    </div>
  </div>
</template>
