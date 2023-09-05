<script setup lang="ts">
import { ref } from 'vue';
import { IWeekdayItemProps } from '../types';

const props = defineProps<IWeekdayItemProps>()

const weekdayR = ref(props.weekday)
const workflowStep = ref(0)

const formatDate = (date: Date) => !date ? "" : date.toLocaleTimeString([], { timeStyle: 'medium' })
const trimSeconds = (date: Date) => new Date(Math.floor(date.valueOf() / 60000) * 60000)
const formatElapsed = (number: number) => ({hour: Math.floor(number/3600000), minute: (number/60000)%60, onlyminute: (number/60000)})
const showText = (object: {hour: number, minute: number, onlyminute: number}, onlyminute: boolean) => onlyminute ? `${object.onlyminute}m` : (object.minute ? `${object.hour}h${(object.minute+"").padStart(2,"0")}` : `${object.hour}h`)

const matches = props.weekday.hour.planned.match(/[0-9]+/g) || ([] as string[])
const hoMatches = matches.length > 0 ? parseInt(matches[0]) : 0
const miMatches = matches.length > 1 ? parseInt(matches[1]) : 0

const click = (arg?: number) => {
  switch (workflowStep.value) {
    case 0:
      weekdayR.value.start = trimSeconds(new Date())
      weekdayR.value.end.planned = new Date(weekdayR.value.start.getTime())
      weekdayR.value.end.planned.setHours(weekdayR.value.end.planned.getHours() + hoMatches)
      weekdayR.value.end.planned.setMinutes(weekdayR.value.end.planned.getMinutes() + miMatches)
      break
    case 1:
      weekdayR.value.lunch.start = trimSeconds(new Date())
      break
    case 2:
      weekdayR.value.lunch.end = trimSeconds(new Date())
      weekdayR.value.end.planned = new Date(weekdayR.value.end.planned.valueOf() + weekdayR.value.lunch.end.valueOf() - weekdayR.value.lunch.start.valueOf())
      break
    case 3:
      if (arg) {
        weekdayR.value.end.realised = new Date(weekdayR.value.end.planned)
        weekdayR.value.hour.realised = weekdayR.value.hour.planned
      } else {
        weekdayR.value.end.realised = trimSeconds(new Date())
        weekdayR.value.hour.realised = showText(formatElapsed((weekdayR.value.end.realised.valueOf() - weekdayR.value.start.valueOf()) - (weekdayR.value.lunch.end.valueOf() - weekdayR.value.lunch.start.valueOf())), false)
      }
      break  
  }
  workflowStep.value++
}
</script>

<template>
  <div class="col">
    <div class="card">
      <div v-if="weekday.hour.realised.length > 0 && weekday.hour.planned != weekday.hour.realised" class="card-header">{{ weekday.day }} <s>({{ weekday.hour.planned }})</s> ({{ weekday.hour.realised }})</div>
      <div v-else class="card-header">{{ weekday.day }} ({{ weekday.hour.planned }})</div>
      <div class="card-body">
        <h5 v-if="weekday.start && !(weekday.end && weekday.end.realised) && (!weekday.lunch.start || weekday.lunch.end)">{{ formatDate(weekday.start) }} &Rarr; <em>{{ formatDate(weekday.end.planned) }}</em></h5>
        <h5 v-if="weekday.start && !(weekday.end && weekday.end.realised) && weekday.lunch.start && !weekday.lunch.end">{{ formatDate(weekday.start) }}</h5>
        <h5 v-if="weekday.end && weekday.end.realised">{{ formatDate(weekday.start) }} &Rarr; {{ formatDate(weekday.end.realised) }}</h5>
        <h5 v-if="weekday.lunch.start && !weekday.lunch.end" class="fs-6 fw-lighter">{{ formatDate(weekday.lunch.start) }}</h5>
        <h5 v-if="weekday.lunch.end" class="fs-6 fw-lighter">{{ formatDate(weekday.lunch.start) }} &Rarr; {{ formatDate(weekday.lunch.end) }} ({{ showText(formatElapsed((weekday.lunch.end ? weekday.lunch.end.valueOf() : weekday.lunch.start.valueOf()) - weekday.lunch.start.valueOf()),true) }})</h5>
        <div class="d-grid gap-2 d-md-flex flex-md-wrap">
          <a class="btn btn-success" @click="() => click()" v-if="workflowStep === 0">Start Day</a>
          <a class="btn btn-primary" @click="() => click()" v-if="workflowStep === 1">Start Lunch</a>
          <a class="btn btn-warning" @click="() => click()" v-if="workflowStep === 2">End Lunch</a>
          <a class="btn btn-danger" @click="() => click()" v-if="workflowStep === 3">End Day</a>
          <a class="btn btn-success" @click="() => click(1)" v-if="workflowStep === 3">End Day (on time)</a>
        </div>
      </div>
    </div>
  </div>
</template>
