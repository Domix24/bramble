<script setup lang="ts">
import {
  AppFunctions,
  CreateGroup,
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from '.'

const main = AppFunctions.main()
const { week, createdWeek } = main
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent />
    <WeekComponent v-model:week="week" @update="main.doUpdateWeek" />
  </main>
  <template v-if="true">
    <CreateGroup.WeekComponent
      v-if="createdWeek"
      v-model:week="createdWeek"
      @close="main.doCloseWeek"
    />
  </template>
</template>
