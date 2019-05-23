import * as React from 'react';

import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import styled from 'styled-components';
import { IconButton } from '@rmwc/icon-button';
import { DrawerItems } from './drawerItems';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => string;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer, setVisibleDialog } = this.props;
    return (
      <>
        <StyledDrawer modal open={showDrawer} onClose={toggleShowDrawer}>
          <DrawerHeader>
            <DrawerTitle>Budget Menager</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <DrawerItems setVisibleDialog={setVisibleDialog} />
          </DrawerContent>
        </StyledDrawer>
      </>
    );
  }
}

const StyledDrawer = styled(Drawer)`
  background: #007ccc;
  text-align: center;
`;