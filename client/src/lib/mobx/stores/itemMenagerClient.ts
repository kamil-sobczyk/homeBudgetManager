import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { ApiClient } from './apiClient';
import { observable } from 'mobx';

export type ListType = 'items' | 'selected';

export class ItemMenagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem = { list: 'items', index: 0 };

  setActiveItem = (index: number, list?: ListType): void => {
    if (list) {
      this.activeItem.list = list;
      this.activeItem.index = index;
    } else this.activeItem.index = index;
  };

  addItem = (newItem: Item): Item[] =>
    (this.store.items = sortItemsByName([...this.store.items, newItem]));

  deleteItem = (index: number): Item[] => {
    this.store.items = this.store.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    );
    this.store.apiClient.deleteItemsOnServer(index);
    return this.store.items;
  };

  editItem = (newItem: Item, list: ListType, index: number): void => {
    if (list === 'items') {
      this.store.items[index] = newItem;
    } else if (list === 'selected') {
      this.store.selected[index] = newItem;
    } else return;
  };

  toggleCheckItems = (list: ListType, index: number): void => {
    this.setActiveItem(index, list);
    if (list === 'items') {
      this.store.items[index].checked = !this.store.items[index].checked;
    } else if (list === 'selected') {
      this.store.selected[index].checked = !this.store.selected[index].checked;
    } else return;
    // changeSelectedOnServer(selected);
  };
  addCost = (cost: Cost): number => this.store.costs.push(cost); ////////////////////////////////
}
