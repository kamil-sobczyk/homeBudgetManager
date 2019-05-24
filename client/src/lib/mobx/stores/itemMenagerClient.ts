import { Store } from '../rootStore';
import { Cost, ActiveItem, ListType } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { observable, action, computed } from 'mobx';

export class ItemMenagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem: ActiveItem = { list: 'items', index: 0 };
  @observable newItem: Item = { name: '', info: '', id: '', checked: false };

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

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    if (target.name === 'info') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: target.value,
        name: this.newItem.name,
      };
      return;
    } else if (target.name === 'name') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: this.newItem.info,
        name: target.value,
      };
    }
  };

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
    if (this.currentList && this.currentList[index]) {
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

  addItem = (): void => {
    const { setVisibleDialog } = this.store.visibilityClient;

    const allNames = [...this.store.selected, ...this.store.items].map(
      ({ name }) => name
    );

    if (allNames.indexOf(this.newItem.name) < 0 && this.newItem.name !== '') {
      this.store.items = sortItemsByName([...this.store.items, this.newItem]);
      setVisibleDialog();
      this.store.apiClient.addItemOnServer(this.newItem);
    } else {
      setVisibleDialog('FailDialog');
    }
  };

  deleteItem = (index: number): Item[] => {
    this.store.items = this.store.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    );
    this.store.apiClient.deleteItemOnServer(index);
    this.store.visibilityClient.setVisibleDialog();
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
}
