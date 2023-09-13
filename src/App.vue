<script setup lang="ts">
import {
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from './components'
import { Week } from './functions'

const week = Week.createWeek('7')
  .addDay('day1', '5')
  .addDay('day2', '6')
  .getWeek()
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent />
    <WeekComponent :week="week" />
  </main>
</template>
