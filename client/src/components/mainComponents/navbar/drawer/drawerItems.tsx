import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import styled from 'styled-components';

import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

const drawerVisibleItems = [
  {
    action: 'AddShoppingItemDialog',
    icon: 'add_circle',
    iconColor: '#00bf02',
    title: 'Add new product'
  },
  {
    action: 'AddNewIncomeDialog',
    icon: 'save_alt',
    iconColor: '#00bf02',
    title: 'Add new income'
  },
  {
    action: 'AddNewExpenseDialog',
    icon: 'note_add',
    iconColor: '#0400ff',
    title: 'Add new bill'
  },
  {
    action: 'SpendingsDialog',
    icon: 'shopping_cart',
    iconColor: '#0d49aa',
    title: 'Show spendings'
  },
  {
    action: 'AboutDialog',
    icon: 'info',
    iconColor: '#adad00',
    title: 'About'
  },
  {
    action: 'LogoutDialog',
    icon: 'exit_to_app',
    iconColor: 'red',
    title: 'Logout'
  }
];

interface DrawerItemsProps {
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
}

@observer
export class DrawerItems extends React.Component<DrawerItemsProps, {}> {
  @observable text: string = 'Turn editing off';

  toggleEditing = () => {
    this.props.toggleEditItems();

    if (this.text === 'Turn editing off') {
      this.text = 'Turn editing on';
    } else if (this.text === 'Turn editing on') {
      this.text = 'Turn editing off';
    }
  };

  render() {
    const { setVisibleDialog } = this.props;

    let drawerItems = drawerVisibleItems.map(item => (
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
    ));

    const toggleEditItem = (
      <StyledDrawerItemContainer
        key={'toggleItemKey'}
        onClick={this.toggleEditing}
      >
        <StyledDrawerIconButton icon={'edit'} style={{ color: 'black' }} />
        <ListItem>{this.text}</ListItem>
        <StyledDrawerEmptyItem />
      </StyledDrawerItemContainer>
    );

    drawerItems.splice(4, 0, toggleEditItem);

    return <List>{drawerItems}</List>;
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
