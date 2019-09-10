import { Store } from '../rootStore';

import { observable } from 'mobx';

import { langBase } from '../../langBase';

export class LanguagesClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  @observable lang = 'en';

  getChosenLanguage = (): string => this.lang;

  getLangBase = () => langBase;

  toggleChosenLanguage = (): void => {
    if (this.getChosenLanguage() === 'en') {
      this.lang = 'pl';
    } else {
      this.lang = 'en';
    }
  };
}
