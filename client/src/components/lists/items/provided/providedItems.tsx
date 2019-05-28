import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedItemsDraggable } from './providedItemsDraggable';

interface ProvidedItemsProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, index: number) => void;
  items: Item[];
  provided: DroppableProvided;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  render() {
    const { provided, setVisibleDialog, items, setActiveItem } = this.props;
    
    return (
      <List innerRef={provided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable2 => (
              <ProvidedItemsDraggable
                providedDraggable2={providedDraggable2}
                setActiveItem={setActiveItem}
                setVisibleDialog={setVisibleDialog}
                item={item}
                index={index}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </List>
    );
  }
}

export const List = styled.div`
  min-height: 50px;
`;
