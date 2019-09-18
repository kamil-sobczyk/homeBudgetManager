import * as React from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import styled from 'styled-components';

import { ListType, Item } from '../../../lib/interfaces';

import '@rmwc/icon/icon.css';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledContainer } from '../selected/selected';
import { ItemsTopButtons } from './buttonsContainers/topButtons';
import { removeCategoryDuplicates } from '../../../lib/mobx/stores/itemManagerClient';
import { ItemsBottomButtons } from './buttonsContainers/bottomButtons';
import { PagesManagerClient } from '../../../lib/mobx/stores/pagesManagerClient';

export const getCategories = (items: Item[]): string[] => {
  const itemsCategories: string[] = [
    'All',
    ...items.map((item: Item) => {
      if (item && item.category) {
        return item.category;
      } else return 'Others';
    })
  ];

  return removeCategoryDuplicates(itemsCategories);
};

interface ItemsProps {
  getItems: () => void;
  deleteItem: (name: string, info: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
  areItemsEditable: boolean;
  showItems: boolean;
  items: Item[];
  pagesManager: PagesManagerClient;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  @observable searchBarVisible: boolean = false;
  list: ListType = 'items';

  componentDidMount = (): void => {
    this.props.getItems();
  };

  updateList = (): void => this.forceUpdate();

  setNextPage = (): void => {
    const { setNextPage, getChosenPage, getMaxPage } = this.props.pagesManager;

    getChosenPage(this.list) <= getMaxPage(this.list)
      ? setNextPage(this.list)
      : null;

    this.updateList();
  };

  setPrevPage = (): void => {
    this.props.pagesManager.setPrevPage(this.list);
    this.updateList();
  };

  paginateItems = (items: Item[], startIndex: number): Item[] =>
    items.slice(startIndex, startIndex + 10);

  toggleSearchBar = (): void => {
    this.searchBarVisible = !this.searchBarVisible;
    this.updateList();
  };

  categorizeItems = (category: string): void => {
    this.props.setChosenCategory('items', category);
    this.updateList();
  };

  getCategorizedItems = (): Item[] => {
    const { items, getChosenCategory, pagesManager } = this.props;
    const startIndex = (pagesManager.getChosenPage(this.list) - 1) * 10;

    if (getChosenCategory('items') !== 'All') {
      const filteredItems = items.filter(
        (item: Item) => item.category === getChosenCategory('items')
      );
      pagesManager.setMaxPage(this.list, filteredItems);

      return this.paginateItems(filteredItems, startIndex);
    } else {
      return this.paginateItems(items, startIndex);
    }
  };

  setChosenCategory = (list: ListType, category: string): void => {
    const { setChosenCategory, pagesManager } = this.props;

    setChosenCategory(list, category);
    pagesManager.setChosenPage(this.list, 1);
  };

  render() {
    const {
      setVisibleDialog,
      setActiveItem,
      items,
      areItemsEditable,
      pagesManager
    } = this.props;

    pagesManager.setMaxPage(this.list, this.props.items);

    return (
      <StyledContainer showItems>
        <ItemsTopButtons
          items={items}
          toggleSearchBar={this.toggleSearchBar}
          setVisibleDialog={setVisibleDialog}
          setChosenCategory={this.setChosenCategory}
          updateList={this.updateList}
        />
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              setActiveItem={setActiveItem}
              setVisibleDialog={setVisibleDialog}
              items={this.getCategorizedItems()}
              provided={providedDroppable2}
              searchBarVisible={this.searchBarVisible}
              areItemsEditable={areItemsEditable}
            />
          )}
        </Droppable>
        <ItemsBottomButtons
          setNextPage={this.setNextPage}
          setPrevPage={this.setPrevPage}
          currentPage={pagesManager.getChosenPage(this.list)}
        />
      </StyledContainer>
    );
  }
}

export const StyledListButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
