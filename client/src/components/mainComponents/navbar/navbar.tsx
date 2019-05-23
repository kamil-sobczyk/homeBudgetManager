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

interface NavbarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => string;
  showDrawer: boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {
      toggleShowDrawer,
      showDrawer,
      setVisibleDialog,
    } = this.props;
    return (
      <>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon icon='menu' onClick={toggleShowDrawer} />
              <TopAppBarTitle
                onClick={() => setVisibleDialog('SpendingsDialog')}
              >
                Home Budget Menager
              </TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <TopAppBarActionItem
                icon='shopping_cart'
                onClick={() => setVisibleDialog('SpendingsDialog')}
              />
              <TopAppBarActionItem
                icon='note_add'
                onClick={() => setVisibleDialog('AddBillDialog')}
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <DrawerBar
          setVisibleDialog={setVisibleDialog}
          toggleShowDrawer={toggleShowDrawer}
          showDrawer={showDrawer}
        />
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
