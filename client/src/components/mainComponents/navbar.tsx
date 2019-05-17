import * as React from 'react';

import styled from 'styled-components';

import { SimpleTopAppBar } from '@rmwc/top-app-bar';
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

interface NavbarProps {
  toggleShowSpendingsDialog: () => boolean;
}

export class Navbar extends React.Component<NavbarProps, {}> {
  render() {
    const {toggleShowSpendingsDialog} = this.props;
    return (
      <>
        <StyledTopAppBar
          title='App Bar'
          theme='primary'
          navigationIcon={{ onClick: () => console.log('Navigate') }}
          actionItems={[
            { icon: 'shopping_cart', size: 'xlarge', onClick: toggleShowSpendingsDialog }
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
