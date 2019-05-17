import { Store } from '../rootStore';
import { observable } from 'mobx';

import { Cost, ListType } from '../../interfaces';

export class VisibityClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable showAddItemDialog: boolean = false;
  @observable showEditDialog: boolean = false;
  @observable showdeleteItemDialog: boolean = false;
  @observable showSpendingsDialog: boolean = false;
  @observable showItems: boolean = true;
  @observable showFinish: boolean = false;
  @observable showFailDialog: boolean = false;
  @observable showMoreMenu: boolean = false;
  @observable showAddBillDialog: boolean = false;

  toggleShowAddBillDialog = (): boolean =>
    (this.showAddBillDialog = !this.showAddBillDialog);

  toggleShowSpendingsDialog = (): boolean =>
    (this.showSpendingsDialog = !this.showSpendingsDialog);

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);

  toggleshowAddItemDialog = (): boolean =>
    (this.showAddItemDialog = !this.showAddItemDialog);

  toggleShowDeleteItemDialog = (list: ListType, index: number): void => {
    this.store.itemMenagerClient.setActiveItem(list, index);
    this.showdeleteItemDialog = !this.showdeleteItemDialog;
  };

  toggleShowEditDialog = (list: ListType, index: number): void => {
    this.store.itemMenagerClient.setActiveItem(list, index);
    this.showEditDialog = !this.showEditDialog;
  };

  toggleShowFailDialog = (): void => {
    this.showFailDialog = !this.showFailDialog;
  };

  toggleShowFinishShoppingDialog = (cost?: Cost): void => {
    this.showFinish = !this.showFinish;
    if (cost) this.store.itemMenagerClient.addCost(cost);
  };

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
