import { onMounted, ref } from 'vue'
import {
  ICreateWeekItemEmits,
  ICreateWeekItemFunctions,
  ICreateWeekItemProps,
} from '../../types/create'
import { Modal } from 'bootstrap'
import { Week } from '../../functions'

export const main = (
  props: ICreateWeekItemProps,
  emits: ICreateWeekItemEmits,
) => {
  const inside: ICreateWeekItemFunctions = {
    hour: ref(props.week.edit.hour),
    formElement: ref({} as HTMLFormElement),
    modalElement: ref({} as HTMLDivElement),
    submitElement: ref({} as HTMLButtonElement),

    modalObject: {} as Modal,
  }

  onMounted(() => {
    if (
      inside.formElement.value &&
      inside.modalElement.value &&
      inside.submitElement.value
    ) {
      inside.modalElement.value.addEventListener('hide.bs.modal', () => {
        emits('close')
      })

      inside.modalObject = new Modal(inside.modalElement.value)
      inside.modalObject.show()

      inside.submitElement.value.addEventListener('click', () => {
        inside.formElement.value.requestSubmit()
      })

      inside.formElement.value.addEventListener('submit', (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (inside.formElement.value.checkValidity()) {
          emits(
            'update:week',
            Week.createWeek(inside.hour.value)
              .setUpdated()
              .setId(props.week.id)
              .getWeek(),
          )
          inside.modalObject.hide()
        }

        inside.formElement.value.classList.add('was-validated')
      })
    }
  })

  return inside
}
