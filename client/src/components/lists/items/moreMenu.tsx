import * as React from 'react';

import styled from 'styled-components';

import { ListType, Item } from '../../../lib/interfaces';

import { SimpleMenu } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

interface MoreMenuProps {
  setVisibleDialog: (dialog?: string) => void;
  setActiveItem: (list: ListType, id: string) => void;
  item: Item;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  private handleOptionClick = (action: string): void => {
    const { setVisibleDialog, item, setActiveItem } = this.props;

    setActiveItem('items', item.id);

    action === 'edit'
      ? setVisibleDialog('EditItemDialog')
      : setVisibleDialog('DeleteItemDialog');
  };

  render() {
    return (
      <StyledSimpleMenu
        handle={<StyledMenuButton icon='menu'>Menu</StyledMenuButton>}
        hoistToBody={true}
      >
        <StyledEditButton
          icon='edit'
          onClick={() => this.handleOptionClick('edit')}
        />
        <ListDivider />
        <StyledDeleteButton
          icon='delete'
          onClick={() => this.handleOptionClick('delete')}
        />
      </StyledSimpleMenu>
    );
  }
}

const StyledSimpleMenu = styled(SimpleMenu)`
  color: #3872d1;
  min-width: 20px;
`;

export const StyledDeleteButton = styled(IconButton)`
  color: red;
`;

export const StyledEditButton = styled(IconButton)`
  color: #3872d1;
`;

const StyledMenuButton = styled(IconButton)`
  color: #0d49aa;
`;
