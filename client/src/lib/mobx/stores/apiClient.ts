import axios from 'axios';

import { Store } from '../rootStore';

import { Item, ListType, Cost } from '../../interfaces';
import { observable } from 'mobx';

const localhost = 'http://localhost:8080/';
const herokuApp = 'https://shopping-1111.herokuapp.com/';
const server = localhost;

interface Headers {
  token: string;
  id: string;
}

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable headers: Headers = {
    token: sessionStorage.googleToken || '',
    id: sessionStorage.id || ''
  };

  setUser = (token: string, id: string): void => {
    
    if (!sessionStorage.id) {
      sessionStorage.googleToken = token;
      sessionStorage.id = id;
    } else {
      this.headers.token = token;
      this.headers.id = id;
    }
  };

  getItems = async (): Promise<Item[]> =>
    await axios({
      method: 'get',
      url: server + 'store/items',
      headers: this.headers
    }).then(items => (this.store.items = items.data as Item[]));

  getSelected = async (): Promise<Item[]> =>
    await axios({
      method: 'get',
      url: server + 'store/selected',
      headers: this.headers
    }).then(selected => (this.store.selected = selected.data as Item[]));

  getCosts = async (): Promise<Cost[]> =>
    await axios({
      method: 'get',
      url: server + 'store/costs',
      headers: this.headers
    }).then(costs => (this.store.costs = costs.data as Cost[]));

  deleteItemOnServer = async (name: string): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/items',
      headers: this.headers,
      data: { name }
    });
  };

  editItemOnServer = async (
    list: ListType,
    oldItem: Item,
    newItem: Item
  ): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/' + list,
      headers: this.headers,
      data: { oldItem, newItem }
    });
  };

  reorderItemsOnServer = async (
    items: Item[],
    selected: Item[]
  ): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/',
      headers: this.headers,
      data: { items, selected }
    });
  };

  addCostOnServer = async (cost: Cost): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/costs',
      headers: this.headers,
      data: { cost }
    });
  };

  checkItemOnServer = async (item: Item): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/checked',
      headers: this.headers,
      data: { item }
    });
  };

  addItemOnServer = async (item: Item): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/items',
      headers: this.headers,
      data: { item }
    });
  };
}
