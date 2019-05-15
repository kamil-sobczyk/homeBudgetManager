import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../lib/interfaces';

import { Button } from '@rmwc/button';

import { Droppable } from 'react-beautiful-dnd';

import { ProvidedItems } from './provided/providedItems';
import { StyledButtonsContainer } from '../../listBox/listsContainer';

interface ItemsProps {
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void; 
  toggleShowAddDialog: () => void;
  deleteItem: (index: number) => void;
  getItems: () => void;
  items: Item[];
  showDeleteDialog: boolean;
}

@observer
export class Items extends React.Component<ItemsProps, {}> {
  componentDidMount = () => {
    this.props.getItems();
  };
  render() {
    const {
      toggleShowEditDialog,
      toggleShowAddDialog,
      toggleShowDeleteDialog,
      items,
    } = this.props;

    return (
      <StyledContainer>
        <Droppable droppableId='droppable2'>
          {providedDroppable2 => (
            <ProvidedItems
              toggleShowEditDialog={toggleShowEditDialog}
              toggleShowDeleteDialog={toggleShowDeleteDialog}
              items={items}
              provided={providedDroppable2}
            />
          )}
        </Droppable>
        <StyledButtonsContainer>
          <Button onClick={toggleShowAddDialog}>Add Item</Button>
        </StyledButtonsContainer>
      </StyledContainer>
    );
  }
}

export const StyledContainer = styled.div`
  min-height: 300px;
  min-width: 250px;
`;
