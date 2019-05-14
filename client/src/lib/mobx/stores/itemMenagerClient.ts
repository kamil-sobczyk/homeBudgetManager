import { Store } from '../rootStore';
import { Cost, ActiveItem } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { observable, action, computed } from 'mobx';

export type ListType = 'items' | 'selected';

export class ItemMenagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem: ActiveItem = { list: 'items', index: 0 };

  @computed get currentList(): Item[] | undefined {
    switch (this.activeItem.list) {
      case 'items':
        return this.store.items;
      case 'selected':
        return this.store.selected;
      default:
        return undefined;
    }
  }

  @computed get currentItemName(): string | undefined {
    if (this.currentList && this.currentList[this.activeItem.index]) {
      return this.currentList[this.activeItem.index].name;
    }
    return undefined;
  }

  @computed get currentItemInfo(): string | undefined {
    if (this.currentList && this.currentList[this.activeItem.index]) {
      return this.currentList[this.activeItem.index].info;
    }

    return undefined;
  }

  updateCurrentItemName = (name: string): void => {
    const { list, index } = this.activeItem;
    if (this.currentList && this.currentList[index]) {
      this.currentList[index].name = name;
      this.store.apiClient.editItemOnServer(
        list,
        index,
        this.currentList[index]
      );
    }
  };

  updateCurrentItemInfo = (info: string): void => {
    const { list, index } = this.activeItem;
    if (this.currentList && this.currentList[this.activeItem.index]) {
      this.currentList[this.activeItem.index].info = info;
      this.store.apiClient.editItemOnServer(
        list,
        index,
        this.currentList[index]
      );
    }
  };

  @action setActiveItem = (list: ListType, index: number): void => {
    this.activeItem.index = index;
    this.activeItem.list = list;
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
    this.store.apiClient.checkItemOnServer(list, index);
  };

  reorderItems = (items: Item[], selected: Item[]): void => {
    this.store.items = items;
    this.store.selected = selected;
    this.store.apiClient.reorderItemsOnServer(items, selected);
  };

  addCost = (cost: Cost): void => {
    this.store.costs.push(cost);
    this.store.apiClient.addCostOnServer(cost);
  };
}
