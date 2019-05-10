import { Store, Cost } from '../rootStore';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';

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
    this.store.visibilityClient.toggleShowDeleteDialog();
    return this.store.items;
  };

  editItem = (newItem: Item, list: ListType, index: number): Item =>
    ((this as any)[list][index] = newItem);
  toggleCheckItems = (list: string, index: number): void => {
    (this as any)[list][index].checked = !(this as any)[list][index].checked; //////// use if
    // getSelected(selected);
    // changeSelectedOnServer(selected);
  };
  addCost = (cost: Cost): number => this.store.costs.push(cost); ////////////////////////////////
}
