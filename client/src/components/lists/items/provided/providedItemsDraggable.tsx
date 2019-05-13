import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../../../lib/interfaces';
import { Item } from '../../../../lib/interfaces';

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

interface ProvidedItemsDraggableProps extends StoreProps {
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
    const { toggleCheckItems } = this.props.store.itemMenagerClient;
    const { providedDraggable2, item, index } = this.props;
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
            <StyledTextContainer>
              <ListItemText>
                <ListItemPrimaryText>{item.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
              </ListItemText>
              <MoreMenu index={index} store={this.props.store} />
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
  min-height: 80px;
`;

export const StyledTextContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`;
