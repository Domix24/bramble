<script setup lang="ts">
import { NotificationComponent, TitleComponent, WeekdayComponent } from './components'
import { IWeekday } from './types';

const createWeekday = (day: string, hourPlanned: string) => ({
  day,
  hour: {
    planned: hourPlanned,
    realised: "8h"
  },
  lunch: {},
  end: {}
} as IWeekday)

let weekdays = [createWeekday("Monday", "8h"), createWeekday("Tuesday", "8h"), createWeekday("Wednesday", "8h"), createWeekday("Thursday", "7h30"),createWeekday("Friday", "7h")]
</script>

<template>
  <main>
    <NotificationComponent />
    <TitleComponent />
    <div class="px-4 py-5 my-5">
      <h1 class="display-5 fw-bold text-body-emphasis">Week</h1>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <WeekdayComponent v-for="weekday in weekdays" :key="weekday.day" :weekday="weekday" />
      </div>
    </div>
  </main>
</template>
