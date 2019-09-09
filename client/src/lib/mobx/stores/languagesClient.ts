import { Store } from '../rootStore';

import { observable, action, computed } from 'mobx';

export class LanguagesClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  @observable chosenLanguage = 'pl';
}
