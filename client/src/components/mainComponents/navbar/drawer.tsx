import * as React from 'react';

import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent
} from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import styled from 'styled-components';
import { Icon } from '@rmwc/icon';
import { IconButton } from '@rmwc/icon-button';

interface DrawerBarProps {
  toggleShowDrawer: () => boolean;
  toggleshowAddItemDialog: () => boolean;
  toggleShowSpendingsDialog: () => boolean;
  toggleShowAddBillDialog: () => boolean;
  showDrawer: boolean;
}

export class DrawerBar extends React.Component<DrawerBarProps, {}> {
  render() {
    const {
      toggleShowDrawer,
      showDrawer,
      toggleShowAddBillDialog,
      toggleShowSpendingsDialog,
      toggleshowAddItemDialog
    } = this.props;
    return (
      <>
        <StyledDrawer modal open={showDrawer} onClose={toggleShowDrawer}>
          <DrawerHeader>
            <DrawerTitle>Budget Menager</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <StyledDrawerItemContainer onClick={toggleshowAddItemDialog}>
                <StyledDrawerIconButton
                  icon='add_circle'
                  style={{ color: '#00bf02' }}
                />
                <ListItem>Add new item </ListItem>
                <StyledDrawerEmptyItem />
              </StyledDrawerItemContainer>
              <StyledDrawerItemContainer onClick={toggleShowAddBillDialog}>
                <StyledDrawerIconButton
                  icon='note_add'
                  style={{ color: '#0400ff' }}
                />
                <ListItem>Add new bill </ListItem>
                <StyledDrawerEmptyItem />
              </StyledDrawerItemContainer>
              <StyledDrawerItemContainer onClick={toggleShowSpendingsDialog}>
                <StyledDrawerIconButton
                  icon='shopping_cart'
                  style={{ color: '#0d49aa' }}
                />
                <ListItem>Show spendings </ListItem>
                <StyledDrawerEmptyItem />
              </StyledDrawerItemContainer>
              <StyledDrawerItemContainer>
                <StyledDrawerIconButton
                  icon='info'
                  style={{ color: '#adad00' }}
                />
                <ListItem>About </ListItem>
                <StyledDrawerEmptyItem />
              </StyledDrawerItemContainer>
            </List>
          </DrawerContent>
        </StyledDrawer>
      </>
    );
  }
}

const StyledDrawer = styled(Drawer)`
  background: #007ccc;
  text-align: center;
`;

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
