import { createApp } from 'vue'
import { AppComponent } from './components'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './scss/style.scss'
import { BrambleDatabase } from './functions/database'
import { PromiseExtended } from 'dexie'
import { IDexieDay, IDexieWeek } from './types'

createApp(AppComponent).mount('#app')

declare global {
  interface Window {
    clearAll(): void
    clearDays(): PromiseExtended<void>
    clearWeeks(): PromiseExtended<void>
    //
    getDays(): PromiseExtended<IDexieDay[]>
    getWeeks(): PromiseExtended<IDexieWeek[]>
  }
}

if (import.meta.env.VITE_SHOW_CUSTOM_DEBUG === 'X') {
  window.clearAll = () => Promise.all([window.clearDays(), window.clearWeeks()])
  window.clearDays = () => new BrambleDatabase().days.clear()
  window.clearWeeks = () => new BrambleDatabase().weeks.clear()

  window.getDays = () => new BrambleDatabase().days.toArray()
  window.getWeeks = () => new BrambleDatabase().weeks.toArray()
}
