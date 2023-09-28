<script setup lang="ts">
import { Display } from '../functions'
import { IDayItemEmits, IDayItemProps } from '../types'
import { DayFunctions } from '.'

const main = DayFunctions.main()
const { dayStart, dayStop, lunchStart, lunchStop } = main

defineEmits<IDayItemEmits>()
defineProps<IDayItemProps>()

const SHOW_CUSTOM_DEBUG = import.meta.env.VITE_SHOW_CUSTOM_DEBUG
</script>

<template>
  <div class="col d-flex">
    <div class="card" style="flex: 0 0 100%">
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
        <template v-if="SHOW_CUSTOM_DEBUG == 'X'">
          <p>{{ $props }}</p>
        </template>
        <h5
          v-if="dayStop && dayStart && lunchStart && lunchStop"
          class="card-title"
        >
          {{ Display.showDate(dayStart) }} &Rarr;
          {{ Display.showDate(dayStop) }} ({{
            Display.showHourMinuteFromOperation(main.getDayTotal())
          }})
        </h5>
        <h5 v-else-if="dayStart && lunchStart && lunchStop" class="card-title">
          {{ Display.showDate(dayStart) }} &Rarr;
          <em>{{ Display.showDate(main.getEstimatedTime({ day })) }}</em>
        </h5>
        <h5 v-else-if="dayStart" class="card-title">
          {{ Display.showDate(dayStart) }}
        </h5>
        <p v-if="lunchStop && lunchStart" class="card-text">
          {{ Display.showDate(lunchStart) }} &Rarr;
          {{ Display.showDate(lunchStop) }} ({{
            Display.showMinuteFromOperation(main.getLunchDiff())
          }})
        </p>
        <p v-else-if="lunchStart" class="card-text">
          {{ Display.showDate(lunchStart) }}
        </p>
        <div
          v-if="typeof day.hour.confirmed === 'undefined'"
          class="d-flex gap-2 flex-wrap"
        >
          <button
            v-if="!lunchStart"
            class="btn btn-success"
            @click="main.onStart"
          >
            <i class="bi bi-play"></i>
            <span v-if="!dayStart" class="d-none d-md-inline ps-1"
              >Start Day</span
            >
            <span v-else class="d-none d-md-inline ps-1">Start Lunch</span>
          </button>
          <button
            v-else
            class="btn btn-danger"
            @click="() => main.onStop({ day }, $emit)"
          >
            <i class="bi bi-pause"></i>
            <span v-if="!lunchStop" class="d-none d-md-inline ps-1"
              >Stop Lunch</span
            >
            <span v-else class="d-none d-md-inline ps-1">Stop Day</span>
          </button>
          <button
            v-if="lunchStop"
            class="btn btn-danger"
            @click="() => main.onStopExact({ day }, $emit)"
          >
            <i class="bi bi-stop"></i>
            <span class="d-none d-md-inline ps-1">Stop Exact</span>
          </button>
          <button
            v-if="!dayStart"
            class="btn btn-warning"
            @click="$emit('update', day)"
          >
            <i class="bi bi-pencil"></i>
            <span class="d-none d-md-inline ps-1">Edit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
