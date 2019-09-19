import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import styled from 'styled-components';

import { ListItem, ListDivider } from '@rmwc/list';

import { DraggableProvided } from 'react-beautiful-dnd';

import { ListSingleItem } from '../../item';

interface ProvidedItemsDraggableProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  areItemsEditable: boolean;
  providedDraggable2: DraggableProvided;
  item: Item;
  index: number;
}

@observer
export class ProvidedItemsDraggable extends React.Component<
  ProvidedItemsDraggableProps,
  {}
> {
  render() {
    const {
      setVisibleDialog,
      providedDraggable2,
      item,
      index,
      setActiveItem,
      areItemsEditable
    } = this.props;

    return (
      <>
        <div
          ref={providedDraggable2.innerRef}
          {...providedDraggable2.draggableProps}
          {...providedDraggable2.dragHandleProps}
        >
          <ListSingleItem
            setActiveItem={setActiveItem}
            setVisibleDialog={setVisibleDialog}
            areItemsEditable={areItemsEditable}
            item={item}
            index={index}
          />
          <ListDivider />
        </div>
        {providedDraggable2.placeholder}
      </>
    );
  }
}

export const StyledTextContainer = styled.div`
  min-width: 250px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
