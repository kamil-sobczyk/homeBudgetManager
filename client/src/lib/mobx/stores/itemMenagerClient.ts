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

  addItem = (newItem: Item): Item[] =>
    (this.store.items = sortItemsByName([...this.store.items, newItem]));
  deleteItem = (index: number): Item[] => {
    this.store.items = this.store.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    );
    return this.store.items;
  };

  editItem = (newItem: Item, list: ListType, index: number): void => {
    if (list === 'items') {
      this.store.items[index] = newItem;
    } else if (list === 'selected') {
      this.store.selected[index] = newItem;
    } else return;
  };
  toggleCheckItems = (list: string, index: number): void => {
    if (list === 'items') {
      this.store.items[index].checked = !this.store.items[index].checked;
    } else if (list === 'selected') {
      this.store.selected[index].checked = !this.store.selected[index].checked;
    } else return;
    // getSelected(selected);
    // changeSelectedOnServer(selected);
  };
  addCost = (cost: Cost): number => this.store.costs.push(cost); ////////////////////////////////
}
