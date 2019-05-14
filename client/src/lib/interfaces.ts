import { Store } from './mobx/rootStore';
import { ListType } from './mobx/stores/itemMenagerClient';

export interface Item {
  name: string;
  checked: boolean;
  id: string;
  info: string;
}

export interface ActiveItem {
  list: ListType;
  index: number;
}

export interface Cost {
  count: number;
  chosenItems: string[];
  date: string;
}

export interface StoreProps {
  store: Store;
}
