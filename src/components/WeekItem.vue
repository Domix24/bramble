<script setup lang="ts">
import { onUpdated } from 'vue'
import { DayComponent, WeekFunctions } from '.'
import { Display } from '../functions'
import { IDay, IWeek, IWeekItemProps } from '../types'

const props = defineProps<IWeekItemProps>()
defineEmits<{
  (event: 'createDay', week: IWeek): void
  (event: 'deleteDays', week: IWeek): void
  (event: 'updateDay', week: IWeek, day: IDay): void
}>()

let main = WeekFunctions.main(props.week)
let { days, hour } = main

onUpdated(() => {
  main = WeekFunctions.main(props.week)
  days = main.days
  hour = main.hour

  console.log('5-6', props.week.days, props.week.hour)
  console.log('7-8', days.value, hour.value)
})
</script>

<template>
  <p>{{ days }} / {{ hour }}</p>
  <p>{{ week.days }} / {{ week.hour }}</p>
  <div class="px-4 py-5 my-5">
    <h1
      v-if="main.getHours() != week.hour && main.getDifference() != week.hour"
      class="display-5 fw-bold text-body-emphasis"
    >
      Week {{ Display.showHourMinute(main.getHours()) }} /
      {{ Display.showHourMinute(week.hour) }} ({{ main.getSign()
      }}{{ Display.showHourMinute(main.getDifference()) }})
    </h1>
    <h1
      v-else-if="main.getHours() != week.hour"
      class="display-5 fw-bold text-body-emphasis"
    >
      Week {{ Display.showHourMinute(main.getHours()) }} /
      {{ Display.showHourMinute(week.hour) }}
    </h1>
    <h1 v-else class="display-5 fw-bold text-body-emphasis">
      Week {{ Display.showHourMinute(week.hour) }}
    </h1>
    <div class="my-3 d-flex gap-2 flex-wrap">
      <button v-if="false" class="btn btn-warning">
        <i class="bi bi-pencil px-1"></i>
        <span class="d-none d-md-inline">Edit Week</span>
      </button>
      <button class="btn btn-warning" @click="$emit('createDay', week)">
        <i class="bi bi-plus-square px-1"></i>
        <span class="d-none d-md-inline">Add Day</span>
      </button>
      <button class="btn btn-danger" @click="$emit('deleteDays', week)">
        <i class="bi bi-trash px-1"></i>
        <span class="d-none d-md-inline">Delete Days</span>
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <DayComponent
        v-for="(_day, index) in week.days"
        :key="index"
        v-model:day="week.days[index]"
        @update="$emit('updateDay', week, week.days[index])"
      />
    </div>
  </div>
</template>
