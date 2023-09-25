<script setup lang="ts">
import {
  AppFunctions,
  CreateGroup,
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from '.'

const main = AppFunctions.main()
const { week, createdWeek, createdDay } = main
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent />
    <WeekComponent
      v-model:week="week"
      @update="main.doUpdateWeek"
      @create="main.doCreateDay"
    />
  </main>
  <template v-if="true">
    <CreateGroup.WeekComponent
      v-if="createdWeek"
      v-model:week="createdWeek"
      @close="main.doCloseWeek"
    />
    <CreateGroup.DayComponent
      v-if="createdDay"
      v-model:day="createdDay"
      @close="main.doCloseDay"
    />
  </template>
</template>
