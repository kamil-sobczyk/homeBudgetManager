import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../lib/interfaces';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Button } from '@rmwc/button';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  toggleShowAddDialog: () => boolean;
  toggleShowFinishDialog: (cost? : Cost) => void;
  toggleShowShoppingDialog: () => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowItems: () => void;
  onDragEnd: (result: DropResult) => void;
  setActiveItem: (list: ListType, index: number) => void;
  deleteItem: (index: number) => void;
  selected: Item[];
  items: Item[];
  showItems: boolean;
  showDeleteDialog: boolean;
}

@observer
export class ListsContainer extends React.Component<ListsContainerProps, {}> {
  render() {
    const {
      onDragEnd,
      showItems,
      getItems,
      getSelected,
      toggleShowAddDialog,
      toggleShowFinishDialog,
      toggleShowShoppingDialog,
      toggleShowDeleteDialog,
      toggleShowItems,
      setActiveItem,
      toggleShowEditDialog,
      selected,
      toggleCheckItems,
      showDeleteDialog,
      deleteItem,
      items
    } = this.props;

    return (
      <>
        <StyledButtonsContainer>
          <ViewButton toggleShowItems={toggleShowItems} showItems={showItems} />
        </StyledButtonsContainer>
        <StyledListContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {showItems && (
              <Items
                toggleShowEditDialog={toggleShowEditDialog}
                toggleShowDeleteDialog={toggleShowDeleteDialog}
                toggleShowAddDialog={toggleShowAddDialog}
                deleteItem={deleteItem}
                items={items}
                showDeleteDialog={showDeleteDialog}
                getItems={getItems}
              />
            )}
            <Selected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
              getSelected={getSelected}
            />
          </DragDropContext>
        </StyledListContainer>
        <StyledButtonsContainer>
          <StyledButton onClick={toggleShowShoppingDialog} outlined>
            Show previous shoppings
          </StyledButton>
          <StyledButton
            color='primary'
            outlined
            onClick={() => toggleShowFinishDialog()}
          >
            Finish shopping
          </StyledButton>
        </StyledButtonsContainer>
      </>
    );
  }
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  margin: 10px 10px 0 10px;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px`;
