import * as React from 'react';

import { observer } from 'mobx-react';
import { ListType, Item } from '../../../../lib/interfaces';

import styled from 'styled-components';

import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListDivider
} from '@rmwc/list';
import '@material/ripple/dist/mdc.ripple.css';

import { DraggableProvided } from 'react-beautiful-dnd';

import { MoreMenu } from '../moreMenu';

interface ProvidedItemsDraggableProps {
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteItemDialog: (list: ListType, index: number) => void;
  providedDraggable2: DraggableProvided;
  item: Item;
  index: number;
}

@observer
export class ProvidedItemsDraggable extends React.Component<
  ProvidedItemsDraggableProps,
  {}
> {
  render() {
    const {
      providedDraggable2,
      item,
      index,
      toggleShowDeleteItemDialog,
      toggleShowEditDialog
    } = this.props;

    return (
      <>
        <div
          ref={providedDraggable2.innerRef}
          {...providedDraggable2.draggableProps}
          {...providedDraggable2.dragHandleProps}
        >
          <StyledItem key={index}>
            <StyledTextContainer>
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
              </ListItemText>
              <MoreMenu
                index={index}
                toggleShowDeleteItemDialog={toggleShowDeleteItemDialog}
                toggleShowEditDialog={toggleShowEditDialog}
              />
            </StyledTextContainer>
          </StyledItem>

          <ListDivider />
        </div>
        {providedDraggable2.placeholder}
      </>
    );
  }
}

export const StyledItem = styled(ListItem)`
  min-height: 75px;
`;

export const StyledTextContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`;
