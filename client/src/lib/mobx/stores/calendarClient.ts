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

  setDatePicked = (date: Date): string => {
    let dayString = String(
      date.toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    ).replace(/\./g, '/');

    if (dayString[1] === '/') {
      dayString = `0${dayString}`;
    }

    if (dayString[4] === '/') {
      dayString = `${dayString.slice(0, 3)}0${dayString.slice(3)}`;
    }
    this.datePicked = dayString.slice(0, 10);
    return dayString;
  };

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
