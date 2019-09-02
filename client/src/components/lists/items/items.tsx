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

interface ItemsProps {
  getItems: () => void;
  deleteItem: (name: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, index: number) => void;
  getCategories: () => string[];
  setItems: (items: Item[]) => void;
  showItems: boolean;
  categorizedItems: Item[];
  items: Item[];
}

interface StyledContainerProps {
  showItems: boolean;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  @observable categorized: boolean = false;
  @observable chosenCategory: string = '';
  @observable categorizedItems: Item[] = this.props.items;

  componentDidMount = () => {
    this.props.getItems();
  };

  categorizeItems = (category: string): void => {
    this.chosenCategory = category;
    this.props.setItems(this.getCategorizedItems());
    this.categorized = true;
    // this.forceUpdate();
  };

  getCategorizedItems = () => {
    const { items, setItems } = this.props;
    if (this.chosenCategory !== 'Any' && this.chosenCategory !== '') {
      // this.props.getItems();
      return items.filter(
        (item: Item) => item.category === this.chosenCategory
      );
    }
    if (this.chosenCategory === 'Any' || this.chosenCategory === '') {
      this.categorized = false;
      // this.props.getItems();
      return items;
    } else return items;
  };

  render() {
    const {
      setVisibleDialog,
      categorizedItems,
      setActiveItem,
      getCategories,
      items
    } = this.props;

    return (
      <StyledContainer showItems={true}>
        <StyledButtonsContainer>
          <StyledListButtonsContainer>
            <StyledAddShoppingItemIconButton
              onClick={() => setVisibleDialog('AddShoppingItemDialog')}
              icon={{ icon: 'add_circle', size: 'xlarge' }}
            />
            <SortingMenu
              categories={getCategories()}
              categorizeItems={this.categorizeItems}
            />
          </StyledListButtonsContainer>
        </StyledButtonsContainer>
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              setActiveItem={setActiveItem}
              setVisibleDialog={setVisibleDialog}
              items={this.categorized ? categorizedItems : items}
              provided={providedDroppable2}
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

export const StyledListButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
