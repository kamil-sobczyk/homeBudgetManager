import * as React from 'react';

import {
  TopAppBar,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';

import { DrawerBar } from './drawer';
import { AboutDialog } from '../../dialogs/aboutDialog';


interface NavbarProps {
  toggleShowSpendingsDialog: () => boolean;
  toggleShowAddBillDialog: () => boolean;
  toggleShowDrawer: () => boolean;
  toggleshowAddItemDialog: () => boolean;
  showDrawer: boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {
      toggleShowSpendingsDialog,
      toggleShowAddBillDialog,
      toggleShowDrawer,
      showDrawer,
      toggleshowAddItemDialog
    } = this.props;
    return (
      <>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon icon='menu' onClick={toggleShowDrawer} />
              <TopAppBarTitle onClick={toggleShowSpendingsDialog}>Home Budget Menager</TopAppBarTitle>
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
        <DrawerBar
          toggleShowDrawer={toggleShowDrawer}
          showDrawer={showDrawer}
          toggleShowSpendingsDialog={toggleShowSpendingsDialog}
          toggleShowAddBillDialog={ toggleShowAddBillDialog}
          toggleshowAddItemDialog={toggleshowAddItemDialog}
        />
        <AboutDialog/>
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
