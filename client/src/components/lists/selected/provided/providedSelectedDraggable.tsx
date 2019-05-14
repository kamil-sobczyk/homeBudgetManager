import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces.ts';

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
import { IconButton } from '@rmwc/icon-button';
import { Checkbox } from '@rmwc/checkbox';

import { DraggableProvided } from 'react-beautiful-dnd';

interface ProvidedSelectedDraggableProps {
  providedDraggable: DraggableProvided;
  item: Item;
  index: number;

  setActiveItem: (list: ListType, index: number) => void;
  toggleCheckItems: (list: ListType, index: number) => any;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  selected: Item[];
}

@observer
export class ProvidedSelectedDraggable extends React.Component<
  ProvidedSelectedDraggableProps,
  {}
> {
  toggleEditItem = (event: React.MouseEvent<any, MouseEvent>): void => {
    const { setActiveItem, toggleShowEditDialog, index } = this.props;

    setActiveItem('selected', index);
    toggleShowEditDialog('selected', index);
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
      <div>
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          <StyledItem
            key={item.id}
            onClick={() => toggleCheckItems('selected', index)}
          >
            <Checkbox
              //   className={checkbox}
              checked={selected[index] ? selected[index].checked : false}
              tabIndex={-1}
              value={'checked'}
              //   disableRipple
            />
            <StyledTextContainer>
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
              </ListItemText>
              <IconButton
                icon='edit'
                aria-label='Edit item'
                onClick={e => this.toggleEditItem(e)}
              />
            </StyledTextContainer>
          </StyledItem>
          <ListDivider />
        </div>
        {providedDraggable.placeholder}
      </div>
    );
  }
}
