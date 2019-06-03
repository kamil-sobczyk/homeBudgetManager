import { observable } from 'mobx';

import { Item, Cost } from '../interfaces';

import { ApiClient } from './stores/apiClient';
import { VisibityClient } from './stores/visibilityClient';
import { DnDClient } from './stores/dndClient';
import { ItemMenagerClient } from './stores/itemMenagerClient';
import { ShoppingClient } from './stores/shoppingClient';
import { CallendarClient } from './stores/callendarClient';

export class Store {
  constructor() {
    this.apiClient = new ApiClient(this);
    this.visibilityClient = new VisibityClient(this);
    this.dndClient = new DnDClient(this);
    this.itemMenagerClient = new ItemMenagerClient(this);
    this.shoppingClient = new ShoppingClient(this);
    this.callendarClient = new CallendarClient(this);
  }

  apiClient: ApiClient;
  visibilityClient: VisibityClient;
  dndClient: DnDClient;
  itemMenagerClient: ItemMenagerClient;
  shoppingClient: ShoppingClient;
  callendarClient: CallendarClient;

  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: Cost[] = [];
}
