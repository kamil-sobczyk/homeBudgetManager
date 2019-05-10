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

  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  setOpen = (event: React.MouseEvent<any, MouseEvent>) => {
    this.setState({open: event.target});
    event.stopPropagation();
  };

  handleClickMore = (action: any) => {
    const {
      toggleShowEditDialog,
      toggleShowDeleteDialog
    } = this.props.store.visibilityClient;

    action === 'edit'
      ? toggleShowEditDialog('items', this.props.index)
      : toggleShowDeleteDialog(); ////
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <MenuSurfaceAnchor>
        <Menu
          hoistToBody={true}
          open={this.state.open}
          onSelect={evt => console.log(evt.detail.index)}
          onClose={e => this.setState({ open: false })}
        >
          <MenuItem>
            <IconButton icon='edit' />
          </MenuItem>
          <ListDivider />
          <MenuItem>
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

