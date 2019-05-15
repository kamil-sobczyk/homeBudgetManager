import * as React from 'react';

import { ListType } from '../../../lib/interfaces';

import { MenuItem, SimpleMenu } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

interface MoreMenuProps {
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  index: number;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  handleOptionClick = (
    event: React.MouseEvent<any, MouseEvent>,
    action: string
  ): void => {
    const { toggleShowEditDialog, toggleShowDeleteDialog, index } = this.props;

    action === 'edit'
      ? toggleShowEditDialog('items', index)
      : toggleShowDeleteDialog('items', index);
    event.stopPropagation();
  };

  render() {
  
    return (
      <SimpleMenu
        handle={<IconButton icon='menu'>Menu</IconButton>}
        hoistToBody={true}
      >
        <MenuItem onClick={e => this.handleOptionClick(e, 'edit')}>
          <IconButton icon='edit' />
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={e => this.handleOptionClick(e, 'delete')}>
          <IconButton icon='delete' />
        </MenuItem>
      </SimpleMenu>
    );
  }
}
