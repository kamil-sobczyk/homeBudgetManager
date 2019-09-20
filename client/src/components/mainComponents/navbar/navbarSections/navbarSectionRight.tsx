import * as React from 'react';

import { TopAppBarSection, TopAppBarActionItem } from '@rmwc/top-app-bar';
import styled from 'styled-components';

interface NavbarSectionRightProps {
  setVisibleDialog: (dialog?: string) => void;
}

const navbarSectionRightItems = [
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

export const NavbarSectionRight = (props: NavbarSectionRightProps) => (
  <TopAppBarSection alignEnd>
    {navbarSectionRightItems.map(item => (
      <StyledTopBarItem
        icon={item.icon}
        onClick={() => props.setVisibleDialog(item.action)}
        key={item.action}
      />
    ))}
  </TopAppBarSection>
);

const StyledTopBarItem = styled(TopAppBarActionItem)`
  margin-right: 10px;
  cursor: pointer;
`;
