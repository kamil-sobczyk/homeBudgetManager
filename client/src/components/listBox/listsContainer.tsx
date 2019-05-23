import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../lib/interfaces';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowItems: () => void;
  onDragEnd: (result: DropResult) => void;
  setActiveItem: (list: ListType, index: number) => void;
  deleteItem: (index: number) => void;
  setVisibleDialog: (dialog?: string) => string;
  visibleDialog: string;
  selected: Item[];
  items: Item[];
  showItems: boolean;
}

export const ListsContainer = observer(
  ({
    onDragEnd,
    showItems,
    getItems,
    getSelected,
    toggleShowItems,
    setActiveItem,
    selected,
    toggleCheckItems,
    deleteItem,
    items,
    setVisibleDialog
  }: ListsContainerProps) => (
    <>
      <StyledButtonsContainer>
        <ViewButton toggleShowItems={toggleShowItems} showItems={showItems} />
      </StyledButtonsContainer>
      <StyledListContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {showItems && (
            <Items
              setActiveItem={setActiveItem}
              setVisibleDialog={setVisibleDialog}
              deleteItem={deleteItem}
              items={items}
              getItems={getItems}
            />
          )}
          <Selected
            setVisibleDialog={setVisibleDialog}
            setActiveItem={setActiveItem}
            toggleCheckItems={toggleCheckItems}
            selected={selected}
            getSelected={getSelected}
          />
        </DragDropContext>
      </StyledListContainer>
    </>
  )
);

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
