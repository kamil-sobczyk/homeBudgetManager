import { Store } from '../rootStore';

import { observable } from 'mobx';
import { Income, IncomeCategoryType } from '../../interfaces';

export class IncomesManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable newIncome: Income = { category: 'gift', date: '', count: 0 };

  changeIncomeCategory = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    this.newIncome.category = target.value as IncomeCategoryType;
  };

  changeIncomeDate = (date: string) => {
    this.newIncome.date = date;
  };

  changeIncomeCount = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.newIncome.count = parseInt(target.value);
  };

  addNewIncome = (): void => {
    this.store.incomes.push(this.newIncome);
    // this.store.apiClient.addNewIncome(this.newIncome)
  };

  changeIncomeInfo = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.newIncome.info = target.value;
  };
}
