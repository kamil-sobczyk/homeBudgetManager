import { Store } from '../rootStore';
import { observable } from 'mobx';

export class VisibityClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable showItems: boolean = true;
  @observable showMoreMenu: boolean = false;
  @observable showDrawer: boolean = false;
  @observable showFailSnackbar = false;
  @observable visibleDialog = 'LoginDialog';

  setVisibleDialog = (dialog?: string): void => {
    if (!dialog) {
      this.visibleDialog = '';
    } else if (dialog === 'EditItemDialog') {
      this.store.itemMenagerClient.setOldItem();
      this.visibleDialog = dialog;
    } else {
      this.visibleDialog = dialog;
    }
  };

  toggleShowFailSnackbar = (): boolean =>
    (this.showFailSnackbar = !this.showFailSnackbar);

  toggleShowDrawer = (): boolean => (this.showDrawer = !this.showDrawer);

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
