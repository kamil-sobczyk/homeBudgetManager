import { observable } from "mobx";

import { Item } from "../../lib/interfaces";

import {
  sortItemsByName,
  reorder,
  move
} from "../../functions/reorderFunctions";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

const localhost = "http://0.0.0.0:8080/";
const privateList = "http://35.224.13.129/";
const publicDemo = "http://35.184.211.161/";
const server = localhost;

export interface ActiveItem {
  list: string;
  index: number;
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
  @observable costs: object[] = []; ////
  @observable activeItem: ActiveItem = {
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
  toggleShowEditDialog = (list: string, index: number): void => {
    this.showEditDialog = !this.showEditDialog;
    this.activeItem.list = list;
    this.activeItem.index = index;
  };
  addItem = (newItem: Item): Item[] =>
    (this.items = sortItemsByName([...this.items, newItem]));
  deleteItem = (index: number): Item[] =>{
    (this.items = this.items.filter(
      (item: Item, itemIndex: number) => itemIndex !== index
    ));
    this.toggleShowDeleteDialog();
    return this.items;
  }
    
  editItem = (newItem: Item, list: string, index: number): Item =>
    ((this as any)[list][index] = newItem);
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
  };
  getDndList = (id: string) => {
    if (id === "items") {
      return this.items;
    }
    return this.selected;
  };
  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;
    const { getItems, getSelected } = this;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getDndList(source.droppableId),
        source.index,
        destination.index
      );
      if (
        JSON.stringify(this.items).indexOf(JSON.stringify((items as any)[0])) <
        0
      ) {
        // getSelected(items);
        //   changeSelectedOnServer(items);
      }
    } else {
      const result: any = move(
        this.getDndList(source.droppableId),
        this.getDndList(destination.droppableId),
        source,
        destination
      );
      result.droppable.forEach((item: Item) => (item.checked = false));

      // getItems(sortItemsByName(result.droppable));
      // getSelected(result.droppable2);

      // changeItemsOnServer(result.droppable);
      // changeSelectedOnServer(result.droppable2);
    }
  };
  toggleShowFinishDialog = (): boolean => (this.showFinish = !this.showFinish);
  addCost = (cost: object): number => this.costs.push(cost); ////////////////////////////////
}
