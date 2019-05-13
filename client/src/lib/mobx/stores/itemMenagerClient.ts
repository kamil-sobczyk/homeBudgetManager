import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { observable } from 'mobx';

export type ListType = 'items' | 'selected';

export class ItemMenagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem = { list: 'items', index: 0 };

  setActiveItem = (list?: ListType, index?: number): void => {
    if (index) this.activeItem.index = index;
    if (list) this.activeItem.list = list;
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
    }

    this.store.apiClient.editItemsOnServer(list, index, newItem);
  };

  toggleCheckItems = (list: ListType, index: number): void => {
    this.setActiveItem(list, index);
    if (list === 'items') {
      this.store.items[index].checked = !this.store.items[index].checked;
    } else if (list === 'selected') {
      this.store.selected[index].checked = !this.store.selected[index].checked;
    } else return;
    this.store.apiClient.checkItemOnServer(list, index);
  };

  reorderItems = (items: Item[], selected: Item[]) => {
    this.store.items = items;
    this.store.selected = selected;
    this.store.apiClient.reorderItemsOnServer(items, selected);
  };

  addCost = (cost: Cost): void => {
    this.store.costs.push(cost);
    this.store.apiClient.addCostOnServer(cost);
  };
}
