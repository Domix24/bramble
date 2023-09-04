export interface ICreateWeek {
    total: string,
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string,
    isok: boolean,
    visible: boolean
}
export interface ICreateWeekEmits {
    (event: 'update:modelValue', week: ICreateWeek): void,
    (event: 'closed'): void
}
export interface ICreateWeekProps {
    modelValue: ICreateWeek
} 