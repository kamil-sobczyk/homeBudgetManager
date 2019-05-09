import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox/listBox';

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
      <div ref={provided.innerRef} style={{ minHeight: '300px' }}>
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
      </div>
    );
  }
}
