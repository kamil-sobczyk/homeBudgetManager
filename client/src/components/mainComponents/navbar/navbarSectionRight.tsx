import * as React from 'react';

import { TopAppBarSection, TopAppBarActionItem } from '@rmwc/top-app-bar';

interface NavbarSectionRightProps {
  setVisibleDialog: (dialog?: string) => string;
}

export class NavbarSectionRight extends React.Component<
  NavbarSectionRightProps,
  {}
> {
  render() {
    const { setVisibleDialog } = this.props;
    return (
      <TopAppBarSection alignEnd>
        <TopAppBarActionItem
          icon='shopping_cart'
          onClick={() => setVisibleDialog('SpendingsDialog')}
        />
        <TopAppBarActionItem
          icon='note_add'
          onClick={() => setVisibleDialog('AddBillDialog')}
        />
      </TopAppBarSection>
    );
  }
}
