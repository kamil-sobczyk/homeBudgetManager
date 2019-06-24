import * as React from 'react';

import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from '@rmwc/drawer';

import { DrawerItems } from './drawerItems';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer, setVisibleDialog } = this.props;
    return (
      <Drawer modal open={showDrawer} onClose={toggleShowDrawer}>
        <DrawerHeader>
          <DrawerTitle>Budget Manager</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <DrawerItems setVisibleDialog={setVisibleDialog} />
        </DrawerContent>
      </Drawer>
    );
  }
}
