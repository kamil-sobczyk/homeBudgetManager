import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { ProvidedSelectedDraggable } from './providedSelectedDraggable';
import { List } from '../../items/provided/providedItems';

interface ProvidedSelectedProps {
  toggleCheckItems: (list: ListType, id: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  setVisibleDialog: (dialog?: string) => void;
  areItemsEditable: boolean;
  selected: Item[];
  provided: DroppableProvided;
}

@observer
export class ProvidedSelected extends React.Component<
  ProvidedSelectedProps,
  {}
> {
  shouldComponentUpdate = (oldProps: ProvidedSelectedProps) =>
  this.props.selected !== oldProps.selected;

  render() {
    const {
      selected,
      provided,
      toggleCheckItems,
      setActiveItem,
      setVisibleDialog,
      areItemsEditable
    } = this.props;

    return (
      <List innerRef={provided.innerRef} {...provided.droppableProps}>
        {selected.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable => (
              <ProvidedSelectedDraggable
                setActiveItem={setActiveItem}
                toggleCheckItems={toggleCheckItems}
                setVisibleDialog={setVisibleDialog}
                selected={selected}
                providedDraggable={providedDraggable}
                areItemsEditable={areItemsEditable}
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
