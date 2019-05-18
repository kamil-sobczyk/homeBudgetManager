import * as React from 'react';

import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { TopAppBarNavigationIcon } from '@rmwc/top-app-bar';

export class DrawerBar extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Drawer modal open={true}>
          <DrawerHeader>
            <DrawerTitle>DrawerHeader</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>Cookies</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Icecream</ListItem>
            </List>
          </DrawerContent>
        </Drawer>

        <TopAppBarNavigationIcon icon='menu' />
      </>
    );
  }
}
