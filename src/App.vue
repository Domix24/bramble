<script setup lang="ts">
import { ref } from 'vue'
import {
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from './components'
import { Day, Week } from './functions'

const week = ref(
  Week.createWeek('7')
    .addDay(Day.createDay('day1', '5'))
    .addDay(Day.createDay('day2', '6'))
    .getWeek(),
)
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent />
    <WeekComponent v-model:week="week" />
  </main>
</template>
