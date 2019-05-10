import * as React from 'react';

import styled from 'styled-components';

import { StoreProps } from '../../../lib/interfaces';

import { MenuSurfaceAnchor, Menu, MenuItem } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
// import Tooltip from "@rmwc/Tooltip";
// import Fade from "@rmwc/Fade";

interface MoreMenuProps extends StoreProps {
  index: number;
}

export class MoreMenu extends React.Component<MoreMenuProps, {}> {
  state = {
    open: false
  };

  setOpen = (event: React.MouseEvent<any, MouseEvent>): void => {
    this.setState({ open: event.target });
    event.stopPropagation();
  };

  handleDeleteClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const {
      visibilityClient: { toggleShowDeleteDialog },
      activeItem: { index }
    } = this.props.store;

    toggleShowDeleteDialog(index);
    event.stopPropagation();
    this.setOpen(event);
  };

  handleEditClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const {
      visibilityClient: { toggleShowEditDialog },
      activeItem: { list, index }
    } = this.props.store;

    toggleShowEditDialog(list, index);
    event.stopPropagation();
    this.setOpen(event);
  };

  render() {
    return (
      <MenuSurfaceAnchor>
        <Menu
          hoistToBody={true}
          open={this.state.open}
          onSelect={evt => console.log(evt.detail.index)}
          onClose={() => this.setState({ open: false })}
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
