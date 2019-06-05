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

  setDatePicked = (date: Date): string =>
    (this.datePicked = String(
      date.toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    ));

  getCalendarViewDate = (date: Date): string => {
    let calendarViewDate = String(date.toLocaleDateString());
    if (calendarViewDate[1] === '/') {
      calendarViewDate = `0${calendarViewDate}`;
    }
    if (calendarViewDate[4] === '/') {
      calendarViewDate = `${calendarViewDate.slice(
        0,
        3
      )}0${calendarViewDate.slice(3)}`;
    }

    this.calendarViewDate = `${calendarViewDate.substr(
      3,
      2
    )}/${calendarViewDate.substr(0, 2)}/${calendarViewDate.substr(6, 4)}`;

    return this.calendarViewDate;
  };
}
