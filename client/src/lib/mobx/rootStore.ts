import { observable, computed } from 'mobx';

import { Item, ActiveItem, Cost } from '../interfaces';

import { ApiClient } from './stores/apiClient';
import { VisibityClient } from './stores/visibilityClient';
import { DnDClient } from './stores/dndClient';
import { ItemMenagerClient } from './stores/itemMenagerClient';

const localhost = 'http://0.0.0.0:8080/';
const privateList = 'http://35.224.13.129/';
const publicDemo = 'http://35.184.211.161/';
const server = localhost;

export class Store {
  constructor() {
    this.apiClient = new ApiClient(this);
    this.visibilityClient = new VisibityClient(this);
    this.dndClient = new DnDClient(this);
    this.itemMenagerClient = new ItemMenagerClient(this);
  }

  apiClient: ApiClient;
  visibilityClient: VisibityClient;
  dndClient: DnDClient;
  itemMenagerClient: ItemMenagerClient;

  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: Cost[] = []; ////

  @observable activeItem: ActiveItem = { list: 'items', index: 0 };

  @computed get currentList(): Item[] | undefined {
    switch(this.activeItem.list) {
      case 'items': return this.items;
      case 'selected': return this.selected;
      default: return undefined;
    }
  }

  @computed get currentItemName(): string | undefined {
    console.log('arek info', this.currentList, this.activeItem);
    if (this.currentList && this.currentList[this.activeItem.index]) {
      return this.currentList[this.activeItem.index].name;
    }
console.log("no return")
    return undefined;
  }

  @computed get currentItemInfo(): string | undefined {
    if (this.currentList && this.currentList[this.activeItem.index]) {
      return this.currentList[this.activeItem.index].info;
    }

    return undefined;
  }

  updateCurrentItemName(name: string): void {
    console.log("curr list", this.currentList)
    console.log("curr []", this.activeItem.index)
    if (this.currentList && this.currentList[this.activeItem.index]) {
      this.currentList[this.activeItem.index].name = name;
    }
  }

  updateCurrentItemInfo(info: string): void {
    if (this.currentList && this.currentList[this.activeItem.index]) {
      this.currentList[this.activeItem.index].info = info;
    }
  }
}
