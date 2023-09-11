<script setup lang="ts">
import {
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from './components'
import { Week } from './functions'

const week = Week.createWeek('7').addDay('day', '5').getWeek()
</script>

<template>
  <main>
    <NotificationComponent />
    <TitleComponent />
    <WeekComponent :week="week" />
  </main>
</template>
