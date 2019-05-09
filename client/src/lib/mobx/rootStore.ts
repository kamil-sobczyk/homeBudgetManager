import { observable } from 'mobx';

import { Item } from '../interfaces';

import { ApiClient } from './stores/apiClient';

import { sortItemsByName, reorder, move } from '../reorderFunctions';

import { DropResult } from 'react-beautiful-dnd';
import { VisibityClient } from './stores/visibilityClient';

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
  }

  apiClient: ApiClient;
  visibilityClient: VisibityClient;
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
  getCosts = (): void => {
    fetch(server + 'store/costs', {
      mode: 'cors',
      method: 'GET'
    })
      .then(response => response.json())
      .then(costs => (this.costs = costs));
  };
  toggleCheckItems = (list: string, index: number): void => {
    (this as any)[list][index].checked = !(this as any)[list][index].checked; //////// use if
    // getSelected(selected);
    // changeSelectedOnServer(selected);
  };
  getDndList = (id: string) => {
    if (id === 'droppable2') {
      return this.items;
    } else {
      return this.selected;
    }
  };
  reorderList = (list: string, reorderedList: Item[]): void => {
    ///////////////////////
    if (list === 'droppable') {
      this.selected = reorderedList;
    } else {
      this.items = reorderedList;
    }
  };
  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getDndList(source.droppableId),
        source.index,
        destination.index
      );

      this.reorderList(destination.droppableId, items);
    } else {
      const result = move(
        this.getDndList(source.droppableId),
        this.getDndList(destination.droppableId),
        source,
        destination
      );
      // result.droppable.forEach((item: Item) => (item.checked = false));

      this.selected = result.droppable;
      this.items = result.droppable2;

      // this.reorderLists()

      // getItems(sortItemsByName(result.droppable));
      // getSelected(result.droppable2);

      // changeItemsOnServer(result.droppable);
      // changeSelectedOnServer(result.droppable2);
    }
  };
  addCost = (cost: Cost): number => this.costs.push(cost); ////////////////////////////////
}
