import { Store } from './mobx/rootStore';

export interface Item {
  name: string;
  checked: boolean;
  id: string;
  info: string;
}

export type ListType = 'items' | 'selected';

export interface ActiveItem {
  list: ListType;
  index: number;
}

export interface Cost {
  count: number;
  chosenItems: string[];
  date: string;
  bill?: boolean;
}

export interface StoreProps {
  store: Store;
}
