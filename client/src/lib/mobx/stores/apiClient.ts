import axios from 'axios';

import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

import { Item } from '../../interfaces';
import { ListType } from './itemMenagerClient';

const localhost = 'http://0.0.0.0:8080/';
const privateList = 'http://35.224.13.129/';
const publicDemo = 'http://35.184.211.161/';
const server = localhost;

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  getItems = async (): Promise<Item[]> =>
    await axios
      .get<Item[]>(server + 'store/items')
      .then(items => (this.store.items = items.data as Item[]));

  getSelected = async (): Promise<Item[]> =>
    axios
      .get<Item[]>(server + 'store/selected')
      .then(selected => (this.store.selected = selected.data as Item[]));

  getCosts = async (): Promise<Cost[]> =>
    axios
      .get<Cost[]>(server + 'store/costs')
      .then(response => response)
      .then(costs => (this.store.costs = costs.data as Cost[]));

  deleteItemsOnServer = async (index: number) => {
    ///type
    axios
      .delete(server + 'store/items', { data: { index: index } })
      .then(response => response)
      .then(state => state.data as Item[]);
  };

  editItemsOnServer = async (list: ListType, index: number, newItem: Item) => {
    axios
      .put<Item>(server + 'store/' + list, { data: { index, newItem } })
      .then(response => response)
      .then(state => state.data as Item);
  };

  reorderItemsOnServer = async (items: Item[], selected: Item[]) => {
    axios
      .put<Item[]>(server + 'store/', { data: { items, selected } })
      .then(response => response)
      .then(state => state.data as Item[]);
  };

  addCostOnServer = async (cost: Cost) => {
    axios
      .post<Cost>(server + 'store/costs', { data: { cost } })
      .then(response => response)
      .then(state => state.data as Cost);
  };

  checkItemOnServer = async (list: ListType, index: number) => {
    axios
      .put<Item>(server + 'store/checked', { data: { list, index } })
      .then(response => response)
      .then(state => state.data);
  };

  addItemOnServer = (item: Item) => {
    axios
      .post<Item>(server + 'store/items', { data: { item } })
      .then(response => response)
      .then(state => state.data as Item);
  };
}
