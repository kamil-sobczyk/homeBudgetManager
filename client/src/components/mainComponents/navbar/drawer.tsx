import * as React from 'react';

import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent
} from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import styled from 'styled-components';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer } = this.props;
    return (
      <>
        <StyledDrawer modal open={showDrawer} onClose={toggleShowDrawer}>
          <DrawerHeader>
            <DrawerTitle>Budget Menager</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <StyledDrawerItem>Add new item</StyledDrawerItem>
              <StyledDrawerItem>Add new bill</StyledDrawerItem>
              <StyledDrawerItem>Show spendings</StyledDrawerItem>
              <StyledDrawerItem>About</StyledDrawerItem>
            </List>
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

const StyledDrawerItem = styled(ListItem)`
display: flex;
justify-content: center;
`;
