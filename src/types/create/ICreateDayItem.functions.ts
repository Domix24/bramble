import { Modal } from 'bootstrap'
import { Ref } from 'vue'

export interface ICreateDayItemFunctions {
  hour: Ref<string>
  name: Ref<string>
  formElement: Ref<HTMLFormElement>
  modalElement: Ref<HTMLDivElement>
  submitElement: Ref<HTMLButtonElement>

  modalObject: Modal
}
