import * as React from 'react';

import { ListType } from '../../../lib/interfaces';

import { MenuSurfaceAnchor, Menu, MenuItem } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
// import Tooltip from "@rmwc/Tooltip";
// import Fade from "@rmwc/Fade";

interface MoreMenuProps {
  setActiveItem: (list: ListType, index: number) => void;
  toggleShowEditDialog: (list: ListType, index: number) => void;
  toggleShowDeleteDialog: (list: ListType, index: number) => void;
  index: number;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  state = {
    open: false
  };

  setOpen = (event: React.MouseEvent<any, MouseEvent>): void => {
    const { index, setActiveItem } = this.props;

    this.setState({ open: event.target });
    setActiveItem('items', index);
    event.stopPropagation();
  };

  handleDeleteClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const { toggleShowDeleteDialog, index } = this.props;

    toggleShowDeleteDialog('items', index);
    event.stopPropagation();
    this.setOpen(event);
  };

  handleEditClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const { toggleShowEditDialog, index } = this.props;

    event.persist();

    toggleShowEditDialog('items', index);
    this.setOpen(event);
    event.stopPropagation();
  };

  render() {
    const { setActiveItem, index } = this.props;
    return (
      <MenuSurfaceAnchor onClick={(): void => setActiveItem('items', index)}>
        <Menu
          hoistToBody={true}
          open={this.state.open}
          onSelect={e => console.log(e.detail.index)}
          onClose={(): void => this.setState({ open: false })}
        >
          <MenuItem onClick={e => this.handleEditClick(e)}>
            <IconButton icon='edit' />
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={e => this.handleDeleteClick(e)}>
            <IconButton icon='delete' />
          </MenuItem>
        </Menu>

        <IconButton icon='menu' onClick={e => this.setOpen(e)}>
          Menu
        </IconButton>
      </MenuSurfaceAnchor>
    );
  }
}
