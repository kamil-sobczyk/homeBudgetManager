import * as React from 'react';

import { TopAppBarSection, TopAppBarNavigationIcon } from '@rmwc/top-app-bar';

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
      </TopAppBarSection>
    );
  }
}
