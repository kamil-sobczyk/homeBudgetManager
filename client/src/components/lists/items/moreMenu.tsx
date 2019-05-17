import * as React from 'react';

import styled from 'styled-components';

import { ListType } from '../../../lib/interfaces';

import { SimpleMenu } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

interface MoreMenuProps {
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteItemDialog: (list: ListType, index: number) => void;
  index: number;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  handleOptionClick = (action: string): void => {
    const {
      toggleShowEditDialog,
      toggleShowDeleteItemDialog,
      index
    } = this.props;

    action === 'edit'
      ? toggleShowEditDialog('items', index)
      : toggleShowDeleteItemDialog('items', index);
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
