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
  reorderItems: (newItems: Item[], newSelected: Item[]) => void;
  deleteItem: (index: number) => void;
  showItems: boolean;
  selected: Item[];
  items: Item[];
  showAddDialog: boolean;
  showDeleteDialog: boolean;
  showFinish: boolean;
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
      items,
      reorderItems,
      showAddDialog,
      showFinish
    } = this.props;

    return (
      <>
        <StyledButtonsContainer>
          <ViewButton toggleShowItems={toggleShowItems} />
        </StyledButtonsContainer>
        <StyledListContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {showItems && (
              <Items
                setActiveItem={setActiveItem}
                toggleShowEditDialog={toggleShowEditDialog}
                toggleShowDeleteDialog={toggleShowDeleteDialog}
                toggleShowAddDialog={toggleShowAddDialog}
                deleteItem={deleteItem}
                items={items}
                showDeleteDialog={showDeleteDialog}
              />
            )}
            <Selected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
              reorderItems={reorderItems}
              toggleShowFinishDialog={toggleShowFinishDialog}
              showFinish={showFinish}
              items={items}
              showAddDialog={showAddDialog}
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
