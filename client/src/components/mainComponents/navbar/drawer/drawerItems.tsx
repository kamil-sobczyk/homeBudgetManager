import * as React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import styled from 'styled-components';

import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';

interface DrawerItemsProps {
  setVisibleDialog: (dialog?: string) => void;
  toggleEditItems: () => void;
  langData: any;
}

@observer
export class DrawerItems extends React.Component<DrawerItemsProps, {}> {
  @observable isEditable: boolean = true;
  @observable drawerVisibleItems = [
    {
      action: 'AddShoppingItemDialog',
      icon: 'add_circle',
      iconColor: '#00bf02',
      title: this.props.langData.addNewProduct
    },
    {
      action: 'AddNewIncomeDialog',
      icon: 'save_alt',
      iconColor: '#00bf02',
      title: this.props.langData.addNewIncome
    },
    {
      action: 'AddNewExpenseDialog',
      icon: 'note_add',
      iconColor: '#0400ff',
      title: this.props.langData.addNewBill
    },
    {
      action: 'SpendingsDialog',
      icon: 'shopping_cart',
      iconColor: '#0d49aa',
      title: this.props.langData.showSpendings
    },
    {
      action: 'AboutDialog',
      icon: 'info',
      iconColor: '#adad00',
      title: this.props.langData.about
    },
    {
      action: 'LogoutDialog',
      icon: 'exit_to_app',
      iconColor: 'red',
      title: this.props.langData.log
    }
  ];

  toggleEditing = () => {
    this.props.toggleEditItems();

    this.isEditable = !this.isEditable;
  };

  render() {
    const { setVisibleDialog, langData } = this.props;

    let drawerItems = this.drawerVisibleItems.map(item => (
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
        <ListItem>{langData.turnEditing[this.isEditable ? 'on' : 'off']}</ListItem>
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
