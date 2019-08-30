import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedSelected } from './provided/providedSelected';
import { StyledContainer, StyledListButtonsContainer } from '../items/items';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { IconButton } from '@rmwc/icon-button';
import styled from 'styled-components';
import { SortingMenu } from '../sortingMenu';
import { observable } from 'mobx';

interface SelectedProps {
  getSelected: () => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  setActiveItem: (list: ListType, index: number) => void;
  setVisibleDialog: (dialog?: string) => void;
  getCategories: () => string[];
  showItems: boolean;
  selected: Item[];
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  @observable chosenCategory: string = '';

  componentDidMount = () => {
    this.props.getSelected();
  };

  categorizeItems = (category: string): void => {
    this.chosenCategory = category;
    this.forceUpdate();
  };

  getCategorizedItems = () => {
    const { selected } = this.props;
    if (this.chosenCategory !== 'Any' && this.chosenCategory !== '') {
      return selected.filter(
        (item: Item) => item.category === this.chosenCategory
      );
    } else return selected;
  };

  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      setVisibleDialog,
      getCategories
    } = this.props;

    return (
      <StyledContainer showItems>
        <StyledButtonsContainer>
          <StyledListButtonsContainer>
            <StyledFinishShoppingButton
              onClick={() => setVisibleDialog('FinishShoppingDialog')}
              icon={{ icon: 'add_shopping_cart', size: 'xlarge' }}
            />
            <SortingMenu
              categories={getCategories()}
              categorizeItems={this.categorizeItems}
            />
          </StyledListButtonsContainer>
        </StyledButtonsContainer>
        <Droppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              setVisibleDialog={setVisibleDialog}
              selected={this.getCategorizedItems()}
              provided={provided}
            />
          )}
        </Droppable>
      </StyledContainer>
    );
  }
}

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;
