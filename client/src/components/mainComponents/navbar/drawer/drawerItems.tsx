import * as React from 'react';

import styled from 'styled-components';

import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';


import { GoogleLogout } from 'react-google-login';

const drawerItems = [
  {
    action: 'AddItemDialog',
    icon: 'add_circle',
    iconColor: '#00bf02',
    title: "Add new Item"
  },
  {
    action: 'AddOtherDialog',
    icon: 'note_add',
    iconColor: '#0400ff',
    title: "Add new bill"
  },
  {
    action: 'SpendingsDialog',
    icon: 'shopping_cart',
    iconColor: '#0d49aa',
    title: "Show spendings"
  },
  {
    action: 'AboutDialog',
    icon: 'info',
    iconColor: '#adad00',
    title: "About"
  }
];

interface DrawerItemsProps {
  setVisibleDialog: (dialog?: string) => void;
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
            <ListItem>{item.title}</ListItem>
            <StyledDrawerEmptyItem />
          </StyledDrawerItemContainer>
        ))}
        <StyledDrawerItemContainer>

        <ListItem>
        <GoogleLogout
        clientId='21462024369-kc67gih727cs3gctmvfe5iede4t9sdqe.apps.googleusercontent.com'
        buttonText="Logout"
        onLogoutSuccess={()=> console.log("logged out")}
      />
      </ListItem>
      </StyledDrawerItemContainer>
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
