import * as React from 'react';

import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent
} from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer } = this.props;
    return (
      <>
        <Drawer modal open={showDrawer} onClose={toggleShowDrawer}>
          <DrawerHeader>
            <DrawerTitle>DrawerHeader</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>Add</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Icecream</ListItem>
            </List>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
}
