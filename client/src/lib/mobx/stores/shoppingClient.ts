import { CategoryType, Item } from './../../interfaces';
import { Store } from '../rootStore';
import { Cost } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { observable } from 'mobx';

export class ShoppingClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable chosenItems: string[] = [];
  @observable count: number = 0;
  @observable date: Date = new Date();
  @observable category: CategoryType = 'bill';

  addCost = (cost: Cost): void => {
    this.store.costs.unshift(cost);
    this.store.apiClient.addCostOnServer(cost);
  };

  addNewSpending = () => {
    const billCost: Cost = {
      chosenItems: this.chosenItems,
      count: this.count,
      date: String(
        new Date().toLocaleDateString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit'
        })
      ),
      category: this.category
    };

    this.store.costs.unshift(billCost);
    this.store.apiClient.addCostOnServer(billCost);
    this.store.visibilityClient.setVisibleDialog();
  };

  changeNewSpendingName = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    let chosenValue: CategoryType;

    if (target.value === "Bill") chosenValue = 'bill';
    else if (target.value === 'Health care') chosenValue = 'health';
    else if (target.value === 'Car exploatation') chosenValue = 'car';
    else chosenValue = 'bill';
    
    this.chosenItems[0] = chosenValue;
    this.category = chosenValue;

  };

  changeNewSpendingNameCounter = (
    event: React.FormEvent<EventTarget>
  ): void => {
    const target = event.target as HTMLInputElement;

    if (parseInt(target.value) > 0) {
      this.count = parseInt(target.value);
    } else {
      target.value = '0';
      this.count = 0;
    }
  };

  finishShopping = (): void => {
    if (this.count < 1) return;

    const newSelected: Item[] = [];
    let newItems: Item[] = [];
    const chosenItems: string[] = [];
    newItems = this.store.items;

    this.store.selected.forEach((item: Item) => {
      if (item.checked) {
        newItems.push(item);
        chosenItems.push(item.name);
      } else newSelected.push(item);
    });

    const cost: Cost = {
      chosenItems: this.chosenItems,
      count: this.count,
      date: String(
        new Date().toLocaleDateString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit'
        })
      ),
      category: 'shopping'
    };
    cost.count = Math.round(this.count);
    this.count = 0;
    cost.chosenItems = chosenItems;

    this.addCost(cost);
    sortItemsByName(newItems);
    this.store.itemMenagerClient.reorderItems(newItems, newSelected);

    this.store.visibilityClient.setVisibleDialog();
  };
}
