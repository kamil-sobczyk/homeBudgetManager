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
  toggleEditItem = (event: React.MouseEvent<any, MouseEvent>): void => {
    const {
      itemMenagerClient: { setActiveItem },
      visibilityClient: { toggleShowEditDialog }
    } = this.props.store;
    const { index } = this.props;
    
    event.stopPropagation();
    setActiveItem('selected', index);
    toggleShowEditDialog('selected', index);
  };

  render() {
    const {
      selected,
      itemMenagerClient: { toggleCheckItem }
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
            onClick={() => toggleCheckItem('selected', index)}
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
