<script setup lang="ts">
import { DayComponent, WeekFunctions } from '.'
import { Display } from '../functions'
import { IWeekItemEmits, IWeekItemProps } from '../types'

defineProps<IWeekItemProps>()
defineEmits<IWeekItemEmits>()

const SHOW_CUSTOM_DEBUG = import.meta.env.VITE_SHOW_CUSTOM_DEBUG
</script>

<template>
  <template v-if="SHOW_CUSTOM_DEBUG == 'X'">
    <p>{{ week }}</p>
    <p>
      {{ WeekFunctions.main($props, $emit).daysC }} /
      {{ WeekFunctions.main($props, $emit).hourC }}
    </p>
  </template>
  <div class="px-4 py-5 my-5">
    <h1
      v-if="
        WeekFunctions.main($props, $emit).getHours() !=
          WeekFunctions.main($props, $emit).hourC.value &&
        WeekFunctions.main($props, $emit).getDifference() !=
          WeekFunctions.main($props, $emit).hourC.value
      "
      class="display-5 fw-bold text-body-emphasis"
    >
      Week
      {{ Display.showHourMinute(WeekFunctions.main($props, $emit).getHours()) }}
      /
      {{
        Display.showHourMinute(WeekFunctions.main($props, $emit).hourC.value)
      }}
      ({{ WeekFunctions.main($props, $emit).getSign()
      }}{{
        Display.showHourMinute(
          WeekFunctions.main($props, $emit).getDifference(),
        )
      }})
    </h1>
    <h1
      v-else-if="
        WeekFunctions.main($props, $emit).getHours() !=
        WeekFunctions.main($props, $emit).hourC.value
      "
      class="display-5 fw-bold text-body-emphasis"
    >
      Week
      {{ Display.showHourMinute(WeekFunctions.main($props, $emit).getHours()) }}
      /
      {{
        Display.showHourMinute(WeekFunctions.main($props, $emit).hourC.value)
      }}
    </h1>
    <h1 v-else class="display-5 fw-bold text-body-emphasis">
      Week
      {{
        Display.showHourMinute(WeekFunctions.main($props, $emit).hourC.value)
      }}
    </h1>
    <div class="my-3 d-flex gap-2 flex-wrap">
      <button
        class="btn btn-warning"
        title="Edit"
        @click="$emit('update', week, false)"
      >
        <i class="bi bi-pencil"></i>
        <span class="d-none d-md-inline ps-1">Edit</span>
      </button>
      <button
        class="btn btn-warning"
        title="Reset"
        @click="$emit('update', week, true)"
      >
        <i class="bi bi-arrow-clockwise"></i>
        <span class="d-none d-md-inline ps-1">Reset</span>
      </button>
      <button
        class="btn btn-primary"
        title="Add"
        @click="$emit('create', week)"
      >
        <i class="bi bi-plus"></i>
        <span class="d-none d-md-inline ps-1">Add</span>
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <DayComponent
        v-for="(day, index) in WeekFunctions.main($props, $emit).daysC.value"
        :key="index"
        v-model:day="WeekFunctions.main($props, $emit).daysC.value[index]"
        @update="$emit('update:day', week, day, false)"
        @update:day:direct="$emit('update:day', week, day, true)"
      />
    </div>
  </div>
</template>
