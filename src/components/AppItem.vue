<script setup lang="ts">
import {
  AppFunctions,
  CreateGroup,
  NotificationComponent,
  TitleComponent,
  WeekComponent,
} from '../components'

const main = AppFunctions.main()
const { day: xday, week: xweek, weeks } = main
</script>

<template>
  <main>
    <NotificationComponent v-if="false" />
    <TitleComponent @create-week="AppFunctions.onCreateWeek" />
    <WeekComponent
      v-for="(week, index) in weeks"
      :key="index"
      :week="week"
      @create-day="main.onCreateDay"
      @delete-days="main.onDeleteDays"
      @update-day="main.onUpdateDay"
    />
  </main>
  <template v-if="AppFunctions.getCreateState()">
    <CreateGroup.WeekComponent
      v-if="AppFunctions.getCreateState('week')"
      v-model:week="xweek"
      @close="main.closeWeek()"
    />
    <CreateGroup.DayComponent
      v-if="AppFunctions.getCreateState('day')"
      v-model:day="xday"
      @close="main.closeDay()"
    />
  </template>
  <button @click="() => main.getWeeks()"><em>get weeks</em></button>
  <button @click="() => main.addWeekTest()"><em>add week test</em></button>
  <button @click="() => main.deleteWeeksTest()"><em>delete weeks</em></button>
  <button @click="() => main.deleteAllTest()"><em>delete all</em></button>
  <p v-for="(v, i) in weeks" :key="i">{{ v }} ({{ i }})</p>
</template>
