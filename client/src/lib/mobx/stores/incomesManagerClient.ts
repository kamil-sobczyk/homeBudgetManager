import { Store } from '../rootStore';

import { observable, action, computed } from 'mobx';

export class IncomesManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

}