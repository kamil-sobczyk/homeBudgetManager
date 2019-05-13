import { Store } from '../rootStore';
import { Item } from '../../interfaces';

import { reorder, move, sortItemsByName } from '../../reorderFunctions';

import { DropResult } from 'react-beautiful-dnd';

export class DnDClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  getDndList = (id: string): Item[] => {
    if (id === 'droppable2') {
      return this.store.items;
    } else {
      return this.store.selected;
    }
  };
  reorderList = (list: string, reorderedList: Item[]): void => {
    if (list === 'droppable') {
      this.store.selected = reorderedList;
    } else {
      this.store.items = reorderedList;
    }
  };
  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;
    const { reorderItemsOnServer } = this.store.apiClient;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getDndList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId !== 'droppable2') {
        this.reorderList(destination.droppableId, items);
        reorderItemsOnServer(this.store.items, this.store.selected);
      }
    } else {
      const result = move(
        this.getDndList(source.droppableId),
        this.getDndList(destination.droppableId),
        source,
        destination
      );

      result.droppable.forEach((item: Item) => (item.checked = false));
      this.store.selected = result.droppable;
      this.store.items = sortItemsByName(result.droppable2);
      reorderItemsOnServer(this.store.items, this.store.selected);
    }
  };
}
