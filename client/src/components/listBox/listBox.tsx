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
      dndClient: { onDragEnd }
    } = this.props.store;

    return (
      <>
        <ListsContainer
          selected={selected}
          getItems={apiClient.getItems}
          getSelected={apiClient.getSelected}
          deleteItem={itemMenagerClient.deleteItem}
          onDragEnd={onDragEnd}
          toggleShowAddDialog={visibilityClient.toggleShowAddDialog}
          toggleShowFinishDialog={visibilityClient.toggleShowFinishDialog}
          toggleShowShoppingDialog={visibilityClient.toggleShowShoppingDialog}
          toggleShowDeleteDialog={visibilityClient.toggleShowDeleteDialog}
          showItems={visibilityClient.showItems}
          toggleShowItems={visibilityClient.toggleShowItems}
          setActiveItem={itemMenagerClient.setActiveItem}
          toggleCheckItems={itemMenagerClient.toggleCheckItems}
          toggleShowEditDialog={visibilityClient.toggleShowEditDialog}
          items={items}
          showDeleteDialog={visibilityClient.showDeleteDialog}
        />
        <AddDialog
          showAddDialog={visibilityClient.showAddDialog}
          toggleShowAddDialog={visibilityClient.toggleShowAddDialog}
          addItem={itemMenagerClient.addItem}
          items={items}
          selected={selected}
          toggleShowFailDialog={visibilityClient.toggleShowFailDialog}
          showFailDialog={visibilityClient.showFailDialog}
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
          deleteItem={itemMenagerClient.deleteItem}
          list={itemMenagerClient.activeItem.list}
          index={itemMenagerClient.activeItem.index}
          toggleShowDeleteDialog={visibilityClient.toggleShowDeleteDialog}
          showDeleteDialog={visibilityClient.showDeleteDialog}
        />
        <ShoppingDialog
          toggleShowShoppingDialog={visibilityClient.toggleShowShoppingDialog}
          showShoppingDialog={visibilityClient.showShoppingDialog}
          costs={costs}
          getCosts={apiClient.getCosts}
        />
        <FinishDialog
          reorderItems={itemMenagerClient.reorderItems}
          toggleShowFinishDialog={visibilityClient.toggleShowFinishDialog}
          showFinish={visibilityClient.showFinish}
          items={items}
          selected={selected}
          showAddDialog={visibilityClient.showAddDialog}
          changeCounter={shoppingClient.changeCounter}
          finishShopping={shoppingClient.finishShopping}
        />
      </>
    );
  }
}
