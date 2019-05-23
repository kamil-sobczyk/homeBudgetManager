import * as React from 'react';

import styled from 'styled-components';

import { Drawer } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

const drawerItems = [
  {
    action: 'AddItemDialog',
    icon: 'add_circle',
    iconColor: '#00bf02'
  },
  {
    action: 'AddBillDialog',
    icon: 'note_add',
    iconColor: '#0400ff'
  },
  {
    action: 'SpendingsDialog',
    icon: 'shopping_cart',
    iconColor: '#0d49aa'
  },
  {
    action: 'AboutDialog',
    icon: 'info',
    iconColor: '#adad00'
  }
];

interface DrawerItemsProps {
  setVisibleDialog: (dialog?: string) => string;
}

export class DrawerItems extends React.Component<DrawerItemsProps, {}> {
  render() {
    const { setVisibleDialog } = this.props;
    return (
      <List>
        {drawerItems.map(item => (
          <StyledDrawerItemContainer
            key={item.action}
            onClick={() => setVisibleDialog(item.action)}
          >
            <StyledDrawerIconButton
              icon={item.icon}
              style={{ color: item.iconColor }}
            />
            <ListItem>Add new item </ListItem>
            <StyledDrawerEmptyItem />
          </StyledDrawerItemContainer>
        ))}
      </List>
    );
  }
}

const StyledDrawerItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledDrawerEmptyItem = styled.div`
  width: 30px;
`;

const StyledDrawerIconButton = styled(IconButton)`
  margin-left: 10px;
  margin-top: 2px;
`;
