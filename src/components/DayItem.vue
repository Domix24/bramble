<script setup lang="ts">
import { Display } from '../functions'
import { IDayItemProps } from '../types'

defineProps<IDayItemProps>()
</script>

<template>
  <div class="col">
    <div class="card">
      <div class="card-header">
        {{ day.name }} ({{ Display.showHourMinute(day.hour) }})
      </div>
      <div class="card-body">
        <h5 class="card-title">00:00:00 &Rarr; 00:00:00</h5>
        <p class="card-text">00:00:00 &Rarr; 00:00:00</p>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-success">
            <i class="bi bi-play"></i>
            <span class="d-none d-md-inline">Start</span>
          </button>
          <button class="btn btn-danger">
            <i class="bi bi-pause"></i>
            <span class="d-none d-md-inline">Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
