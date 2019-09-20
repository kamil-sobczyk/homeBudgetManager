import * as React from 'react';

import { TopAppBarSection, TopAppBarNavigationIcon } from '@rmwc/top-app-bar';

interface NavbarSectionLeftProps {
  toggleShowDrawer: () => boolean;
  setVisibleDialog: (dialog?: string) => void;
}

export const NavbarSectionLeft = (props: NavbarSectionLeftProps) => (
  <TopAppBarSection alignStart>
    <TopAppBarNavigationIcon icon='menu' onClick={props.toggleShowDrawer} />
  </TopAppBarSection>
);
