<script setup lang="ts">
import { ITitleItemEmits } from '../types'

defineEmits<ITitleItemEmits>()
</script>

<template>
  <div class="px-4 py-5 my-5 text-center">
    <img class="d-block mx-auto mb-4" src="/logo.svg" width="66" height="74" />
    <h1 class="display-5 fw-bold text-body-emphasis">bramble.</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Work <em>Schedule</em></p>
      <div class="gap-2 justify-content-sm-center d-grid d-sm-flex">
        <button
          type="button"
          class="btn btn-primary btn-lg px-4 gap-3"
          @click="$emit('createWeek')"
        >
          Add new <em>Week</em>
        </button>
      </div>
    </div>
  </div>
</template>
