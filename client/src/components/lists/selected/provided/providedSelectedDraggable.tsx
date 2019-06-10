import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import {
  StyledItem,
  StyledTextContainer
} from '../../items/provided/providedItemsDraggable';

import {
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import { Checkbox } from '@rmwc/checkbox';

import { DraggableProvided } from 'react-beautiful-dnd';
import { StyledEditButton } from '../../items/moreMenu';

interface ProvidedSelectedDraggableProps {
  toggleCheckItems: (list: ListType, index: number) => any;
  setActiveItem: (list: ListType, index: number) => void;
  setVisibleDialog: (dialog?: string) => void;
  selected: Item[];
  providedDraggable: DraggableProvided;
  item: Item;
  index: number;
}

@observer
export class ProvidedSelectedDraggable extends React.Component<
  ProvidedSelectedDraggableProps,
  {}
> {
  toggleEditItem = (event: React.MouseEvent<any, MouseEvent>): void => {
    const { setActiveItem, setVisibleDialog, index } = this.props;

    setActiveItem('selected', index);
    setVisibleDialog('EditItemDialog');
    event.stopPropagation();
  };

  render() {
    const {
      selected,
      toggleCheckItems,
      providedDraggable,
      item,
      index
    } = this.props;

    return (
      <>
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          <StyledItem key={item.id}>
            <Checkbox
              onClick={() => toggleCheckItems('selected', index)}
              checked={selected[index] ? selected[index].checked : false}
            />
            <StyledTextContainer>
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
              </ListItemText>
              <StyledEditButton
                icon='edit'
                aria-label='Edit item'
                onClick={e => this.toggleEditItem(e)}
              />
            </StyledTextContainer>
            <StyledEditButton
              icon='edit'
              aria-label='Edit item'
              onClick={e => this.toggleEditItem(e)}
            />
          </StyledItem>
          <ListDivider />
        </div>
        {providedDraggable.placeholder}
      </>
    );
  }
}
