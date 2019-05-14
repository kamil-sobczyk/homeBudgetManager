import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../../lib/interfaces';

import { Draggable, DraggableProvidedDraggableProps, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedSelectedDraggable } from './providedSelectedDraggable';

interface ProvidedSelectedProps {
   setActiveItem: (list: ListType, index: number) => void;
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  selected: Item[];

  provided: DroppableProvided;
}

@observer
export class ProvidedSelected extends React.Component<
  ProvidedSelectedProps,
  {}
> {
  render() {
    const { selected, provided } = this.props;

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
                setActiveItem={setActiveItem}
                toggleCheckItems={toggleCheckItems}
                toggleShowEditDialog={toggleShowEditDialog}
                selected={selected}
                
                providedDraggable={providedDraggable}
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
