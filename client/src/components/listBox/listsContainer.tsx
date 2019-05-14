import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps, Item, ListType } from '../../lib/interfaces';

import styled from 'styled-components';

import { DragDropContext, onDragEnd } from 'react-beautiful-dnd';

import { Button } from '@rmwc/button';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  onDragEnd: () => onDragEnd;
  toggleShowFinishDialog: () => void;
  toggleShowShoppingDialog: () => void;
  toggleShowItems: () => void;
  showItems: boolean;

  setActiveItem: (list: ListType, index: number) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
}

@observer
export class ListsContainer extends React.Component<ListsContainerProps, {}> {
  componentDidMount = () => {
    const { getItems, getSelected } = this.props;
    getItems();
    getSelected();
  };
  render() {
    const {
      onDragEnd,
      showItems,
      toggleShowFinishDialog,
      toggleShowShoppingDialog,
      toggleShowItems,
      setActiveItem,
      toggleShowEditDialog,
      selected,
      toggleCheckItems
      
    } = this.props;

    return (
      <>
        <StyledButtonsContainer>
          <ViewButton toggleShowItems={toggleShowItems} />
        </StyledButtonsContainer>
        <StyledListContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* {showItems && <Items {...this.props} />} */}
            <Selected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
            />
          </DragDropContext>
        </StyledListContainer>
        <StyledButtonsContainer>
          <Button onClick={toggleShowShoppingDialog}>
            Show previous shoppings
          </Button>
          <Button color='primary' onClick={() => toggleShowFinishDialog()}>
            Finish shopping
          </Button>
        </StyledButtonsContainer>
      </>
    );
  }
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
