import * as React from 'react';

import { TopAppBarSection, TopAppBarActionItem } from '@rmwc/top-app-bar';

interface NavbarSectionRightProps {
  setVisibleDialog: (dialog?: string) => void;
}

export class NavbarSectionRight extends React.Component<
  NavbarSectionRightProps
> {
  private readonly navbarSectionRightItems = [
    {
      icon: 'save_alt',
      action: 'IncomesDialog'
    },
    {
      icon: 'today',
      action: 'CalendarDialog'
    },
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
      action: 'AddNewExpenseDialog'
    }
  ];

  render() {
    return (
      <TopAppBarSection alignEnd>
        {this.navbarSectionRightItems.map(item => (
          <TopAppBarActionItem
            icon={item.icon}
            onClick={() => this.props.setVisibleDialog(item.action)}
            key={item.action}
          />
        ))}
      </TopAppBarSection>
    );
  }
}
