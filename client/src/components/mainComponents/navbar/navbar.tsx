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
import { NavbarSectionLeft } from './NavbarSectionLeft';
import { NavbarSectionRight } from './navbarSectionRight';

interface NavbarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => string;
  showDrawer: boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const { toggleShowDrawer, showDrawer, setVisibleDialog } = this.props;
    return (
      <>
        <TopAppBar>
          <TopAppBarRow>
            <NavbarSectionLeft
              toggleShowDrawer={toggleShowDrawer}
              setVisibleDialog={setVisibleDialog}
            />
            <NavbarSectionRight setVisibleDialog={setVisibleDialog} />
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
