import axios, { AxiosResponse } from 'axios';

import { Store } from '../rootStore';

import { Item, ListType, Cost } from '../../interfaces';
import { observable } from 'mobx';

const localhost = 'http://localhost:8080/';
const herokuApp = 'https://shopping-1111.herokuapp.com/';
const server = localhost;

interface Headers {
  token: string;
}

export class ApiClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable headers: Headers = {
    token: localStorage.googleToken || ''
  };

  setUserToken = (token: string): void => {
    if (!localStorage.googleToken){
      localStorage.googleToken = token;
    } else this.headers.token = token;
  

  }

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

  deleteItemOnServer = async (index: number): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/items',
      headers: this.headers,
      data: { index }
    });
  };

  editItemOnServer = async (
    list: ListType,
    index: number,
    newItem: Item
  ): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/' + list,
      headers: this.headers,
      data: { index, newItem }
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

  checkItemOnServer = async (list: ListType, index: number): Promise<void> => {
    await axios({
      method: 'put',
      url: server + 'store/checked',
      headers: this.headers,
      data: { list, index }
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
