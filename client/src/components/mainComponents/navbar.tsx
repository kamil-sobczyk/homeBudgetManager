import * as React from 'react';

import styled from 'styled-components';

import { SimpleTopAppBar } from '@rmwc/top-app-bar';
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

interface NavbarProps {
  toggleShowSpendingsDialog: () => boolean;
  toggleShowAddBillDialog: () => boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {toggleShowSpendingsDialog, toggleShowAddBillDialog} = this.props;
    return (
      <>
        <StyledTopAppBar
          title='App Bar'
          theme='primary'
          navigationIcon={{ onClick: () => console.log('Navigate') }}
          actionItems={[
            { icon: 'shopping_cart', size: 'xlarge', onClick: toggleShowSpendingsDialog },
            {icon: 'note_add', size: 'xlarge', onClick: toggleShowAddBillDialog}
          ]}
        />
        <TopAppBarFixedAdjust />
      </>
    );
  }
}

const StyledTopAppBar = styled(SimpleTopAppBar)`
  background: #4965ff;
`;
