import { Store } from './mobx/rootStore';

export type CostCategoryType = 'shopping' | 'bill' | 'health' | 'car' | 'other';

export type IncomeCategoryType =
  | 'salary'
  | 'gift'
  | 'other'
  | 'tax return'
  | 'social benefit';

export interface Item {
  category?: string;
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
  category: CostCategoryType;
  info?: string;
}

export interface Income {
  count: number;
  category: IncomeCategoryType;
  date: string;
  info?: string;
}

export interface StoreProps {
  store: Store;
}
