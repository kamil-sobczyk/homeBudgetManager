import * as React from 'react';

import {
  TopAppBar,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarRow
} from '@rmwc/top-app-bar';
import { DrawerBar } from './drawer';

interface NavbarProps {
  toggleShowSpendingsDialog: () => boolean;
  toggleShowAddBillDialog: () => boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const { toggleShowSpendingsDialog, toggleShowAddBillDialog } = this.props;
    return (
      <>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <DrawerBar/>
              <TopAppBarTitle>Home Budget Menager</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <TopAppBarActionItem
                icon='shopping_cart'
                onClick={toggleShowSpendingsDialog}
              />
              <TopAppBarActionItem
                icon='note_add'
                onClick={toggleShowAddBillDialog}
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </>
    );
  }
}