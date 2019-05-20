import * as React from 'react';

import styled from 'styled-components';

import { SimpleMenu } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

import { ListType } from '../../../lib/interfaces';

interface MoreMenuProps {
  setVisibleDialog: (dialog?: string) => string;
  setActiveItem: (list: ListType, index: number) => void;
  index: number;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  handleOptionClick = (action: string): void => {
    const { setVisibleDialog, index, setActiveItem } = this.props;

    setActiveItem('items', index);

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

const StyledDeleteButton = styled(IconButton)`
  color: red;
`;

export const StyledEditButton = styled(IconButton)`
  color: #3872d1;
`;

const StyledMenuButton = styled(IconButton)`
  color: #0d49aa;
`;
