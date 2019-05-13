import * as React from 'react';

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
    const {
      itemMenagerClient: { setActiveItem }
    } = this.props.store;
    const { index } = this.props;
    this.setState({ open: event.target });
    setActiveItem('items', index);
    event.stopPropagation();
  };

  handleDeleteClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const {
      visibilityClient: { toggleShowDeleteDialog },
      itemMenagerClient: {
        activeItem: { index }
      }
    } = this.props.store;

    toggleShowDeleteDialog(index);
    event.stopPropagation();
    this.setOpen(event);
  };

  handleEditClick = (event: React.MouseEvent<any, MouseEvent>): void => {
    const {
      visibilityClient: { toggleShowEditDialog },
      itemMenagerClient: {
        activeItem: { index }
      }
    } = this.props.store;
    event.persist();

    toggleShowEditDialog('items', index);
    this.setOpen(event);
    event.stopPropagation();
  };

  render() {
    const {
      setActiveItem,
      activeItem: { list, index }
    } = this.props.store.itemMenagerClient;
    return (
      <MenuSurfaceAnchor onClick={(): void => setActiveItem('selected', index)}>
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
