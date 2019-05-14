import { Store } from '../rootStore';
import { Cost, ActiveItem } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { observable, action } from 'mobx';

export type ListType = 'items' | 'selected';

export class ItemMenagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem: ActiveItem = { list: 'items', index: 0 };

  @action setActiveItem = (list: ListType, index: number): void => {
    console.log("set index", index)
    console.log("set list", list)

      this.store.activeItem.index = index;
      console.log("set index", index)
      console.log("set list", list)

    
    if (list) this.store.activeItem.list = list;
  };

  addItem = (newItem: Item): Item[] =>
    (this.store.items = sortItemsByName([...this.store.items, newItem]));

  deleteItem = (index: number): Item[] => {
    this.store.items = this.store.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    );
    this.store.apiClient.deleteItemOnServer(index);
    return this.store.items;
  };

  editItem = (newItem: Item, list: ListType, index: number): void => {
    if (list === 'items') {
      this.store.items[index] = newItem;
    } else if (list === 'selected') {
      this.store.selected[index] = newItem;
    } else return;

    this.store.apiClient.editItemOnServer(list, index, newItem);
  };

  toggleCheckItems = (list: ListType, index: number): void => {
    this.setActiveItem(list, index);
    if (list === 'items') {
      this.store.items[index].checked = !this.store.items[index].checked;
    } else if (list === 'selected') {
      this.store.selected[index].checked = !this.store.selected[index].checked;
    } else return;
    // changeSelectedOnServer(selected);
  };

  reorderItems = (items: Item[], selected: Item[]) => {
    this.store.items = items;
    this.store.selected = selected;
    this.store.apiClient.reorderItemsOnServer(items, selected);
  };

  addCost = (cost: Cost): void => {
    this.store.costs.push(cost);
    this.store.apiClient.addCostOnServer(cost);
  }
}
