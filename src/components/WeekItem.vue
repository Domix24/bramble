<script setup lang="ts">
import { DayComponent, WeekFunctions } from '.'
import { Display } from '../functions'
import { IWeekItemEmits, IWeekItemProps } from '../types'

defineProps<IWeekItemProps>()
defineEmits<IWeekItemEmits>()
</script>

<template>
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
      <button class="btn btn-warning" @click="$emit('update', week)">
        <i class="bi bi-pencil"></i>
        <span class="d-none d-md-inline ps-1">Edit</span>
      </button>
      <button class="btn btn-primary" @click="$emit('create', week)">
        <i class="bi bi-plus"></i>
        <span class="d-none d-md-inline ps-1">Add</span>
      </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <DayComponent
        v-for="(_day, index) in WeekFunctions.main($props, $emit).daysC.value"
        :key="index"
        :day="WeekFunctions.main($props, $emit).daysC.value[index]"
      />
    </div>
  </div>
</template>
