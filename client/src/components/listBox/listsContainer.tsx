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
  toggleShowdeleteItemDialog: (list: ListType, index: number) => void;
  toggleshowAddItemDialog: () => boolean;
  toggleShowFinishShoppingDialog: (cost?: Cost) => void;
  toggleShowSpendingsDialog: () => void;
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
      toggleShowSpendingsDialog,
      toggleShowdeleteItemDialog,
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
                toggleShowdeleteItemDialog={toggleShowdeleteItemDialog}
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
            />
          </DragDropContext>
        </StyledListContainer>
        <StyledButtonsContainer>
          <StyledButton onClick={() => null} outlined>
            Add bill
          </StyledButton>
          <StyledButton onClick={toggleShowSpendingsDialog} outlined>
            Show spendings
          </StyledButton>
          <StyledButton
            color='primary'
            outlined
            onClick={() => toggleShowFinishShoppingDialog()}
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
  margin-top: 10px;
`;
