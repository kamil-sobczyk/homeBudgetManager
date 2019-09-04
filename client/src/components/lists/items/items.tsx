import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../lib/interfaces';

import { IconButton } from '@rmwc/icon-button';
import '@rmwc/icon/icon.css';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { SortingMenu } from '../sortingMenu';
import { observable } from 'mobx';
import { removeCategoryDuplicates } from '../../../lib/mobx/stores/itemManagerClient';
import { TextField } from '@rmwc/textfield';

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
  deleteItem: (name: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
  areItemsEditable: boolean;
  showItems: boolean;
  items: Item[];
}

interface StyledContainerProps {
  showItems: boolean;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  @observable searchBarVisible: boolean = false;

  componentDidMount = () => {
    this.props.getItems();
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

    if (getChosenCategory('items') !== 'All') {
      return items.filter(
        (item: Item) => item.category === getChosenCategory('items')
      );
    } else {
      return items;
    }
  };

  render() {
    const {
      setVisibleDialog,
      setActiveItem,
      items,
      areItemsEditable
    } = this.props;

    return (
      <StyledContainer showItems={true}>
        <StyledButtonsContainer>
          <StyledListButtonsContainer>
            <StyledAddShoppingItemIconButton
              onClick={() => setVisibleDialog('AddShoppingItemDialog')}
              icon={{ icon: 'add_circle', size: 'xlarge' }}
            />
            <StyledSearchButton
              icon={{ icon: 'search', size: 'xlarge' }}
              onClick={() => this.toggleSearchBar()}
            />
            <SortingMenu
              categories={getCategories(items)}
              categorizeItems={this.categorizeItems}
            />
          </StyledListButtonsContainer>
        </StyledButtonsContainer>
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
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 400px;
  min-width: 150px;
  width: ${(props: StyledContainerProps) =>
    props.showItems ? '50vw' : '100vw'};
  margin: 5px;
`;

const StyledAddShoppingItemIconButton = styled(IconButton)`
  color: #4cad4f;
  padding: 0;
`;

const StyledSearchButton = styled(IconButton)`
  padding: 0;
  color: darkblue;
`;

export const StyledListButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  max-width: 30%;
`;
