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
  deleteItem: (name: string) => Item[];
  setVisibleDialog: (dialog?: string) => void;
  getCategories: () => string[];
  setItems: (items: Item[]) => void;
  setItemsCategorized: (value: boolean) => boolean;
  visibleDialog: string;
  selected: Item[];
  items: Item[];
  categorizedItems: Item[];
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
    categorizedItems,
    getCategories,
    setVisibleDialog,
    setItems,
    setItemsCategorized
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
              setItems={setItems}
              deleteItem={deleteItem}
              items={items}
              getItems={getItems}
              showItems={showItems}
              getCategories={getCategories}
              categorizedItems={categorizedItems}
              setItemsCategorized={setItemsCategorized}
            />
          )}
          <Selected
            setVisibleDialog={setVisibleDialog}
            getCategories={getCategories}
            setActiveItem={setActiveItem}
            toggleCheckItems={toggleCheckItems}
            selected={selected}
            getSelected={getSelected}
            showItems={showItems}
          />
        </DragDropContext>
      </StyledListContainer>
    </>
  )
);

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 100vw;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
