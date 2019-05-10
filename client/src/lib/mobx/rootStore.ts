import { observable } from 'mobx';

import { Item } from '../interfaces';

import { ApiClient } from './stores/apiClient';
import { VisibityClient } from './stores/visibilityClient';
import { DnDClient } from './stores/dndClient';
import { ItemMenagerClient } from './stores/itemMenagerClient';

const localhost = 'http://0.0.0.0:8080/';
const privateList = 'http://35.224.13.129/';
const publicDemo = 'http://35.184.211.161/';
const server = localhost;

export interface ActiveItem {
  list: string;
  index: number;
}

export interface Cost {
  count: number;
  chosenItems: string[];
  date: string;
}

export class Store {
  constructor() {
    this.apiClient = new ApiClient(this);
    this.visibilityClient = new VisibityClient(this);
    this.dndClient = new DnDClient(this);
    this.itemMenagerClient = new ItemMenagerClient(this);
  }

  apiClient: ApiClient;
  visibilityClient: VisibityClient;
  dndClient: DnDClient;
  itemMenagerClient: ItemMenagerClient;

  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: Cost[] = []; ////
  @observable activeItem: ActiveItem = {
    list: 'items',
    index: 0
  };
  
}
