import * as React from 'react';

import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from '@rmwc/drawer';

import { DrawerItems } from './drawerItems';
import styled from 'styled-components';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const {
      toggleShowDrawer,
      showDrawer,
      setVisibleDialog,
      toggleEditItems
    } = this.props;
    return (
      <Drawer modal open={showDrawer}>
        <DrawerHeader>
          <StyledDrawerTitle>Budget Manager</StyledDrawerTitle>
        </DrawerHeader>
        <DrawerContent onClick={() => toggleShowDrawer()}>
          <DrawerItems
            setVisibleDialog={setVisibleDialog}
            toggleEditItems={toggleEditItems}
          />
        </DrawerContent>
      </Drawer>
    );
  }
}

const StyledDrawerTitle = styled(DrawerTitle)`
  text-align: center;
`;
