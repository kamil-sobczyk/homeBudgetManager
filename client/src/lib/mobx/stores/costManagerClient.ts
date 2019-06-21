import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

export class CostManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  deleteCost = (cost: Cost): void => {
      this.store.apiClient.deleteCostOnServer(cost);
      this.store.visibilityClient.setVisibleDialog();
  };
}
