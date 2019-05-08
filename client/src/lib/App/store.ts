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

interface activeItem {
  list: string;
  index: number
}

export class Store {
  @observable items: Item[] = [
    {
      name: "Bread",
      info: "Buy in Lidl",
      id: "sdfsdfsadfsdfdsf",
      checked: false
    },
    {
      name: "Cola",
      info: "",
      id: "gfvfsddwed",
      checked: false
    },
    {
      name: "Milk",
      info: "Buy in Tesco",
      id: "324rijdsojfddsaoid",
      checked: false
    },
    {
      name: "Beer",
      info: "",
      id: "fdswefi343fdsdf",
      checked: false
    },
    {
      name: "Beef",
      info: "1kg",
      id: "frefp43ifjdsfs",
      checked: false
    }
  ];
  @observable selected: Item[] = [
    {
      name: "Ham",
      info: "In slices",
      id: "43rpijdskjfna",
      checked: false
    },
    {
      name: "Rice",
      info: "",
      id: "e3rijfisdnc.kas3",
      checked: false
    },
    {
      name: "Potatoes",
      info: "Buy in Tesco",
      id: "43ifpjsdljnfew33",
      checked: false
    },
    {
      name: "Aples",
      info: "3kg",
      id: "ekflkdsdsaljd",
      checked: false
    }
  ];
  @observable costs: object[] = [];    ////
  @observable activeItem: activeItem = {
    list: "items",
    index: 0
  };
  @observable showAddDialog: boolean = false;
  @observable showEditDialog: boolean = false;
  @observable showDeleteDialog: boolean = false;
  @observable showItems: boolean = true;
  @observable showFinish: boolean = false;

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);
  toggleShowAddDialog = (): boolean =>
    (this.showAddDialog = !this.showAddDialog);
  toggleShowDeleteDialog = (): boolean =>
    (this.showDeleteDialog = !this.showDeleteDialog);
  toggleShowEditDialog = (data: ToggleEditItem): void => {
    this.showEditDialog = !this.showEditDialog;
    this.activeItem.list = data.list;
    this.activeItem.index = data.index;
  };
  addItem = (newItem: Item): Item[] =>
    (this.items = sortItemsByName([...this.items, newItem]));
  deleteItem = (index: number): Item[] =>
    (this.items = this.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    ));
  editItem = (data: EditItem):Item =>
    ((this as any)[data.list][data.index] = data.newItem);
  getItems = (): void => {
    fetch(server + "store/items", {
      mode: "cors",
      method: "GET"
    })
      .then(response => response.json())
      .then(items => (this.items = items));
  };
  getSelected = (items: string[]): void => {
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
  toggleCheckItems = (list: string, index: number): void => {
    (this as any)[list][index] = !(this as any)[list][index];
  // getSelected(selected);
  // changeSelectedOnServer(selected);
  }
  toggleShowFinishDialog = (): boolean => (this.showFinish = !this.showFinish);
  addCost = (cost: object): number => this.costs.push(cost);   ////////////////////////////////
}
