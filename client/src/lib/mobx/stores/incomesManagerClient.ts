import { Store } from '../rootStore';

import { observable } from 'mobx';
import { Income, IncomeCategoryType } from '../../interfaces';

export class IncomesManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  private readonly initialIncome: Income = { category: 'gift', date: '', count: 0 };

  @observable newIncome: Income = { category: 'gift', date: '', count: 0 };

  changeIncomeCategory = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    this.newIncome.category = target.value as IncomeCategoryType;
  };

  changeIncomeCount = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.newIncome.count = parseInt(target.value);
  };

  addNewIncome = (): void => {
    this.store.visibilityClient.setVisibleDialog('IncomesDialog');
    this.newIncome.date = this.store.calendarClient.datePicked;
    this.store.incomes.push(this.newIncome);
    this.store.apiClient.addNewIncome(this.newIncome)
    this.newIncome = this.initialIncome;
  };

  changeIncomeInfo = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.newIncome.info = target.value;
  };
}
