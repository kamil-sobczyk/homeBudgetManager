import { Store } from '../rootStore';
import { observable } from 'mobx';

export class VisibityClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable showItems: boolean = true;
  @observable showFailDialog: boolean = false;
  @observable showMoreMenu: boolean = false;
  @observable showDrawer: boolean = false;

  @observable visibleDialog = '';

  setVisibleDialog = (dialog?: string): string => !dialog? this.visibleDialog = '' : this.visibleDialog = dialog;

  toggleShowDrawer = (): boolean => (this.showDrawer = !this.showDrawer);

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);

  toggleShowFailDialog = (): void => {
    this.showFailDialog = !this.showFailDialog;
  };

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
