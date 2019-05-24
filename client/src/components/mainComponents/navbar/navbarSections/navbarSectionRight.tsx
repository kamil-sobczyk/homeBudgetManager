import * as React from 'react';

import { TopAppBarSection, TopAppBarActionItem } from '@rmwc/top-app-bar';

interface NavbarSectionRightProps {
  setVisibleDialog: (dialog?: string) => string;
}

const navbarSectionRightItems = [
  {
    icon: 'bar_chart',
    action: 'ChartDialog'
  },
  {
    icon: 'shopping_cart',
    action: 'SpendingsDialog'
  },
  {
    icon: 'note_add',
    action: 'AddOtherDialog'
  }
];

export class NavbarSectionRight extends React.Component<
  NavbarSectionRightProps,
  {}
> {
  render() {
    const { setVisibleDialog } = this.props;
    return (
      <TopAppBarSection alignEnd>
        {navbarSectionRightItems.map(item => (
          <TopAppBarActionItem
            icon={item.icon}
            onClick={() => setVisibleDialog(item.action)}
            key={item.action}
          />
        ))}
      </TopAppBarSection>
    );
  }
}
