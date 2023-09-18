import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'

export const main = (spec: { close: () => void; update: () => void }) => {
  const inside = {
    modalWindowObject: {} as Modal,

    modalWindow: ref({} as HTMLDivElement),
    submitElement: ref({} as HTMLButtonElement),
    formElement: ref({} as HTMLFormElement),
  }

  onMounted(() => {
    if (
      inside.formElement.value &&
      inside.modalWindow.value &&
      inside.submitElement.value
    ) {
      inside.modalWindow.value.addEventListener('hide.bs.modal', () => {
        spec.close()
      })

      inside.modalWindowObject = new Modal(inside.modalWindow.value)
      inside.modalWindowObject.show()

      inside.submitElement.value.addEventListener('click', () => {
        inside.formElement.value.requestSubmit()
      })

      inside.formElement.value.addEventListener('submit', (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (inside.formElement.value.checkValidity()) {
          spec.update()
          inside.modalWindowObject.hide()
        }

        inside.formElement.value.classList.add('was-validated')
      })
    }
  })

  return inside
}
