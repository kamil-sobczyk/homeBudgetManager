import * as React from 'react';

import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from '@rmwc/drawer';

import { DrawerItems } from './drawerItems';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer, setVisibleDialog, toggleEditItems } = this.props;
    return (
      <Drawer modal open={showDrawer} onClose={toggleShowDrawer}>
        <DrawerHeader>
          <DrawerTitle>Budget Manager</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <DrawerItems setVisibleDialog={setVisibleDialog} toggleEditItems={toggleEditItems} />
        </DrawerContent>
      </Drawer>
    );
  }
}
