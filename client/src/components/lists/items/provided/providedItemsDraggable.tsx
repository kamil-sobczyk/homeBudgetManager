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
  setVisibleDialog: (dialog?: string) => string;
  setActiveItem: (list: ListType, index: number) => void;
  providedDraggable2: DraggableProvided;
  item: Item;
  index: number;
}


export const ProvidedItemsDraggable = observer(
  ({
    setVisibleDialog, providedDraggable2, item, index, setActiveItem 
  }: ProvidedItemsDraggableProps) => (
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
          <MoreMenu index={index} setVisibleDialog={setVisibleDialog}        setActiveItem={setActiveItem} />
        </StyledTextContainer>
      </StyledItem>

      <ListDivider />
    </div>
    {providedDraggable2.placeholder}
  </>
  )
);

export const StyledItem = styled(ListItem)`
  min-height: 75px;
`;

export const StyledTextContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`;
