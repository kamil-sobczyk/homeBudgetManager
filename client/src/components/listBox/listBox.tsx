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
      visibilityClient: {
        showItems,
        showFinish,
        showAddDialog,
        showEditDialog,
        showFailDialog,
        showDeleteDialog,
        showShoppingDialog,
        toggleShowItems,
        toggleShowAddDialog,
        toggleShowEditDialog,
        toggleShowFailDialog,
        toggleShowFinishDialog,
        toggleShowDeleteDialog,
        toggleShowShoppingDialog
      },
      itemMenagerClient: {
        setActiveItem,
        currentItemName,
        currentItemInfo,
        updateCurrentItemName,
        updateCurrentItemInfo,
        toggleCheckItems,
        addItem,
        reorderItems,
        deleteItem,
        activeItem: { list, index },
        changeNewItem
      },
      apiClient: { getCosts, getItems, getSelected },
      shoppingClient: { changeCounter, finishShopping },
      dndClient: { onDragEnd }
    } = this.props.store;

    return (
      <>
        <ListsContainer
          selected={selected}
          getItems={getItems}
          getSelected={getSelected}
          deleteItem={deleteItem}
          onDragEnd={onDragEnd}
          toggleShowAddDialog={toggleShowAddDialog}
          toggleShowFinishDialog={toggleShowFinishDialog}
          toggleShowShoppingDialog={toggleShowShoppingDialog}
          toggleShowDeleteDialog={toggleShowDeleteDialog}
          showItems={showItems}
          toggleShowItems={toggleShowItems}
          setActiveItem={setActiveItem}
          toggleCheckItems={toggleCheckItems}
          toggleShowEditDialog={toggleShowEditDialog}
          items={items}
          showDeleteDialog={showDeleteDialog}
        />
        <AddDialog
          showAddDialog={showAddDialog}
          toggleShowAddDialog={toggleShowAddDialog}
          addItem={addItem}
          items={items}
          selected={selected}
          toggleShowFailDialog={toggleShowFailDialog}
          showFailDialog={showFailDialog}
          changeNewItem={changeNewItem}
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
        <FinishDialog
          reorderItems={reorderItems}
          toggleShowFinishDialog={toggleShowFinishDialog}
          showFinish={showFinish}
          items={items}
          selected={selected}
          showAddDialog={showAddDialog}
          changeCounter={changeCounter}
          finishShopping={finishShopping}
        />
      </>
    );
  }
}
