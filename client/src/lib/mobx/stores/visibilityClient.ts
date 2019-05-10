import { Store } from '../rootStore';
import { observable } from 'mobx';

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

  toggleShowShoppingDialog = (): boolean =>
    (this.showShoppingDialog = !this.showShoppingDialog);
  toggleShowItems = (): boolean => (this.showItems = !this.showItems);
  toggleShowAddDialog = (): boolean =>
    (this.showAddDialog = !this.showAddDialog);
  toggleShowDeleteDialog = (): boolean =>
    (this.showDeleteDialog = !this.showDeleteDialog);
  toggleShowEditDialog = (list: string, index: number): void => {
    this.showEditDialog = !this.showEditDialog;
    this.store.activeItem.list = list;
    this.store.activeItem.index = index;
  };
  toggleShowFailDialog = (): boolean =>
    (this.showFailDialog = !this.showFailDialog);
  toggleShowFinishDialog = (): boolean => (this.showFinish = !this.showFinish);
}
