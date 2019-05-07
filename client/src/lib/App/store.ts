import { Context } from "./Context";
import { observable } from "mobx";

import { Item } from "../../lib/interfaces";

import { sortItemsByName } from "../../functions/reorderFunctions";

const localhost = "http://0.0.0.0:8080/";
const privateList = "http://35.224.13.129/";
const publicDemo = "http://35.184.211.161/";
const server = localhost;

interface EditItem {
  list: string;
  index: number;
  newItem: Item;
}

interface ToggleEditItem {
  list: string;
  index: number;
}

export class Store {
  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: object[] = [];
  @observable activeItem: any = {
    list: "items",
    index: 0
  };
  @observable showAddDialog: boolean = false;
  @observable showEditDialog: boolean = false;
  @observable showDeleteDialog: boolean = false;
  @observable showItems: boolean = false;

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);
  toggleShowAddDialog = (): boolean =>
    (this.showAddDialog = !this.showAddDialog);
  toggleShowDeleteDialog = (): boolean =>
    (this.showDeleteDialog = !this.showDeleteDialog);
  toggleShowEditDialog = (data: ToggleEditItem): any => {
    this.showEditDialog = !this.showEditDialog;
    this.activeItem.list =  data.list;
    this.activeItem.index =  data.index;
  };
  addItem = (newItem: Item): Item[] =>
    (this.items = sortItemsByName([...this.items, newItem]));
  deleteItem = (index: number) =>
    (this.items = this.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    ));
  editItem = (data: EditItem) =>
    ((this as any)[data.list][data.index] = data.newItem);
  getItems = (): void => {
    fetch(server + "store/items", {
      mode: "cors",
      method: "GET"
    })
      .then(response => response.json())
      .then(items => (this.items = items));
  };
  getSelected = (items: string[]) => {
    fetch(server + "store/selected", {
      mode: "cors",
      method: "GET"
    })
      .then(response => response.json())
      .then(selected => (this.selected = selected));
  };
  getCosts = (): void => {
    fetch(server + "store/costs", {
      mode: "cors",
      method: "GET"
    })
      .then(response => response.json())
      .then(costs => (this.costs = costs));
  };
  addCost = (cost: object) => this.costs.push(cost);
}
