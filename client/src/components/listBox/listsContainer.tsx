import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { Item, ListType, Cost } from '../../lib/interfaces';

import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd';

import { ViewButton } from './listsViewButton';
import { Items } from '../lists/items/items';
import { Selected } from '../lists/selected/selected';
import { PagesManagerClient } from '../../lib/mobx/stores/pagesManagerClient';

interface StyledButtonContainerProps {
  showItems: boolean;
}

interface ListsContainerProps {
  getItems: () => Promise<Item[]>;
  getSelected: () => Promise<Item[]>;
  toggleCheckItems: (list: ListType, id: string) => void;
  toggleShowItems: () => void;
  onDragEnd: (result: DropResult) => void;
  onDragStart: (start: DragStart) => void;
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
    pagesManager,
    onDragStart
  }: ListsContainerProps) => (
    <>
      <StyledButtonContainer showItems={showItems}>
        <ViewButton toggleShowItems={toggleShowItems} showItems={showItems} />
      </StyledButtonContainer>
      <StyledListContainer>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
            pagesManager={pagesManager}
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

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props: StyledButtonContainerProps) =>
    props.showItems ? 'center' : 'flex-start'};
  margin-left: ${(props: StyledButtonContainerProps) =>
    props.showItems ? '0' : '7.5%'};
  margin-bottom: -47px;
`;
