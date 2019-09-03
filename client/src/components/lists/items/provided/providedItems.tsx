import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { TextField } from '@rmwc/textfield';

import { ProvidedItemsDraggable } from './providedItemsDraggable';
import { observable } from 'mobx';

const removeItemsDuplicates = (items: Item[]) =>
  items.filter((item: Item, index: number) => items.indexOf(item) === index);

interface ProvidedItemsProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, index: number) => void;
  items: Item[];
  provided: DroppableProvided;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  @observable text = '';

  setText = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  };

  getDisplayedItems = () => {
    const { items } = this.props;

    const sortedByName = items.filter((item: Item) =>
      item.name.toLocaleLowerCase().includes(this.text.toLocaleLowerCase())
    );
    const sortedByCategory = items.filter((item: Item) =>
      item.category!.toLocaleLowerCase().includes(this.text.toLocaleLowerCase())
    );
    const mergedSortedItems = [...sortedByName, ...sortedByCategory];

    // console.log(JSON.stringify(removeItemsDuplicates(mergedSortedItems)))

    return removeItemsDuplicates(mergedSortedItems);
  };

  render() {
    const { provided, setVisibleDialog, setActiveItem } = this.props;

    const providedItems = this.getDisplayedItems().map((item: Item, index: number) => (
      <Draggable key={item.id} draggableId={item.name} index={index}>
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
    ));

    return (
      <List innerRef={provided.innerRef}>
        <TextField
          fullwidth
          placeholder='Type item name'
          onChange={e => this.setText(e)}
        />
        {providedItems}
        {provided.placeholder}
      </List>
    );
  }
}

export const List = styled.div`
  height: 100%;
  min-width: 180px;
`;
