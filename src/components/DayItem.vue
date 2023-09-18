<script setup lang="ts">
import { Display } from '../functions'
import { IDay, IDayItemProps } from '../types'
import { DayFunctions } from '.'

const props = defineProps<IDayItemProps>()
const emits = defineEmits<{
  (event: 'update', day: IDay): void
  (event: 'update:day', day: IDay): void
}>()

const main = DayFunctions.main(emits, props)
const { dayStartC, dayStopC, lunchStartC, lunchStopC } = main
</script>

<template>
  <div class="col">
    <div class="card">
      <div
        v-if="
          isNaN(day.hour.confirmed) || day.hour.confirmed == day.hour.planned
        "
        class="card-header"
      >
        {{ day.name }} ({{ Display.showHourMinute(day.hour.planned) }})
      </div>
      <div
        v-else-if="day.hour.confirmed != day.hour.planned"
        class="card-header"
      >
        {{ day.name }}
        <s>({{ Display.showHourMinute(day.hour.planned) }})</s> ({{
          Display.showHourMinute(day.hour.confirmed)
        }})
      </div>
      <div class="card-body">
        <h5
          v-if="dayStopC && dayStartC && lunchStartC && lunchStopC"
          class="card-title"
        >
          {{ Display.showDate(dayStartC) }} &Rarr;
          {{ Display.showDate(dayStopC) }} ({{
            Display.showHourMinuteFromOperation(main.getDayTotal())
          }})
        </h5>
        <h5
          v-else-if="dayStartC && lunchStartC && lunchStopC"
          class="card-title"
        >
          {{ Display.showDate(dayStartC) }} &Rarr;
          <em>{{ Display.showDate(main.getEstimatedTime({ day })) }}</em>
        </h5>
        <h5 v-else-if="dayStartC" class="card-title">
          {{ Display.showDate(dayStartC) }}
        </h5>
        <p v-if="lunchStopC && lunchStartC" class="card-text">
          {{ Display.showDate(lunchStartC) }} &Rarr;
          {{ Display.showDate(lunchStopC) }} ({{
            Display.showMinuteFromOperation(main.getLunchDiff())
          }})
        </p>
        <p v-else-if="lunchStartC" class="card-text">
          {{ Display.showDate(lunchStartC) }}
        </p>
        <div v-if="!dayStopC" class="d-flex gap-2 flex-wrap">
          <button
            v-if="!lunchStartC"
            class="btn btn-success"
            @click="main.onStart"
          >
            <i class="bi bi-play"></i>
            <span v-if="!dayStartC" class="d-none d-md-inline">Start Day</span>
            <span v-else class="d-none d-md-inline">Start Lunch</span>
          </button>
          <button
            v-else
            class="btn btn-danger"
            @click="() => main.onStop({ day })"
          >
            <i class="bi bi-pause"></i>
            <span v-if="!lunchStopC" class="d-none d-md-inline"
              >Stop Lunch</span
            >
            <span v-else class="d-none d-md-inline">Stop Day</span>
          </button>
          <button
            v-if="lunchStopC"
            class="btn btn-danger"
            @click="() => main.onStopExact({ day })"
          >
            <i class="bi bi-stop"></i>
            <span class="d-none d-md-inline">Stop Exact</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
