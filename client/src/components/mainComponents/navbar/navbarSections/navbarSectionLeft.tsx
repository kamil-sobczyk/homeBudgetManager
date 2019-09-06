import * as React from 'react';

import {
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';
import styled from 'styled-components';

interface NavbarSectionLeftProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
}

export class NavbarSectionLeft extends React.Component<
  NavbarSectionLeftProps,
  {}
> {
  render() {
    const { toggleShowDrawer, setVisibleDialog } = this.props;
    return (
      <TopAppBarSection alignStart>
        <TopAppBarNavigationIcon icon='menu' onClick={toggleShowDrawer} />
        <StyledTopAppBarTitle onClick={() => setVisibleDialog('AboutDialog')}>
          HBM
        </StyledTopAppBarTitle>
      </TopAppBarSection>
    );
  }
}

const StyledTopAppBarTitle = styled(TopAppBarTitle)`
  cursor: pointer;
`;