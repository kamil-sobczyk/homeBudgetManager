import * as React from 'react';

import styled from 'styled-components';

import { observer } from 'mobx-react';
import { ListType, Item, ListLangData } from '../../../../lib/interfaces';

import { Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { TextField } from '@rmwc/textfield';

import { ProvidedItemsDraggable } from './providedItemsDraggable';
import { observable } from 'mobx';

interface ProvidedItemsProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  areItemsEditable: boolean;
  searchBarVisible: boolean;
  items: Item[];
  provided: DroppableProvided;
  langData: ListLangData;
}

@observer
export class ProvidedItems extends React.Component<ProvidedItemsProps, {}> {
  @observable text = '';

  setText = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  };

  render() {
    const {
      provided,
      setVisibleDialog,
      items,
      setActiveItem,
      searchBarVisible,
      areItemsEditable,
      langData
    } = this.props;

    let displayedItems;

    if (searchBarVisible) {
      const sortedByName = items.filter((item: Item) =>
        item.name.toLocaleLowerCase().includes(this.text.toLocaleLowerCase())
      );
      const sortedByCategory = items.filter((item: Item) =>
        item
          .category!.toLocaleLowerCase()
          .includes(this.text.toLocaleLowerCase())
      );
      const mergedSortedItems = [...sortedByName, ...sortedByCategory];

      displayedItems = mergedSortedItems.filter(
        (item: Item, index: number) => mergedSortedItems.indexOf(item) === index
      );
    } else {
      displayedItems = items;
    }

    return (
      <List innerRef={provided.innerRef}>
        {searchBarVisible && (
          <StyledSearchBar
            placeholder={langData.searchBarText}
            value={this.text}
            onChange={e => this.setText(e)}
          />
        )}
        {displayedItems.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {providedDraggable2 => (
              <ProvidedItemsDraggable
                providedDraggable2={providedDraggable2}
                setActiveItem={setActiveItem}
                setVisibleDialog={setVisibleDialog}
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

export const List = styled.div`
  height: 100%;
  min-width: 180px;
`;

const StyledSearchBar = styled(TextField)`
  width: 100%;
`;
