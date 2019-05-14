import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedItemsDraggable } from './providedItemsDraggable';

interface ProvidedItemsProps extends StoreProps {
  provided: DroppableProvided;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  render() {
    const { items } = this.props.store;
    const { provided } = this.props;

    return (
      <List innerRef={provided.innerRef} >
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable2 => (
              <ProvidedItemsDraggable
                providedDraggable2={providedDraggable2}
                store={this.props.store}
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
