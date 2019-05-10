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
    this.state.open = !this.state.open;
    this.props.store.itemMenagerClient.changeItemOverflow();
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
      <StyledMenuSurfaceAnchor>
        <StyledMenu
        hoistToBody={true}
          open={this.state.open}
          onSelect={evt => console.log(evt.detail.index)}
          onClose={e => this.setState({ open: false })}
        >
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          {/** MenuItem is just a ListItem, so you can intermingle other List components */}
          <ListDivider />
          <MenuItem>Icecream</MenuItem>
        </StyledMenu>

        <IconButton icon='menu' onClick={e => this.setOpen(e)}>
          Menu
        </IconButton>
      </StyledMenuSurfaceAnchor>
    );
  }
}

const StyledMenu = styled(Menu)`

`;

const StyledMenuSurfaceAnchor = styled(MenuSurfaceAnchor)`

`