import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { AddDialog } from '../dialogs/addDialog';
import { EditDialog } from '../dialogs/editDialog';
import { DeleteDialog } from '../dialogs/deleteDialog';
import { ShoppingDialog } from '../dialogs/shoppingDialog';
import { FinishDialog } from '../dialogs/finishDialog';

@observer
export class ListBox extends React.Component<StoreProps, {}> {
  render() {
    const {
      costs,
      items,
      selected,
      visibilityClient,
      itemMenagerClient,
      apiClient,
      shoppingClient,
      dndClient
    } = this.props.store;

    return (
      <>
        <ListsContainer
          getItems={apiClient.getItems}
          getSelected={apiClient.getSelected}
          items={items}
          selected={selected}
          toggleShowAddDialog={visibilityClient.toggleShowAddDialog}
          toggleShowFinishDialog={visibilityClient.toggleShowFinishDialog}
          toggleShowShoppingDialog={visibilityClient.toggleShowShoppingDialog}
          toggleShowDeleteDialog={visibilityClient.toggleShowDeleteDialog}
          toggleShowItems={visibilityClient.toggleShowItems}
          toggleCheckItems={itemMenagerClient.toggleCheckItems}
          toggleShowEditDialog={visibilityClient.toggleShowEditDialog}
          showDeleteDialog={visibilityClient.showDeleteDialog}
          showItems={visibilityClient.showItems}
          setActiveItem={itemMenagerClient.setActiveItem}
          deleteItem={itemMenagerClient.deleteItem}
          onDragEnd={dndClient.onDragEnd}
        />
        <AddDialog
          items={items}
          selected={selected}
          toggleShowFailDialog={visibilityClient.toggleShowFailDialog}
          toggleShowAddDialog={visibilityClient.toggleShowAddDialog}
          showAddDialog={visibilityClient.showAddDialog}
          showFailDialog={visibilityClient.showFailDialog}
          addItem={itemMenagerClient.addItem}
          changeNewItem={itemMenagerClient.changeNewItem}
        />
        <EditDialog
          name={itemMenagerClient.currentItemName}
          info={itemMenagerClient.currentItemInfo}
          onChangeName={itemMenagerClient.updateCurrentItemName}
          onChangeInfo={itemMenagerClient.updateCurrentItemInfo}
          isVisible={visibilityClient.showEditDialog}
          hide={visibilityClient.toggleShowEditDialog}
        />
        <DeleteDialog
          items={items}
          toggleShowDeleteDialog={visibilityClient.toggleShowDeleteDialog}
          deleteItem={itemMenagerClient.deleteItem}
          list={itemMenagerClient.activeItem.list}
          index={itemMenagerClient.activeItem.index}
          showDeleteDialog={visibilityClient.showDeleteDialog}
        />
        <ShoppingDialog
          getCosts={apiClient.getCosts}
          costs={costs}
          toggleShowShoppingDialog={visibilityClient.toggleShowShoppingDialog}
          showShoppingDialog={visibilityClient.showShoppingDialog}
        />
        <FinishDialog
          items={items}
          selected={selected}
          toggleShowFinishDialog={visibilityClient.toggleShowFinishDialog}
          reorderItems={itemMenagerClient.reorderItems}
          showFinish={visibilityClient.showFinish}
          showAddDialog={visibilityClient.showAddDialog}
          changeCounter={shoppingClient.changeCounter}
          finishShopping={shoppingClient.finishShopping}
        />
      </>
    );
  }
}
