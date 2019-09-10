import { Store } from './mobx/rootStore';

export type CostCategoryType = 'shopping' | 'bill' | 'health' | 'car' | 'other';

export type IncomeCategoryType =
  | 'salary'
  | 'gift'
  | 'other'
  | 'tax return'
  | 'social benefit';

export interface Item {
  category: string;
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

export interface DrawerLangData {
  addNewProduct: string;
  addNewIncome: string;
  addNewBill: string;
  showSpendings: string;
  turnEditing: {
    on: string;
    off: string;
  };
  about: string;
  log: string;
}

interface DialogButtonsLangData {
  cancel: string;
  ok: string;
}

interface SnackbarLangData {
  text: string;
  button?: string;
}

export interface ListLangData {
  searchBarText: string;
  categoryMenu: {
    category: string;
    all: string;
  };
}

export interface AddShoppingItemDialogLangData {
  title: string;
  fields: {
    newItem: string;
    info: string;
    category: string;
    newCategory: string;
  };
  buttons: DialogButtonsLangData;
  snackbar: SnackbarLangData;
}

export interface LangData {
  drawer: DrawerLangData;
  list: ListLangData;
  addShoppingItemDialog: AddShoppingItemDialogLangData;
  buttons: DialogButtonsLangData;
  snackbar: SnackbarLangData;
}
