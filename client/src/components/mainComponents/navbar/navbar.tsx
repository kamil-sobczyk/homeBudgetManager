import * as React from 'react';

import styled from 'styled-components';

import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow
} from '@rmwc/top-app-bar';

import { DrawerBar } from './drawer/drawer';
import { NavbarSectionLeft } from './navbarSections/navbarSectionLeft';
import { NavbarSectionRight } from './navbarSections/navbarSectionRight';

interface NavbarProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
  showDrawer: boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {
      toggleShowDrawer,
      showDrawer,
      setVisibleDialog,
      toggleEditItems
    } = this.props;
    return (
      <>
        <StyledTopAppBar>
          <TopAppBarRow>
            <NavbarSectionLeft
              toggleShowDrawer={toggleShowDrawer}
              setVisibleDialog={setVisibleDialog}
            />
            <NavbarSectionRight setVisibleDialog={setVisibleDialog} />
          </TopAppBarRow>
        </StyledTopAppBar>
        <DrawerBar
          setVisibleDialog={setVisibleDialog}
          toggleShowDrawer={toggleShowDrawer}
          showDrawer={showDrawer}
          toggleEditItems={toggleEditItems}
        />
        <TopAppBarFixedAdjust />
      </>
    );
  }
}

const StyledTopAppBar = styled(TopAppBar)`
  height: 45px;
  margin-top: -13px;
`;
