<script setup lang="ts">
import { CreateGroup } from '..'
import { ICreateWeekItemEmits, ICreateWeekItemProps } from '../../types/create'

const emits = defineEmits<ICreateWeekItemEmits>()
const props = defineProps<ICreateWeekItemProps>()

const main = CreateGroup.WeekFunctions.main(props, emits)
const { formElement, hour, modalElement, submitElement } = main
</script>

<template>
  <div
    ref="modalElement"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">Create</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form ref="formElement" class="row g-3 needs-validation" novalidate>
            <div class="col-12">
              <label for="val1" class="form-label">Hours ({{ hour }})</label>
              <input
                id="val1"
                v-model="hour"
                type="text"
                class="form-control"
                required
                pattern="^([1-9][0-9]|[0-9])h(15|30|45)?$"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button ref="submitElement" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
