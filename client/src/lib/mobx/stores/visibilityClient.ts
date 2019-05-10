import { Store } from '../rootStore';
import { observable } from 'mobx';

import { ListType } from './itemMenagerClient';

export class VisibityClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable showAddDialog: boolean = false;
  @observable showEditDialog: boolean = false;
  @observable showDeleteDialog: boolean = false;
  @observable showShoppingDialog: boolean = false;
  @observable showItems: boolean = true;
  @observable showFinish: boolean = false;
  @observable showFailDialog: boolean = false;
  @observable showMoreMenu: boolean = false;

  toggleShowShoppingDialog = (): boolean =>
    (this.showShoppingDialog = !this.showShoppingDialog);
  toggleShowItems = (): boolean => (this.showItems = !this.showItems);
  toggleShowAddDialog = (): boolean =>
    (this.showAddDialog = !this.showAddDialog);
  toggleShowDeleteDialog = (index?: number, list?: ListType): void => {
    this.showDeleteDialog = !this.showDeleteDialog;
    // this.store.activeItem.list = list;
    if (index) this.store.itemMenagerClient.activeItem.index = index;
  };
  toggleShowEditDialog = (list: ListType, index: number): void => {
    this.showEditDialog = !this.showEditDialog;
    this.store.itemMenagerClient.activeItem.list = list;
    this.store.itemMenagerClient.activeItem.index = index;
  };
  toggleShowFailDialog = (): boolean =>
    (this.showFailDialog = !this.showFailDialog);
  toggleShowFinishDialog = (): boolean => (this.showFinish = !this.showFinish);
  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
