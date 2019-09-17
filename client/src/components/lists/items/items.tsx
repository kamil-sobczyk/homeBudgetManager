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
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  @observable searchBarVisible: boolean = false;
  @observable page: number = 1;
  @observable maxPage: number = this.props.items.length / 10;

  componentDidMount = () => {
    this.props.getItems();
  };

  updateList = () => this.forceUpdate();

  setNextPage = () => {
    this.page <= this.maxPage ? this.page++ : null;
    console.log(this.maxPage);
    this.forceUpdate();
  };

  setPrevPage = () => {
    this.page > 1 ? this.page-- : null;
    this.forceUpdate();
  };

  toggleSearchBar = () => {
    this.searchBarVisible = !this.searchBarVisible;
    this.forceUpdate();
  };

  categorizeItems = (category: string): void => {
    this.props.setChosenCategory('items', category);
    this.forceUpdate();
  };

  getCategorizedItems = () => {
    const { items, getChosenCategory } = this.props;
    const startIndex = (this.page - 1) * 10;

    if (getChosenCategory('items') !== 'All') {
      return items.filter(
        (item: Item) => item.category === getChosenCategory('items')
      );
    } else {
      return items.slice(startIndex, startIndex + 10);
    }
  };

  render() {
    const {
      setVisibleDialog,
      setActiveItem,
      items,
      areItemsEditable,
      setChosenCategory
    } = this.props;

    this.maxPage = this.props.items.length / 10;

    return (
      <StyledContainer showItems>
        <ItemsTopButtons
          items={items}
          toggleSearchBar={this.toggleSearchBar}
          setVisibleDialog={setVisibleDialog}
          setChosenCategory={setChosenCategory}
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
          currentPage={this.page}
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
