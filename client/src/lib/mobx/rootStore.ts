import { observable } from 'mobx';

import { Item, Cost, Income } from '../interfaces';

import { ApiClient } from './stores/apiClient';
import { VisibityClient } from './stores/visibilityClient';
import { DnDClient } from './stores/dndClient';
import { ItemManagerClient } from './stores/itemManagerClient';
import { ShoppingClient } from './stores/shoppingClient';
import { CalendarClient } from './stores/calendarClient';
import { CostManagerClient } from './stores/costManagerClient';
import { IncomesManagerClient } from './stores/incomesManagerClient';

export class Store {
  apiClient: ApiClient;
  visibilityClient: VisibityClient;
  dndClient: DnDClient;
  itemManagerClient: ItemManagerClient;
  shoppingClient: ShoppingClient;
  calendarClient: CalendarClient;
  costManagerClient: CostManagerClient;
  incomesManagerClient: IncomesManagerClient;

  constructor() {
    this.apiClient = new ApiClient(this);
    this.visibilityClient = new VisibityClient(this);
    this.dndClient = new DnDClient(this);
    this.itemManagerClient = new ItemManagerClient(this);
    this.shoppingClient = new ShoppingClient(this);
    this.calendarClient = new CalendarClient(this);
    this.costManagerClient = new CostManagerClient(this);
    this.incomesManagerClient = new IncomesManagerClient(this);
  }

  @observable items: Item[] = [];
  @observable selected: Item[] = [];
  @observable costs: Cost[] = [];
  @observable incomes: Income[] = [];
}
