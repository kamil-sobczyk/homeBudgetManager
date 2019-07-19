import { Store } from '../rootStore';
import { observable } from 'mobx';

export class CalendarClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable datePicked: string = '';
  @observable calendarViewDate: string = '';
  @observable daysWithExpenses: number[] = [];

  setDatePicked = (date?: Date): string => {
    if(date){
      let dayString: string = String(date.toLocaleString('en-GB')).slice(0, 10);

      this.datePicked = dayString;
      return dayString;
    } else {
      this.datePicked = '';
      return '';
    }
  };

  getCalendarViewDate = (date: Date): string => {
    let calendarViewDate: string = String(date.toLocaleString('en-GB')).slice(
      0,
      10
    );

    this.calendarViewDate = calendarViewDate;
    // console.log(date)
    // console.log(this.calendarViewDate)
    return this.calendarViewDate;
  };
}
