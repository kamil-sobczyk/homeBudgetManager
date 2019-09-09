import { Store } from '../rootStore';

import { observable } from 'mobx';

import {langBase} from '../../langBase';

console.log(langBase)

export class LanguagesClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  @observable lang = 'en';

  getChosenLanguage = () => this.lang;

  toggleChosenLanguage = () => {
    if (this.getChosenLanguage() === 'en') {
      this.lang = 'pl';
    } else {
      this.lang = 'en';
    }
  };
}
