import * as React from 'react';

import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow
} from '@rmwc/top-app-bar';

import { DrawerBar } from './drawer/drawer';
import { NavbarSectionLeft } from './navbarSections/navbarSectionLeft';
import { NavbarSectionRight } from './navbarSections/navbarSectionRight';
import { DrawerLangData } from '../../../lib/interfaces';

interface NavbarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
  toggleLanguage: () => void;
  showDrawer: boolean;
  langData: DrawerLangData;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {
      toggleShowDrawer,
      showDrawer,
      setVisibleDialog,
      toggleEditItems,
      langData,
      toggleLanguage
    } = this.props;
    return (
      <>
        <TopAppBar>
          <TopAppBarRow>
            <NavbarSectionLeft
              toggleShowDrawer={toggleShowDrawer}
              setVisibleDialog={setVisibleDialog}
              toggleLanguage={toggleLanguage}
            />
            <NavbarSectionRight setVisibleDialog={setVisibleDialog} />
          </TopAppBarRow>
        </TopAppBar>
        <DrawerBar
          setVisibleDialog={setVisibleDialog}
          toggleShowDrawer={toggleShowDrawer}
          showDrawer={showDrawer}
          toggleEditItems={toggleEditItems}
          langData={langData}
        />
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
