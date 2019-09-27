import { Store } from '../rootStore';
import { Cost, Item } from '../../interfaces';

const fixChosenItems = (cost: Cost): Cost => {
  let parsedCost = cost;

  if (parsedCost.category !== 'shopping') {
    parsedCost.chosenItems = [parsedCost.category];
  } else {
    parsedCost.chosenItems = parsedCost.chosenItems[0].split(', ');
  }

  return parsedCost;
};

export class CostManagerClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  deleteCost = (cost: Cost): void => {
    console.log(JSON.stringify(cost));
    console.log(JSON.stringify(fixChosenItems(cost)));
    this.store.apiClient.deleteCostOnServer(fixChosenItems(cost));
    this.store.visibilityClient.setVisibleDialog();
  };

  editCost = (oldCost: Cost): void => {
    const {
      chosenItems,
      count,
      chosenCost,
      info,
      category
    } = this.store.shoppingClient;
    const newCost: Cost = {
      chosenItems: chosenItems.length ? chosenItems : chosenCost.chosenItems,
      count: count > 0 ? count : chosenCost.count,
      date:
        String(this.store.calendarClient.datePicked).length > 0
          ? this.store.calendarClient.datePicked
          : chosenCost.date,
      category: category,
      info: info.length > 0 ? info : chosenCost.info
    };

    this.store.apiClient.editCostOnServer(fixChosenItems(oldCost), newCost);
  };
}
