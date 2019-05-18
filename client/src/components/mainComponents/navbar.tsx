import * as React from 'react';

import styled from 'styled-components';

import {
  TopAppBar,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarRow
} from '@rmwc/top-app-bar';

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
              <TopAppBarNavigationIcon icon='menu' />
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

const StyledTopAppBar = styled(TopAppBar)`
  background: #4965ff;
`;
