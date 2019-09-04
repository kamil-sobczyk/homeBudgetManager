import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../../lib/interfaces';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedSelected } from './provided/providedSelected';
import { StyledListButtonsContainer, getCategories } from '../items/items';
import { StyledButtonsContainer } from '../../listBox/listsContainer';
import { IconButton } from '@rmwc/icon-button';
import styled from 'styled-components';
import { SortingMenu } from '../sortingMenu';

interface StyledContainerProps {
  showItems?: boolean;
}

interface SelectedProps {
  getSelected: () => void;
  toggleCheckItems: (list: ListType, id: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
  areItemsEditable: boolean;
  showItems: boolean;
  selected: Item[];
}

@observer
export class Selected extends React.Component<SelectedProps, {}> {
  componentDidMount = () => {
    this.props.getSelected();
  };

  categorizeItems = (category: string): void => {
    this.props.setChosenCategory('selected', category);
    this.forceUpdate();
  };

  getCategorizedItems = () => {
    const { selected, getChosenCategory } = this.props;
    if (getChosenCategory('selected') !== 'All') {
      return selected.filter(
        (item: Item) => item.category === getChosenCategory('selected')
      );
    } else {
      return selected;
    }
  };

  render() {
    const {
      setActiveItem,
      toggleCheckItems,
      setVisibleDialog,
      selected,
      areItemsEditable
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
        <StyledDroppable droppableId='droppable'>
          {provided => (
            <ProvidedSelected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              setVisibleDialog={setVisibleDialog}
              selected={this.getCategorizedItems()}
              provided={provided}
              areItemsEditable={areItemsEditable}
            />
          )}
        </StyledDroppable>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 400px;
  min-width: 150px;
  width: ${(props: StyledContainerProps) =>
    props.showItems ? '80vw' : '50vw'};
  margin: 5px;
`;

const StyledFinishShoppingButton = styled(IconButton)`
  color: #0d49aa;
  padding: 0;
`;

const StyledDroppable = styled(Droppable)`
width: 100%;
`