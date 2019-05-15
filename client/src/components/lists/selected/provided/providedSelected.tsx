import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedSelectedDraggable } from './providedSelectedDraggable';
import { List } from '../../items/provided/providedItems';

interface ProvidedSelectedProps {
  toggleCheckItems: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  setActiveItem: (list: ListType, index: number) => void;
  selected: Item[];
  provided: DroppableProvided;
}

@observer
export class ProvidedSelected extends React.Component<
  ProvidedSelectedProps,
  {}
> {
  render() {
    const {
      selected,
      provided,
      toggleShowEditDialog,
      toggleCheckItems,
      setActiveItem
    } = this.props;

    return (
      <List
        innerRef={provided.innerRef}
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
      </List>
    );
  }
}
