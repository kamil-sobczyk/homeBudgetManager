import { Store } from './mobx/rootStore';

export type CategoryType = 'shopping' | 'bill' | 'health' | 'car' | 'other';

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
  category: CategoryType;
  info?: string | undefined;
}

export interface StoreProps {
  store: Store;
}
