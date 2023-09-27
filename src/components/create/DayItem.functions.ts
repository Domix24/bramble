import { onMounted, ref } from 'vue'
import {
  ICreateDayItemEmits,
  ICreateDayItemFunctions,
  ICreateDayItemProps,
} from '../../types/create'
import { Modal } from 'bootstrap'
import { Day } from '../../functions'

export const main = (
  props: ICreateDayItemProps,
  emits: ICreateDayItemEmits,
) => {
  const inside: ICreateDayItemFunctions = {
    formElement: ref({} as HTMLFormElement),
    hour: ref(props.day.edit.hour),
    modalElement: ref({} as HTMLDivElement),
    modalObject: {} as Modal,
    name: ref(props.day.edit.name),
    submitElement: ref({} as HTMLButtonElement),
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
    }

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
          'update:day',
          Day.createDay(inside.name.value, inside.hour.value)
            .setId(props.day.id)
            .setUpdated()
            .setWeekId(props.day.weekId)
            .getDay(),
        )
        inside.modalObject.hide()
      }

      inside.formElement.value.classList.add('was-validated')
    })
  })

  return inside
}
