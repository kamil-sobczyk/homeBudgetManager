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
  toggleShowDeleteItemDialog: (list: ListType, index: number) => void;
  toggleshowAddItemDialog: () => boolean;
  toggleShowFinishShoppingDialog: (cost?: Cost) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowItems: () => void;
  onDragEnd: (result: DropResult) => void;
  setActiveItem: (list: ListType, index: number) => void;
  deleteItem: (index: number) => void;
  selected: Item[];
  items: Item[];
  showItems: boolean;
  showdeleteItemDialog: boolean;
}

@observer
export class ListsContainer extends React.Component<ListsContainerProps, {}> {
  render() {
    const {
      onDragEnd,
      showItems,
      getItems,
      getSelected,
      toggleshowAddItemDialog,
      toggleShowFinishShoppingDialog,
      toggleShowDeleteItemDialog,
      toggleShowItems,
      setActiveItem,
      toggleShowEditDialog,
      selected,
      toggleCheckItems,
      showdeleteItemDialog,
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
                toggleShowDeleteItemDialog={toggleShowDeleteItemDialog}
                toggleshowAddItemDialog={toggleshowAddItemDialog}
                deleteItem={deleteItem}
                items={items}
                showdeleteItemDialog={showdeleteItemDialog}
                getItems={getItems}
              />
            )}
            <Selected
              setActiveItem={setActiveItem}
              toggleCheckItems={toggleCheckItems}
              toggleShowEditDialog={toggleShowEditDialog}
              selected={selected}
              getSelected={getSelected}
              toggleShowFinishShoppingDialog={toggleShowFinishShoppingDialog}
            />
          </DragDropContext>
        </StyledListContainer>
      </>
    );
  }
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;

`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
