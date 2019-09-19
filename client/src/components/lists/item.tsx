import * as React from 'react';

import styled from 'styled-components';

import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import { MoreMenu } from './items/moreMenu';
import { ListType, Item } from '../../lib/interfaces';

interface ListSingleItemProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  areItemsEditable: boolean;
  item: Item;
  index: number;
}

interface ListItemPrimaryTextProps {
  info: any;
}

export class ListSingleItem extends React.Component<ListSingleItemProps, {}> {
  shouldComponentUpdate = (oldProps: ListSingleItemProps) =>
    this.props.item !== oldProps.item;

  render() {
    const {
      setVisibleDialog,
      item,
      index,
      setActiveItem,
      areItemsEditable
    } = this.props;

    return (
      <StyledItem key={index}>
        {areItemsEditable && (
          <MoreMenu
            item={item}
            setVisibleDialog={setVisibleDialog}
            setActiveItem={setActiveItem}
          />
        )}
        <StyledTextContainer>
          <ListItemText>
            <StyledListItemPrimaryText
              info={item.info.length > 0 ? 1 : undefined}
            >
              {item.name}
            </StyledListItemPrimaryText>
            <ListItemSecondaryText>{item.info}</ListItemSecondaryText>
          </ListItemText>
        </StyledTextContainer>
        <div />
      </StyledItem>
    );
  }
}

export const StyledItem = styled(ListItem)`
  display: flex;
  justify-content: flex-start;
  min-height: 45px;
  margin-left: -25px;
`;

export const StyledTextContainer = styled.div`
  min-width: 250px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledListItemPrimaryText = styled(ListItemPrimaryText)`
  position: relative;
  top: ${(props: ListItemPrimaryTextProps) => (props.info ? '-17px' : '-7px')};
  height: 35px;
`;
