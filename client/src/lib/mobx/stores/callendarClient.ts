import { Store } from '../rootStore';
import { observable } from 'mobx';

export class CallendarClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable datePicked: string | Date = '';

  setDatePicked = (date: Date) =>
    (this.datePicked = date.toLocaleDateString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    }));
}
