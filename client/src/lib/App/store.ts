import { Context } from "./Context";
import { observable } from "mobx";

import { Item } from "../../lib/interfaces";

import { sortItemsByName } from "../../functions/reorderFunctions";

const localhost = "http://0.0.0.0:8080/";
const privateList = "http://35.224.13.129/";
const publicDemo = "http://35.184.211.161/";
const server = localhost;

export class Store {
  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: object[] = [];
  @observable activeItem: object = {
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
  toggleShowEditDialog = (list: string, index: number): void => {
    this.showEditDialog = !this.showEditDialog;
    this.activeItem = { list, index };
  };
  addItem = (newItem: Item): Item[] =>
    (this.items = sortItemsByName([...this.items, newItem]));
  deleteItem = (index: number) =>
    (this.items = this.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    ));
  editItem = (list: string, index: number, newItem: Item) =>
    ((this as any)[list][index] = newItem);
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
