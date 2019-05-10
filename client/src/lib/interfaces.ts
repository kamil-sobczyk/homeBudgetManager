import { Store } from './mobx/rootStore';

export interface Item {
  name: string;
  checked: boolean;
  id: string;
  info: string;
}

export interface ActiveItem {
  list: string;
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
