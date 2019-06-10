import axios from 'axios';

import { server } from '../../../../config';

import { Store } from '../rootStore';

import { Item, ListType, Cost } from '../../interfaces';
import { observable } from 'mobx';

// const server = 'http://www.superzbieracz.pl/';

const sortCosts = (costs: Cost[]): Cost[] => {
  return costs.sort((a: Cost, b: Cost): number => a.date.localeCompare(b.date));
};

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
    let usr = id;
    if (usr === '106261623878731601808') {
      usr = '102234771401894238200';
    }
    if (!sessionStorage.id) {
      sessionStorage.googleToken = token;
      sessionStorage.id = usr;
    } else {
      this.headers.token = token;
      this.headers.id = usr;
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
    }).then(
      costs => (this.store.costs = sortCosts(costs.data).reverse() as Cost[])
    );

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

  addShoppingItemOnServer = async (item: Item): Promise<void> => {
    await axios({
      method: 'post',
      url: server + 'store/items',
      headers: this.headers,
      data: { item }
    });
  };

  deleteCostOnServer = async (cost: Cost): Promise<void> => {
    await axios({
      method: 'delete',
      url: server + 'store/costs',
      headers: this.headers,
      data: { cost }
    })
  }
}
