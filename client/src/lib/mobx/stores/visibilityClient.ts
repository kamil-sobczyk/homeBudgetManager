import { Store } from '../rootStore';
import { observable } from 'mobx';

import { Cost, ListType } from '../../interfaces';

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

  toggleShowDeleteDialog = (list: ListType, index: number): void => {
    this.store.itemMenagerClient.setActiveItem(list, index);
    this.showDeleteDialog = !this.showDeleteDialog;
  };

  toggleShowEditDialog = (list: ListType, index: number): void => {
    this.store.itemMenagerClient.setActiveItem(list, index);
    this.showEditDialog = !this.showEditDialog;
  };

  toggleShowFailDialog = (): void => {
    this.showFailDialog = !this.showFailDialog;
  }
  

  toggleShowFinishDialog = (cost?: Cost): void => {
    this.showFinish = !this.showFinish;
    if (cost) this.store.itemMenagerClient.addCost(cost);
  };

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
