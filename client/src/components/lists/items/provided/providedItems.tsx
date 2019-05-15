import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item, Cost } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedItemsDraggable } from './providedItemsDraggable';

interface ProvidedItemsProps {
  setActiveItem: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  items: Item[];
  provided: DroppableProvided;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  render() {
    const {
      provided,
      toggleShowEditDialog,
      items,
      setActiveItem,
      toggleShowDeleteDialog,
    } = this.props;

    return (
      <List innerRef={provided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable2 => (
              <ProvidedItemsDraggable
                providedDraggable2={providedDraggable2}
                toggleShowEditDialog={toggleShowEditDialog}
                setActiveItem={setActiveItem}
                toggleShowDeleteDialog={toggleShowDeleteDialog}
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

const List = styled.div`
  min-height: 300px;
`;
