import { Store } from '../rootStore';
import { ListType } from '../../interfaces';

import { observable } from 'mobx';

export class PagesManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable chosenPages = {
    items: 1,
    selected: 1
  };

  setChosenPage = (list: ListType, page: number): void => {
    this.chosenPages[list] = page;
  };

  setNextPage = (list: ListType): void => {
    this.chosenPages[list]++;
  };

  setPrevPage = (list: ListType): void => {
    this.chosenPages[list]--;
  };

  getChosenPage = (list: ListType): number => this.chosenPages[list];
}
