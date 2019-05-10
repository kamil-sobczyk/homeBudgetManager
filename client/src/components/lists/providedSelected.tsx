import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { Draggable, DraggableProvidedDraggableProps, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedSelectedDraggable } from './providedSelectedDraggable';

interface ProvidedSelectedProps extends StoreProps {
  provided: DroppableProvided;
}

@observer
export class ProvidedSelected extends React.Component<
  ProvidedSelectedProps,
  {}
> {
  render() {
    const { selected } = this.props.store;
    const { provided } = this.props;
    return (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{ minHeight: '300px' }}
      >
        {selected.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable => (
              <ProvidedSelectedDraggable
                providedDraggable={providedDraggable}
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
