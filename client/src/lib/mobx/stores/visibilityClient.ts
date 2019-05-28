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
  @observable visibleDialog = 'LoginDialog';

  setVisibleDialog = (dialog?: string): void => {
    if (!dialog) {
      this.visibleDialog = '';
    } else if (dialog === 'EditItemDialog') {
      console.log(
        (this.store as any)[this.store.itemMenagerClient.activeItem.list][
          this.store.itemMenagerClient.activeItem.index
        ]
      );
      // this.store.itemMenagerClient.setOldItem();
      this.visibleDialog = dialog;
    } else {
      this.visibleDialog = dialog;
    }
  };

  toggleShowDrawer = (): boolean => (this.showDrawer = !this.showDrawer);

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
