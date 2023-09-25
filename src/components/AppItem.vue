<script setup lang="ts">
import {
  AppFunctions,
  CreateGroup,
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from '.'

const SHOW_CUSTOM_DEBUG = import.meta.env.VITE_SHOW_CUSTOM_DEBUG
const main = AppFunctions.main()
const {
  createdDay,
  createdWeek,
  outputDays,
  outputWeek,
  outputWeeks,
  seconds,
  week,
} = main
</script>

<template>
  <template v-if="SHOW_CUSTOM_DEBUG == 'X'">
    <p>{{ week }}</p>
  </template>
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
  <aside v-if="SHOW_CUSTOM_DEBUG == 'X'">
    <h1>
      Output from dexie every {{ seconds }} seconds
      <small>{{ +new Date() }}</small>
    </h1>
    <p><strong>Days</strong> {{ outputDays }}</p>
    <p><strong>Weeks</strong> {{ outputWeeks }}</p>
    <p><strong>Week</strong> {{ outputWeek }}</p>
  </aside>
</template>
