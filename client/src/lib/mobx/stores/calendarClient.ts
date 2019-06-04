import { Store } from '../rootStore';
import { observable } from 'mobx';

export class CalendarClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable datePicked: string = '';

  setDatePicked = (date: Date): string =>
    (this.datePicked = String(
      date.toLocaleDateString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    ));
}
