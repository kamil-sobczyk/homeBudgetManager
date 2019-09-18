import { Store } from '../rootStore';
import { Item, ListType } from '../../interfaces';

import { reorder, move, sortItemsByName } from '../../reorderFunctions';

import { DropResult } from 'react-beautiful-dnd';

export class DnDClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  filterByCategory = (list: ListType) => {
    const { chosenCategories } = this.store.itemManagerClient;

    if (list === 'items') {
      if (chosenCategories.items === 'All' || chosenCategories.items === '') {
        return this.store.items;
      } else
        return this.store.items.filter(
          (item: Item) => item.category === chosenCategories.items
        );
    } else {
      if (
        chosenCategories.selected === 'All' ||
        chosenCategories.selected === ''
      ) {
        return this.store.selected;
      } else
        return this.store.selected.filter(
          (item: Item) => item.category === chosenCategories.selected
        );
    }
  };

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
    const sourceListName =
      source.droppableId === 'droppable2' ? 'items' : 'selected';

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
        destination,
        this.store.itemManagerClient.chosenCategories[sourceListName],
        this.store.pagesManagerClient.getChosenPage(sourceListName)
      );

      result.droppable2.forEach(
        (item: Item): boolean => (item.checked = false)
      );

      this.store.selected = result.droppable;
      this.store.items = sortItemsByName(result.droppable2);
      reorderItemsOnServer(this.store.items, this.store.selected);
    }
  };
}
