import axios, { AxiosResponse } from 'axios';

import { Store } from '../rootStore';

import { Item, ListType, Cost } from '../../interfaces';

const localhost = 'http://0.0.0.0:8080/';
const privateList = 'http://35.224.13.129/';
const publicDemo = 'http://35.184.211.161/';
const server = localhost;

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  addUser = async (user: string): Promise<any> =>
    await axios.post<AxiosResponse>(server + 'store', { data: { user } });

  getItems = async (): Promise<Item[]> =>
    await axios
      .get<Item[]>(server + 'store/items')
      .then(items => (this.store.items = items.data as Item[]));

  getSelected = async (): Promise<Item[]> =>
    await axios
      .get<Item[]>(server + 'store/selected')
      .then(selected => (this.store.selected = selected.data as Item[]));

  getCosts = async (): Promise<Cost[]> =>
    await axios
      .get<Cost[]>(server + 'store/costs')
      .then(costs => (this.store.costs = costs.data as Cost[]));

  deleteItemOnServer = async (index: number): Promise<void> => {
    await axios.delete(server + 'store/items', {
      data: { index: index, user: this.store.userEmail }
    });
  };

  editItemOnServer = async (
    list: ListType,
    index: number,
    newItem: Item
  ): Promise<void> => {
    await axios.put<Item>(server + 'store/' + list, {
      data: { index, newItem, user: this.store.userEmail }
    });
  };

  reorderItemsOnServer = async (
    items: Item[],
    selected: Item[]
  ): Promise<void> => {
    await axios.put<Item[]>(server + 'store/', {
      data: { items, selected, user: this.store.userEmail }
    });
  };

  addCostOnServer = async (cost: Cost): Promise<void> => {
    await axios.post<Cost>(server + 'store/costs', {
      data: { cost, user: this.store.userEmail }
    });
  };

  checkItemOnServer = async (list: ListType, index: number): Promise<void> => {
    await axios.put<Item>(server + 'store/checked', {
      data: { list, index, user: this.store.userEmail }
    });
  };

  addItemOnServer = async (item: Item): Promise<void> => {
    await axios.post<Item>(server + 'store/items', {
      data: { item },
      user: this.store.userEmail
    });
  };
}
