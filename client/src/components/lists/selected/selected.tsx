import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedSelected } from './provided/providedSelected';
import {
  StyledContainer,
  StyledListButtonsContainer,
  getCategories
} from '../items/items';
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
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
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
    this.props.setChosenCategory('selected', category);
    this.forceUpdate();
  };

  getCategorizedItems = () => {
    const { selected, getChosenCategory } = this.props;
    if (getChosenCategory('selected') !== 'Any') {
      return selected.filter(
        (item: Item) => item.category === getChosenCategory('selected')
      );
    } else return selected;
  };

  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      setVisibleDialog,
      selected
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
              categories={getCategories(selected)}
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
