import * as React from 'react';

import {
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';

interface NavbarSectionLeftProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => string;
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
        <TopAppBarTitle onClick={() => setVisibleDialog('SpendingsDialog')}>
          Home Budget Menager
        </TopAppBarTitle>
      </TopAppBarSection>
    );
  }
}
