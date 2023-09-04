<script setup lang="ts">
import { IWeekItemProps } from '../types'

defineProps<IWeekItemProps>()
</script>

<template>
  <div class="px-4 py-4 my-5">
    <h1 class="display-5 fw-bold text-body-emphasis">Week #0</h1>
    <h3>x to y</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col">
        <div class="card">
          <div class="card-header">Monday</div>
          <div class="card-body">
            <h5 class="card-title">hh:mm &Rarr; hh:mm (8h)</h5>
            <table class="table">
              <tr>
                <td class="col-6">Started</td>
                <td class="col-6">07:10</td>
              </tr>
              <tr>
                <td class="col-6">Lunch</td>
                <td class="col-6">32:14</td>
              </tr>
              <tr>
                <td class="col-6">Ended</td>
                <td class="col-6">16:30</td>
              </tr>
            </table>
            <div class="d-grid gap-2 d-md-flex flex-md-wrap">
              <a class="btn btn-primary">Start</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Tuesday</div>
          <div class="card-body">
            <div class="d-grid gap-2 d-md-flex flex-md-wrap">
              <a class="btn btn-primary">Start</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Wednesday</div>
          <div class="card-body">
            <div class="d-grid gap-2 d-md-flex flex-md-wrap">
              <a class="btn btn-primary">Start</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Thrusday</div>
          <div class="card-body">
            <div class="d-grid gap-2 d-md-flex flex-md-wrap">
              <a class="btn btn-primary">Start</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Friday</div>
          <div class="card-body">
            <div class="d-grid gap-2 d-md-flex flex-md-wrap">
              <a class="btn btn-primary">Start</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
