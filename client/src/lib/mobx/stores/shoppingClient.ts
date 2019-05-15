import { Store } from '../rootStore';
import { Cost, ActiveItem, ListType } from '../../interfaces';

import { sortItemsByName } from '../../reorderFunctions';

import { Item } from '../../interfaces';
import { observable, action, computed } from 'mobx';

export class ShoppingClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable chosenItems = [];
  @observable count = 0;
  @observable date = String(
    new Date().toLocaleDateString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  );

  changeCounter = (event: React.FormEvent<EventTarget>): void => {
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


    this.store.selected.forEach((item: Item) => {
      if (item.checked) {
        newItems.push(item);
        chosenItems.push(item.name);
      } else newSelected.push(item);
    });

    const item: Cost = {chosenItems: this.chosenItems, count: this.count, date: this.date };
    item.count = Math.round(this.count);
    item.chosenItems = chosenItems;

    sortItemsByName(newItems);
    this.store.itemMenagerClient.reorderItems(newItems, newSelected);

    this.store.visibilityClient.toggleShowFinishDialog(item);
  };
}
