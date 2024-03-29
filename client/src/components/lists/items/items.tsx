import * as React from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import styled from 'styled-components';

import { ListType, Item } from '../../../lib/interfaces';

import '@rmwc/icon/icon.css';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledContainer } from '../selected/selected';
import { ItemsTopButtons } from './topButtons';
import { removeCategoryDuplicates } from '../../../lib/mobx/stores/itemManagerClient';
import { BottomButtons } from '../bottomButtons';
import { PaginationManagerClient } from '../../../lib/mobx/stores/paginationManagerClient';

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
  pagesManager: PaginationManagerClient;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  @observable private searchBarVisible: boolean = false;
  @observable private paginationVisible: boolean = true;
  private readonly list: ListType = 'items';

  componentDidMount = (): void => {
    this.props.getItems();
  };

  private updateList = (): void => this.forceUpdate();

  private getCategorizedItems = (): Item[] => {
    const { items, getChosenCategory, pagesManager } = this.props;
    const startIndex = (pagesManager.getChosenPage(this.list) - 1) * 10;

    if (getChosenCategory(this.list) !== 'All') {
      const filteredItems = items.filter(
        (item: Item) => item.category === getChosenCategory(this.list)
      );
      pagesManager.setMaxPage(this.list, filteredItems);

      return this.paginateItems(filteredItems, startIndex);
    } else {
      return this.paginateItems(items, startIndex);
    }
  };

  private setChosenCategory = (list: ListType, category: string): void => {
    const { setChosenCategory, pagesManager } = this.props;

    setChosenCategory(list, category);
    pagesManager.setChosenPage(this.list, 1);
  };

  private setPaginationVisible = (value: boolean) => {
    this.paginationVisible = value;
  };

  private resetPagination = (): void => {
    this.props.pagesManager.setChosenPage(this.list, 1);
  };

  private toggleSearchBar = (): void => {
    this.searchBarVisible = !this.searchBarVisible;
    this.updateList();
  };

  private categorizeItems = (category: string): void => {
    this.props.setChosenCategory('items', category);
    this.updateList();
  };

  private setNextPage = (): void => {
    const { setNextPage, getChosenPage, getMaxPage } = this.props.pagesManager;

    getChosenPage(this.list) <= getMaxPage(this.list) && setNextPage(this.list);

    this.updateList();
  };

  private setPrevPage = (): void => {
    this.props.pagesManager.setPrevPage(this.list);
    this.updateList();
  };

  private paginateItems = (items: Item[], startIndex: number): Item[] =>
    items.slice(startIndex, startIndex + 10);

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
              allItems={items}
              provided={providedDroppable2}
              searchBarVisible={this.searchBarVisible}
              areItemsEditable={areItemsEditable}
              resetPagination={this.resetPagination}
              setPaginationVisible={this.setPaginationVisible}
            />
          )}
        </Droppable>
        {this.paginationVisible && (
          <BottomButtons
            setNextPage={this.setNextPage}
            setPrevPage={this.setPrevPage}
            currentPage={pagesManager.getChosenPage(this.list)}
            areItems={true}
          />
        )}
      </StyledContainer>
    );
  }
}
