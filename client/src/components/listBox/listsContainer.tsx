import * as React from 'react';

import { observer } from 'mobx-react';
import { Item, ListType } from '../../lib/interfaces';

import styled from 'styled-components';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Button } from '@rmwc/button';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  onDragEnd: (result: DropResult) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  toggleShowAddDialog: () => boolean;
  toggleShowFinishDialog: () => void;
  toggleShowShoppingDialog: () => void;
  toggleShowItems: () => void;
  setActiveItem: (list: ListType, index: number) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  deleteItem: (index: number) => void;
  showItems: boolean;
  selected: Item[];
  items: Item[];
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
