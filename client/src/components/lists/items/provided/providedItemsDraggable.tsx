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

import { DraggableProvided } from 'react-beautiful-dnd';

import { MoreMenu } from '../moreMenu';

interface ProvidedItemsDraggableProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, index: number) => void;
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
      setVisibleDialog,
      providedDraggable2,
      item,
      index,
      setActiveItem
    } = this.props;

    console.log(item.name)

    return (
      <>
        <div
          ref={providedDraggable2.innerRef}
          {...providedDraggable2.draggableProps}
          {...providedDraggable2.dragHandleProps}
        >
          <StyledItem key={index}>
            <MoreMenu
              index={index}
              setVisibleDialog={setVisibleDialog}
              setActiveItem={setActiveItem}
            />
            <StyledTextContainer>
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
              </ListItemText>
            </StyledTextContainer>
            <div />
          </StyledItem>
          <ListDivider />
        </div>
        {providedDraggable2.placeholder}
      </>
    );
  }
}

export const StyledItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  min-height: 75px;
  margin: 2px;
`;

export const StyledTextContainer = styled.div`
  min-width: 250px;
  max-width: 50vw;
  display: flex;
  justify-content: space-between;
`;
