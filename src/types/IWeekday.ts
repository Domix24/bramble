export interface IWeekday {
    day: string,
    hour: {
        planned: string,
        realised: string
    },
    start: Date,
    end: {
        planned: Date,
        realised: Date
    },
    lunch: {
        start: Date,
        end: Date,
    } 
}