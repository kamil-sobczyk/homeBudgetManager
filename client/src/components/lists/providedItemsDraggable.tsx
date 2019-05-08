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

interface ProvidedItemsDraggableProps extends StoreProps {
  providedDraggable2: any;
  item: any;
  index: number;
}

@observer
export class ProvidedItemsDraggable extends React.Component<
  ProvidedItemsDraggableProps,
  {}
> {
  render() {
    const {
      items,
      toggleCheckItems,
      toggleShowEditDialog,
    } = this.props.store;
    const {    providedDraggable2, item, index} = this.props;
    return (
        <>
          <div
            ref={providedDraggable2.innerRef}
            {...providedDraggable2.draggableProps}
            {...providedDraggable2.dragHandleProps}
          >
            <StyledItem
              key={index}
              onClick={toggleCheckItems.bind(this, 'items', index)}
            >
              <Checkbox
                //   className={checkbox}
                checked={items[index] ? items[index].checked : false}
                tabIndex={-1}
                value={'checked'}
                //   disableRipple
              />
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>
                  {item.info}
                </ListItemSecondaryText>
              </ListItemText>
              <IconButton
                aria-label='Edit item'
                onClick={
                  toggleShowEditDialog.bind(this, 'selected', index) ///////////////////////////
                }
              >
                <Icon icon='edit' />
              </IconButton>
            </StyledItem>
            <ListDivider />
          </div>
          {providedDraggable2.placeholder}
        </>
      )
  }
}
