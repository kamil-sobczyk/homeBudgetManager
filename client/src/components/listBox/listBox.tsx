import * as React from 'react';

import { observer } from 'mobx-react';
import { StoreProps } from '../../lib/interfaces';

import { ListsContainer } from './listsContainer';
import { AddDialog } from '../dialogs/addDialog';
import { EditDialog } from '../dialogs/editDialog';
import { DeleteDialog } from '../dialogs/deleteDialog';
import { ShoppingDialog } from '../dialogs/shoppingDialog';
import { ApiClient } from '../../lib/mobx/stores/apiClient';

@observer
export class ListBox extends React.Component<StoreProps, {}> {
  render() {
    const {
      costs,
      items,
      selected,
      visibilityClient: {
        showFinish,
        showAddDialog,
        showEditDialog,
        showFailDialog,
        showDeleteDialog,
        showShoppingDialog,
        toggleShowAddDialog,
        toggleShowEditDialog,
        toggleShowFailDialog,
        toggleShowDeleteDialog,
        toggleShowShoppingDialog
      },
      itemMenagerClient: {
        currentItemName,
        currentItemInfo,
        updateCurrentItemName,
        updateCurrentItemInfo,
        addItem,
        reorderItems,
        deleteItem,
        activeItem: { list, index }
      },
      apiClient: {
        getCosts,
        getItems,
        getSelected,
        deleteItemOnServer,
        editItemOnServer,
        reorderItemsOnServer,
        addCostOnServer,
        checkItemOnServer,
        addItemOnServer
      }
    } = this.props.store;

    return (
      <>
        <ListsContainer
          getItems={getItems}
          getSelected={getSelected}
          onDragEnd={onDragEnd}
          toggleShowFinishDialog={toggleShowFinishDialog}
          toggleShowShoppingDialog={toggleShowShoppingDialog}
          showItems={showItems}
          toggleShowItems={toggleShowItems}
        />
        <AddDialog
          showAddDialog={showAddDialog}
          toggleShowAddDialog={toggleShowAddDialog}
          addItem={addItem}
          items={items}
          selected={selected}
          toggleShowFailDialog={toggleShowFailDialog}
          showFailDialog={showFailDialog}
        />
        <EditDialog
          name={currentItemName}
          info={currentItemInfo}
          onChangeName={updateCurrentItemName}
          onChangeInfo={updateCurrentItemInfo}
          isVisible={showEditDialog}
          hide={toggleShowEditDialog}
        />
        <DeleteDialog
          items={items}
          deleteItem={deleteItem}
          list={list}
          index={index}
          toggleShowDeleteDialog={toggleShowDeleteDialog}
          showDeleteDialog={showDeleteDialog}
        />
        <ShoppingDialog
          toggleShowShoppingDialog={toggleShowShoppingDialog}
          showShoppingDialog={showShoppingDialog}
          costs={costs}
          getCosts={getCosts}
        />
      </>
    );
  }
}
