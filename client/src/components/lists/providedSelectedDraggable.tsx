import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import { StyledItem } from './items';

import {
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';

import { Checkbox } from '@rmwc/checkbox';

interface ProvidedSelectedDraggableProps extends StoreProps {
  providedDraggable: any;
  item: any;
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
      toggleCheckItems,
      toggleShowEditDialog
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
            <ListItemText>
              <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
              <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
            </ListItemText>
            <IconButton
              aria-label='Edit item'
              onClick={(e) => {
                e.stopPropagation()  
                toggleShowEditDialog('selected', index);

                }}
            >
              <Icon icon='edit' />
            </IconButton>
          </StyledItem>
          <ListDivider />
        </div>
        {providedDraggable.placeholder}
      </div>
    );
  }
}
