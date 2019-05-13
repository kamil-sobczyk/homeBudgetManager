import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../../lib/interfaces';
import { Item } from '../../../../lib/interfaces';

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

interface ProvidedSelectedDraggableProps extends StoreProps {
  providedDraggable: DraggableProvided;
  item: Item;
  index: number;
}

@observer
export class ProvidedSelectedDraggable extends React.Component<
  ProvidedSelectedDraggableProps,
  {}
> {
  render() {
    const {
      selected,
      itemMenagerClient: { toggleCheckItems, setActiveItem },
      visibilityClient: { toggleShowEditDialog }
    } = this.props.store;
    const { providedDraggable, item, index } = this.props;
    return (
      <div>
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          <StyledItem
            key={index}
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
                onClick={e => {
                  e.stopPropagation();
                  setActiveItem('selected', index);
                  toggleShowEditDialog('selected', index);
                }}
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
