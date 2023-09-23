import { Modal } from 'bootstrap'
import { Ref } from 'vue'

export interface ICreateWeekItemFunctions {
  hour: Ref<string>
  formElement: Ref<HTMLFormElement>
  modalElement: Ref<HTMLDivElement>
  submitElement: Ref<HTMLButtonElement>

  modalObject: Modal
}
