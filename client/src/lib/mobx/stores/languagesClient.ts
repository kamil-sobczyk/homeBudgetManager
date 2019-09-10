import { Store } from '../rootStore';

import { observable } from 'mobx';

import { langBase } from '../../langBase';

export class LanguagesClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  @observable lang = 'en';

  getChosenLanguage = () =>
    localStorage.getItem('lang') ? localStorage.getItem('lang') : this.lang;

  getLangBase = () => langBase;

  toggleChosenLanguage = (): void => {
    if (this.getChosenLanguage() === 'en') {
      localStorage.setItem('lang', 'pl');
      this.lang = 'pl';
    } else {
      localStorage.setItem('lang', 'en');
      this.lang = 'en';
    }
  };
}
