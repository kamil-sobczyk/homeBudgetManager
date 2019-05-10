import { observable } from 'mobx';

import { Item } from '../interfaces';

import { ApiClient } from './stores/apiClient';

import { sortItemsByName } from '../reorderFunctions';

import { VisibityClient } from './stores/visibilityClient';
import { DnDClient } from './stores/dndClient';

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

export type ListType = 'items' | 'selected';

export class Store {
  constructor() {
    this.apiClient = new ApiClient(this);
    this.visibilityClient = new VisibityClient(this);
    this.dndClient = new DnDClient(this);
  }

  apiClient: ApiClient;
  visibilityClient: VisibityClient;
  dndClient: DnDClient;

  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: Cost[] = []; ////
  @observable activeItem: ActiveItem = {
    list: 'items',
    index: 0
  };
  addItem = (newItem: Item): Item[] =>
    (this.items = sortItemsByName([...this.items, newItem]));
  deleteItem = (index: number): Item[] => {
    this.items = this.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    );
    this.visibilityClient.toggleShowDeleteDialog();
    return this.items;
  };

  editItem = (newItem: Item, list: ListType, index: number): Item =>
    ((this as any)[list][index] = newItem);
  toggleCheckItems = (list: string, index: number): void => {
    (this as any)[list][index].checked = !(this as any)[list][index].checked; //////// use if
    // getSelected(selected);
    // changeSelectedOnServer(selected);
  };
  addCost = (cost: Cost): number => this.costs.push(cost); ////////////////////////////////
}
