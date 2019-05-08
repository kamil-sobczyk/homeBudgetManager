import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../listBox';

import styled from 'styled-components';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';
import { Checkbox } from '@rmwc/checkbox';

import {ProvidedItems} from './providedItems';

@observer
export class Items extends React.Component<StoreProps, {}> {
  render() {
    const {
      toggleShowEditDialog,
      items,
      showEditDialog,
      toggleShowFinishDialog,
      toggleCheckItems
    } = this.props.store;
    return (
      <Droppable droppableId='droppable2'>
        {providedDroppable2 => <ProvidedItems store={this.props.store} providedDroppable2={providedDroppable2} />}
      </Droppable>
    );
  }
}

export const StyledItem = styled(ListItem)`
  height: 80px;
`;
