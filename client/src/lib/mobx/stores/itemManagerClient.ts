import { Store } from '../rootStore';
import { ActiveItem, ListType } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';

import { observable, action, computed } from 'mobx';

const extractCategories = (items: Item[]) =>
  items.map((item: Item) => {
    if (item && item.category) {
      return item.category;
    } else return 'Others';
  });

export const removeCategoryDuplicates = (categories: string[]) =>
  categories.filter(
    (item: string, index: number) => categories.indexOf(item) === index
  );

interface ChosenCategories {
  items: string;
  selected: string;
}

export class ItemManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable activeItem: ActiveItem = { list: 'items', index: 0 };
  @observable newItem: Item = {
    name: '',
    info: '',
    id: '',
    checked: false,
    category: ''
  };
  @observable oldItem: Item = {
    name: '',
    info: '',
    id: '',
    checked: false,
    category: ''
  };
  @observable chosenCategories: ChosenCategories = {
    items: 'Any',
    selected: 'Any'
  };

  getChosenCategory = (list: ListType): string => this.chosenCategories[list];

  setChosenCategory = (list: ListType, category: string): void => {
    this.chosenCategories[list] = category;
  };

  getCategories = (): string[] => {
    const itemsCategories: string[] = [
      'Any',
      ...extractCategories(this.store.items),
      ...extractCategories(this.store.selected)
    ];

    return removeCategoryDuplicates(itemsCategories);
  };

  setOldItem = (): void => {
    this.oldItem =
      this.activeItem.list === 'items'
        ? Object.assign({}, this.store.items[this.activeItem.index])
        : Object.assign({}, this.store.selected[this.activeItem.index]);
  };

  changeNewItem = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    if (target.name === 'info') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: target.value,
        name: this.newItem.name,
        category: this.newItem.category
      };
    } else if (target.name === 'name') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: this.newItem.info,
        name: target.value,
        category: this.newItem.category
      };
    } else if (target.name === 'category' && target.value !== 'New category') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: this.newItem.info,
        name: this.newItem.name,
        category: target.value
      };
    } else if (target.name === 'newCat') {
      this.newItem = {
        checked: false,
        id: String(Date.now()),
        info: this.newItem.info,
        name: this.newItem.name,
        category: target.value
      };
    }
  };

  updateCurrentItemName = (name: string): void => {
    const { index } = this.activeItem;

    if (this.currentList && this.currentList[index]) {
      this.currentList[index].name = name;
    }
  };

  updateCurrentItemInfo = (info: string): void => {
    const { list, index } = this.activeItem;

    if (this.currentList && this.currentList[index]) {
      this.currentList[this.activeItem.index].info = info;
    }
  };

  @action setActiveItem = (list: ListType, index: number): void => {
    this.setOldItem();
    this.activeItem.index = index;
    this.activeItem.list = list;
  };

  AddShoppingItem = (): void => {
    const { setVisibleDialog } = this.store.visibilityClient;

    let allNames: string[] = [];
    const allItems: Item[] = [...this.store.selected, ...this.store.items];

    if (allItems.length > 0) {
      allNames = allItems.map(
        ({ name }) => name
      );
    }
    
    if (allNames.indexOf(this.newItem.name) < 0 && this.newItem.name !== '') {
      this.store.items = sortItemsByName([...this.store.items, this.newItem]);
      setVisibleDialog();
      this.store.apiClient.addShoppingItemOnServer(this.newItem);
    } else {
      setVisibleDialog('AddShoppingItemDialogFail');
    }
  };

  deleteItem = (name: string): Item[] => {
    this.store.items = this.store.items.filter(
      (item: Item) => item.name !== name
    );
    this.store.apiClient.deleteItemOnServer(name);
    this.store.visibilityClient.setVisibleDialog();

    return this.store.items;
  };

  editItem = (newItem: Item): void => {
    this.store.apiClient.editItemOnServer(
      this.activeItem.list,
      this.oldItem,
      newItem
    );
  };

  toggleCheckItems = (list: ListType, index: number): void => {
    this.setActiveItem(list, index);
    this.store.selected[index].checked = !this.store.selected[index].checked;

    this.store.apiClient.checkItemOnServer(this.store.selected[index]);
  };

  reorderItems = (items: Item[], selected: Item[]): void => {
    this.store.items = items;
    this.store.selected = selected;
    this.store.apiClient.reorderItemsOnServer(items, selected);
  };

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
}
