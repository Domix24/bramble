<script setup lang="ts">
import {
  AppFunctions,
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from '.'

const main = AppFunctions.main()
const { week } = main
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent />
    <WeekComponent v-model:week="week" />
  </main>
</template>
