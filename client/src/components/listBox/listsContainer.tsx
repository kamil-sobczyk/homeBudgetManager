import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../lib/interfaces';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';
import { PagesManagerClient } from '../../lib/mobx/stores/pagesManagerClient';

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  toggleCheckItems: (list: ListType, id: string) => void;
  toggleShowItems: () => void;
  onDragEnd: (result: DropResult) => void;
  setActiveItem: (list: ListType, id: string) => void;
  deleteItem: (name: string, info: string) => Item[];
  setVisibleDialog: (dialog?: string) => void;
  getChosenCategory: (list: ListType) => string;
  setChosenCategory: (list: ListType, category: string) => void;
  areItemsEditable: boolean;
  visibleDialog: string;
  selected: Item[];
  items: Item[];
  categorizedItems: Item[];
  showItems: boolean;
  pagesManager: PagesManagerClient;
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
    setVisibleDialog,
    getChosenCategory,
    setChosenCategory,
    areItemsEditable,
    pagesManager
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
              getChosenCategory={getChosenCategory}
              setChosenCategory={setChosenCategory}
              deleteItem={deleteItem}
              items={items}
              getItems={getItems}
              showItems={showItems}
              areItemsEditable={areItemsEditable}
              pagesManager={pagesManager}
            />
          )}
          <Selected
            setVisibleDialog={setVisibleDialog}
            setActiveItem={setActiveItem}
            getChosenCategory={getChosenCategory}
            setChosenCategory={setChosenCategory}
            toggleCheckItems={toggleCheckItems}
            selected={selected}
            getSelected={getSelected}
            showItems={showItems}
            areItemsEditable={areItemsEditable}
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
