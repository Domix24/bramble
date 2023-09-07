<script setup lang="ts">
import {
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from './components'
import { Week } from './functions'

const week = Week.createWeek('0')
</script>

<template>
  <main>
    <NotificationComponent />
    <TitleComponent />
    <WeekComponent :week="week" />
  </main>
</template>
