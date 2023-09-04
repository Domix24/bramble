<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ICreateWeekEmits, ICreateWeekProps } from './CreateWeek'
import { Modal } from 'bootstrap'

const modalWindow = ref({} as HTMLDivElement)
const formElement = ref({} as HTMLFormElement)
const submitElement = ref({} as HTMLButtonElement)

const props = defineProps<ICreateWeekProps>()
const emits = defineEmits<ICreateWeekEmits>()

let modalWindowObject = {} as Modal

const handleTotal = ref(props.modelValue.total)
const handleMonday = ref(props.modelValue.monday)
const handleTuesday = ref(props.modelValue.tuesday)
const handleWednesday = ref(props.modelValue.wednesday)
const handleThursday = ref(props.modelValue.thursday)
const handleFriday = ref(props.modelValue.friday)

const remainingC = computed(() =>
  parseNumberToHourMinuteString(
    hourStringToNumber(handleTotal.value).parse -
      hourMinuteStringToNumber(handleMonday.value).parse -
      hourMinuteStringToNumber(handleTuesday.value).parse -
      hourMinuteStringToNumber(handleWednesday.value).parse -
      hourMinuteStringToNumber(handleThursday.value).parse -
      hourMinuteStringToNumber(handleFriday.value).parse,
  ),
)

const hourStringToNumber = (hourString: string) => {
  const regexHour = hourString?.match(/^([0-9]{1,2})h$/)
  return {
    parse: (() => {
      if (!regexHour) return 0
      return parseInt(regexHour[1])
    })(),
    valid: (() => {
      if (!regexHour) return false
      return true
    })(),
  }
}

const hourMinuteStringToNumber = (hourMinuteString: string) => {
  const regexHour = hourMinuteString?.match(/^([0-9]{1})h$/)
  const regexHourMinute = hourMinuteString?.match(/^([0-9]{1})h(15|30|45)$/)
  return {
    parse: (() => {
      if (!regexHour && !regexHourMinute) return 0
      if (regexHour && !regexHourMinute) return parseInt(regexHour[1])
      if (!regexHour && regexHourMinute)
        return (
          parseInt(regexHourMinute[1]) +
          (regexHourMinute[2] === '15'
            ? 0.25
            : regexHourMinute[2] === '30'
            ? 0.5
            : 0.75)
        )
      return 0
    })(),
    valid: (() => {
      if (!regexHour && !regexHourMinute) return false
      if (regexHour && !regexHourMinute) return true
      if (!regexHour && regexHourMinute) return true
      return false
    })(),
  }
}

const parseNumberToHourMinuteString = (number: number) => {
  const splitter = (number + '').split('.')
  let text = splitter[0] + 'h'
  if (splitter.length === 2) {
    if (splitter[1] === '25') text += '15'
    else if (splitter[1] === '5') text += '30'
    else text += '45'
  }
  return text
}

const areInputsValid = () => {
  return (
    hourStringToNumber(handleTotal.value).valid &&
    hourMinuteStringToNumber(handleMonday.value).valid &&
    hourMinuteStringToNumber(handleTuesday.value).valid &&
    hourMinuteStringToNumber(handleWednesday.value).valid &&
    hourMinuteStringToNumber(handleThursday.value).valid &&
    hourMinuteStringToNumber(handleFriday.value).valid
  )
}

onMounted(() => {
  if (modalWindow.value && formElement.value && submitElement.value) {
    modalWindow.value.addEventListener('hide.bs.modal', () => emits('closed'))

    modalWindowObject = new Modal(modalWindow.value)
    modalWindowObject.show()

    formElement.value.onsubmit = (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (formElement.value.checkValidity()) {
        emits('update:modelValue', {
          friday: handleFriday.value,
          isok: true,
          monday: handleMonday.value,
          thursday: handleThursday.value,
          total: handleTotal.value,
          tuesday: handleTuesday.value,
          visible: false,
          wednesday: handleWednesday.value,
        })
        modalWindowObject.hide()
      }

      formElement.value.classList.add('was-validated')
    }

    submitElement.value.onclick = () => {
      formElement.value.requestSubmit()
    }
  }
})
</script>

<template>
  <div
    ref="modalWindow"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">
            #0: Create new Week
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form ref="formElement" class="row g-3 needs-validation" novalidate>
            <div class="col-12 position-relative">
              <label for="validationCustom01" class="form-label"
                >Number of hours</label
              >
              <input
                id="validationCustom01"
                v-model="handleTotal"
                type="text"
                class="form-control"
                required
              />
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col" class="col-6">Weekday</th>
                  <th scope="col" class="col-6">
                    Hours <em>{{ remainingC }}</em>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row" class="align-middle">Monday</td>
                  <td>
                    <input
                      id="validationCustom02"
                      v-model="handleMonday"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td scope="row" class="align-middle">Tuesday</td>
                  <td>
                    <input
                      id="validationCustom03"
                      v-model="handleTuesday"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td scope="row" class="align-middle">Wednesday</td>
                  <td>
                    <input
                      id="validationCustom04"
                      v-model="handleWednesday"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td scope="row" class="align-middle">Thursday</td>
                  <td>
                    <input
                      id="validationCustom05"
                      v-model="handleThursday"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td scope="row" class="align-middle">Friday</td>
                  <td>
                    <input
                      id="validationCustom06"
                      v-model="handleFriday"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
          <button
            ref="submitElement"
            type="button"
            class="btn btn-primary"
            :disabled="!(remainingC == '0h' && areInputsValid())"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
