<script setup lang="ts">
import { Display } from '../functions'
import { IDayItemEmits, IDayItemProps } from '../types'
import { DayFunctions } from '.'

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
          <p>
            {{ DayFunctions.isEmpty(day.day && day.day.start) }} /
            {{ day.day && day.day.start }}
          </p>
          <p>
            {{ DayFunctions.isEmpty(day.day && day.day.stop) }} /
            {{ day.day && day.day.stop }}
          </p>
          <p>
            {{ DayFunctions.isEmpty(day.lunch && day.lunch.start) }} /
            {{ day.lunch && day.lunch.start }}
          </p>
          <p>
            {{ DayFunctions.isEmpty(day.lunch && day.lunch.stop) }} /
            {{ day.lunch && day.lunch.stop }}
          </p>
        </template>
        <h5
          v-if="
            !DayFunctions.isEmpty(day.day && day.day.stop) &&
            !DayFunctions.isEmpty(day.day && day.day.start) &&
            !DayFunctions.isEmpty(day.lunch && day.lunch.start) &&
            !DayFunctions.isEmpty(day.lunch && day.lunch.stop)
          "
          class="card-title"
        >
          {{ Display.showDate(day.day.start) }} &Rarr;
          {{ Display.showDate(day.day.stop) }} ({{
            Display.showHourMinuteFromOperation(
              DayFunctions.main($props).getDayTotal(),
            )
          }})
        </h5>
        <h5
          v-else-if="
            !DayFunctions.isEmpty(day.day && day.day.start) &&
            !DayFunctions.isEmpty(day.lunch && day.lunch.start) &&
            !DayFunctions.isEmpty(day.lunch && day.lunch.stop)
          "
          class="card-title"
        >
          {{ Display.showDate(day.day.start) }} &Rarr;
          <em>{{
            Display.showDate(DayFunctions.main($props).getEstimatedTime())
          }}</em>
        </h5>
        <h5
          v-else-if="!DayFunctions.isEmpty(day.day && day.day.start)"
          class="card-title"
        >
          {{ Display.showDate(day.day.start) }}
        </h5>
        <p
          v-if="
            !DayFunctions.isEmpty(day.lunch && day.lunch.stop) &&
            !DayFunctions.isEmpty(day.lunch && day.lunch.start)
          "
          class="card-text"
        >
          {{ Display.showDate(day.lunch.start) }} &Rarr;
          {{ Display.showDate(day.lunch.stop) }} ({{
            Display.showMinuteFromOperation(
              DayFunctions.main($props).getLunchDiff(),
            )
          }})
        </p>
        <p
          v-else-if="!DayFunctions.isEmpty(day.lunch && day.lunch.start)"
          class="card-text"
        >
          {{ Display.showDate(day.lunch.start) }}
        </p>
        <div
          v-if="typeof day.hour.confirmed === 'undefined'"
          class="d-flex gap-2 flex-wrap"
        >
          <button
            v-if="DayFunctions.isEmpty(day.lunch && day.lunch.start)"
            class="btn btn-success"
            @click="DayFunctions.main($props, $emit).onStart"
          >
            <i class="bi bi-play"></i>
            <span
              v-if="DayFunctions.isEmpty(day.day && day.day.start)"
              class="d-none d-md-inline ps-1"
              >Start Day</span
            >
            <span v-else class="d-none d-md-inline ps-1">Start Lunch</span>
          </button>
          <button
            v-else
            class="btn btn-danger"
            @click="DayFunctions.main($props, $emit).onStop"
          >
            <i class="bi bi-pause"></i>
            <span
              v-if="DayFunctions.isEmpty(day.lunch && day.lunch.stop)"
              class="d-none d-md-inline ps-1"
              >Stop Lunch</span
            >
            <span v-else class="d-none d-md-inline ps-1">Stop Day</span>
          </button>
          <button
            v-if="!DayFunctions.isEmpty(day.lunch && day.lunch.stop)"
            class="btn btn-danger"
            @click="DayFunctions.main($props, $emit).onStopExact"
          >
            <i class="bi bi-stop"></i>
            <span class="d-none d-md-inline ps-1">Stop Exact</span>
          </button>
          <button
            v-if="DayFunctions.isEmpty(day.day && day.day.start)"
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
