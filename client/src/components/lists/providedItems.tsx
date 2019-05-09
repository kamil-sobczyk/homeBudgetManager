import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import { Draggable } from 'react-beautiful-dnd';

import { ProvidedItemsDraggable } from './providedItemsDraggable';

interface ProvidedItemsProps extends StoreProps {
  providedDroppable2: any;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  render() {
    const { items, toggleCheckItems, toggleShowEditDialog } = this.props.store;
    const { providedDroppable2 } = this.props;
    return (
      <div ref={providedDroppable2.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable2 => 
              <ProvidedItemsDraggable
                providedDraggable2={providedDraggable2}
                store={this.props.store}
                item={item}
                index={index}
              />
            }
          </Draggable>
        ))}
        {providedDroppable2.placeholder}
      </div>
    );
  }
}
