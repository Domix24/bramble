<script setup lang="ts">
import { ref } from 'vue'
import { ICreateWeek } from './components/CreateWeek'
import CreateWeek from './components/CreateWeek.vue'
import NotificationComponent from './components/NotificationItem.vue'
import TitleComponent from './components/TitleItem.vue'
import WeekComponent from './components/WeekItem.vue'

const week = ref({ visible: false } as ICreateWeek)

const onWeekCreated = () => {
  week.value = { visible: true } as ICreateWeek
}
const onClosed = () => {
  week.value.visible = false
}
</script>

<template>
  <main>
    <NotificationComponent />
    <TitleComponent @week-created="onWeekCreated" />
    <WeekComponent :week="week" />
  </main>
  <CreateWeek v-if="week.visible" v-model="week" @closed="onClosed" />
</template>
